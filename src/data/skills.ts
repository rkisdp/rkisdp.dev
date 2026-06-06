import awsImage from "../assets/images/skills/aws.png";
import kafkaImage from "../assets/images/skills/kafka.png";
import langchainImage from "../assets/images/skills/langchain.svg";
import grafanaImage from "../assets/images/skills/grafana.svg";
import langfuseImage from "../assets/images/skills/langfuse.svg";
import airflowImage from "../assets/images/skills/airflow.svg";
import aiImage from "../assets/images/skills/ai.svg";
import mlImage from "../assets/images/skills/ml.svg";

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
  {
    name: "Artificial Intelligence",
    image: aiImage,
      invert: true,
  },
  {
    name: "Machine Learning",
    image: mlImage,
  },
  {
    name: "LangChain",
    image: langchainImage,
  },
  {
    name: "Grafana",
    image: grafanaImage,
  },
  {
    name: "Langfuse",
    image: langfuseImage,
  },
  {
    name: "Airflow",
    image: airflowImage,
  },
];
