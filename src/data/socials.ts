export interface Social {
  name: string;
  url: string;
  icon: string[];
  color: string;
  hoverIconColor?: string;
}

export const socials: Social[] = [
  { name: "Email", url: "mailto:connect@rkisdp.dev", icon: ['fas', 'envelope'], color: "#EA4335" },
  { name: "GitHub", url: "https://github.com/rkisdp", icon: ['fab', 'github'], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rkisdp/", icon: ['fab', 'linkedin'], color: "#0077b5" },
  { name: "Medium", url: "https://medium.com/@rkisdp", icon: ['fab', 'medium'], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/11983208/divya-prakash", icon: ['fab', 'stack-overflow'], color: "#f48024" },
];
