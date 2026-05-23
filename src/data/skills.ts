import awsImage from "../assets/images/skills/aws.png";
import kafkaImage from "../assets/images/skills/kafka.png";

export interface Skill {
  name: string;
  image: string;
  invert?: boolean;
}

export const skills: Skill[] = [
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Golang",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Django",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    invert: true,
  },
  {
    name: "Flask",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    invert: true,
  },
  {
    name: "FastAPI",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "MySQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    invert: true,
  },
  {
    name: "PostgreSQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Elasticsearch",
    image: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg",
  },
  {
    name: "Redis",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    image: awsImage,
  },
  {
    name: "Kafka",
    image: kafkaImage,
  },
];
