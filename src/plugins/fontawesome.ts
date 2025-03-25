import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons';
import {
  faDownload,
  faEnvelope,
  faBars,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library
library.add(
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faDownload,
  faEnvelope,
  faBars,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faArrowRight
);

export { FontAwesomeIcon };
