import abhishekImage from "../assets/images/testimonials/abhishek.jpeg";
import raviImage from "../assets/images/testimonials/ravi.jpeg";
import rohitImage from "../assets/images/testimonials/rohit.jpeg";
import abhigajrajImage from "../assets/images/testimonials/abhigajraj.jpeg";
import kavishImage from "../assets/images/testimonials/kavish.jpeg";

export interface Testimonial {
  name: string;
  designation: string;
  image: string;
  text: string;
  linkedin: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ravi Gupta",
    designation: "Region Head(EMEA) at Locobuzz",
    image: raviImage,
    text: "I have directly worked with Divya Prakash and found him to a fantastic and enthusiastic as person. I would really appreciate his skill set and source of information. He is a well connected person and would highly recommend him.",
    linkedin: "https://www.linkedin.com/in/meetravigupta/",
  },
  {
    name: "Kavish Baghel",
    designation: "Senior Engineer at Dunnhumby",
    image: kavishImage,
    text: "Divya has been a great team member. He has always taken full responsibility of the task assigned to him and has always kept the team energy high. He aims to achieve perfection and helps everyone along his work.",
    linkedin: "https://www.linkedin.com/in/kavishbaghel/",
  },
  {
    name: "Abhishek Gajraj",
    designation: "AVP(Product) at Naukri.com",
    image: abhigajrajImage,
    text: "Divya is a positive and multi-talented individual with great work skill sets. His in-depth knowledge on the Python has been impressive. He is a sincere and smart working professional with a great appetite to learn new things. His strong work ethics and focused approach are commendable. ",
    linkedin: "https://www.linkedin.com/in/abhishekgajraj/",
  },
  {
    name: "Rohit Sharma",
    designation: "QA Manager at Squareboat",
    image: rohitImage,
    text: "Divya Prakash has always been a great resource to work with. He is always willing to jump in as part of the team, whether it be to create a new functionality, to fix a problem or to determine the root cause of a bug. His problem-solving capabilities are very good. In the time that I have worked with Divya, I have been impressed by his thorough, creative approach to his work. He has been an indispensable part of our projects, and I look forward to working with him in the future too.",
    linkedin: "https://www.linkedin.com/in/rohitsharma2206/",
  },
  {
    name: "Abhishek Mishra",
    designation: "Assistant Manager at Deloitte, UK",
    image: abhishekImage,
    text: "I have known Divya Prakash as my course mate at the University of Southampton. He is exceptionally talented and has good proficiency in python programming language. Throughout the program, he has successfully developed quality codes and solutions. I highly recommend him for his technical expertise and business knowledge and I am sure he will be a great asset to any company.",
    linkedin: "https://www.linkedin.com/in/abhishekmishra1095/",
  },
];
