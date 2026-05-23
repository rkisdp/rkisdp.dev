import innovaccerImage from "../assets/images/companies/innovaccer.jpg";
import appknoxImage from "../assets/images/companies/appknox.jpg";
import thoughts2binaryImage from "../assets/images/companies/thoughts2binary.jpg";
import barytechImage from "../assets/images/companies/barytech.jpg";
import yoyobooksImage from "../assets/images/companies/yoyobooks.jpg";

export interface Job {
  company: string;
  position: string;
  period: string;
  shortPeriod: string;
  year: string;
  logo: string;
  responsibilities: string[];
  url: string;
}

export const jobs: Job[] = [
  {
    company: "Xysec Labs Private Limited",
    position: "Software Development Engineer",
    period: "February 2025 - Present",
    shortPeriod: "Feb '25 - Present",
    year: "2025",
    logo: appknoxImage,
    responsibilities: [
      "Developing and maintaining secure software applications",
      "Implementing robust security features and protocols",
      "Collaborating with security researchers and analysts",
      "Conducting code reviews and security audits",
      "Optimizing application performance and security",
    ],
    url: "https://www.appknox.com",
  },
  {
    company: "Barycenter Technologies Private Limited",
    position: "Senior Software Engineer",
    period: "May 2024 - January 2025",
    shortPeriod: "May '24 - Jan '25",
    year: "2024",
    logo: barytechImage,
    responsibilities: [
      "Led development of microservices-based applications",
      "Designed and implemented scalable system architecture",
      "Mentored junior developers and conducted code reviews",
      "Optimized database queries and application performance",
      "Integrated third-party APIs and services",
    ],
    url: "https://eino.world/en_gb/",
  },
  {
    company: "Innovaccer Analytics Private Limited",
    position: "Software Development Engineer",
    period: "December 2021 - September 2022",
    shortPeriod: "Dec '21 - Sep '22",
    year: "2021",
    logo: innovaccerImage,
    responsibilities: [
      "Developed higly scalable healthcare data analytics solutions",
      "Implemented ETL pipelines for processing large datasets",
      "Created RESTful APIs for data access and integration",
      "Collaborated with data scientists to implement ML models",
      "Optimized database queries for improved performance",
    ],
    url: "https://innovaccer.com",
  },
  {
    company: "Thoughts2Binary Consulting LLP",
    position: "Associate Software Developer",
    period: "November 2019 - December 2021",
    shortPeriod: "Nov '19 - Dec '21",
    year: "2019",
    logo: thoughts2binaryImage,
    responsibilities: [
      "Developed web applications using React and Node.js",
      "Created and maintained RESTful APIs",
      "Designed and implemented database schemas",
      "Integrated payment gateways and third-party services",
      "Deployed applications to cloud environments",
    ],
    url: "https://thoughts2binary.com",
  },
  {
    company: "YoYo Books India LLP",
    position: "CTO, Full Stack Developer",
    period: "November 2016 - September 2018",
    shortPeriod: "Nov '16 - Sep '18",
    year: "2016",
    logo: yoyobooksImage,
    responsibilities: [
      "Led technical strategy and development for digital publishing platform",
      "Architected and developed full-stack web applications",
      "Managed development team and provided technical leadership",
      "Implemented e-commerce and content management systems",
      "Ensured scalability, security, and performance of platforms",
    ],
    url: "https://yoyobooks.in",
  },
  {
    company: "Freelance",
    position: "Full Stack Developer",
    period: "September 2018 - November 2019",
    shortPeriod: "Sep '18 - Nov '19",
    year: "2018",
    logo: "",
    responsibilities: [
      "Developed custom web solutions for various clients",
      "Managed full project lifecycle from requirements to deployment",
      "Specialized in Vue.js and Node.js development",
    ],
    url: "#",
  }
];
