import { marked } from 'marked';
import DOMPurify from 'dompurify';

// DOMPurify needs a real DOM, so it is unsupported during SSR.
// Registered once at module load so the hook isn't added on every component mount.
if (DOMPurify.isSupported) {
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Renders an AI chat reply (markdown, or HTML from older replies) to sanitized HTML.
 * Links always open in a new tab.
 */
export const renderChatMarkdown = (text: string): string => {
  if (!DOMPurify.isSupported) return escapeHtml(text);
  const html = marked.parse(text, { async: false, breaks: true, gfm: true }) as string;
  return DOMPurify.sanitize(html);
};
