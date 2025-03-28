export interface HighlightItem {
  title: string;
  description: string;
  delay: string;
}

export const highlightItems: HighlightItem[] = [
  {
    title: "Building Highly Scalable Systems",
    description:
      "Creating highly scalable and rock solid system which can handle huge trafic and data with high availability and reliability.",
    delay: "100ms",
  },
  {
    title: "Optimized and Maintainable Code",
    description:
      "Designing code architecture which is easily maintainable, optimized and naturally understandable.",
    delay: "250ms",
  },
  {
    title: "Data Processing at Scale",
    description:
      "Building systems that can process and streams in huge data in real-time, enabling immediate insights and actions.",
    delay: "400ms",
  },
  {
    title: "Data Monitoring Insight",
    description:
      "Developing applications that create accurate and thoughtful visualizations of data which helps to identify and solve problems quickly.",
    delay: "550ms",
  },
]; 