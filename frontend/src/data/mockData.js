// Mock data for Cloud System Architect Portfolio

export const techStackURL = {
  Kubernetes: "https://github.com/vitrixLab/kubernetes",
  Docker: "https://github.com/vitrixLab/docker",
  SAP: "https://github.com/vitrixLab/SAP",
  Azure: "https://github.com/vitrixLab/Azure",
  Terraform: "https://github.com/vitrixLab/Azure-Terraform",
  NodeJS: "https://github.com/vitrixLab/Node.js",
  Python: "https://github.com/vitrixLab/cpython", 
  LLM: "https://github.com/vitrixLab/MCP-Server-LLM",
  PostgreSQL: "https://github.com/vitrixLab/Supabase-PostgreSQL",
  Jenkins: "https://github.com/vitrixLab/jenkins",
  Helm: "https://github.com/vitrixLab/helm",
  AWS: "https://github.com/vitrixLab/aws-sam-cli",
  Prometheus: "https://github.com/vitrixLab/prometheus",
  Apache_Kafka: "https://github.com/vitrixLab/kafka",
  Apache_Spark: "https://github.com/vitrixLab/spark",
  ElasticSearch: "https://github.com/vitrixLab/elasticsearch",
  React: "https://github.com/vitrixLab/react",
  MongoDB: "https://github.com/vitrixLab/mongoDB",
};

export const projects = [
  {
    id: 1,
    title: "Enterprise ERP Cloud Migration",
    description: "Architected and deployed SAP S/4HANA cloud migration for Fortune 500 company, reducing operational costs by 40% and improving system performance by 3x.",
    techStack: ["Kubernetes", "Docker", "SAP", "Azure", "Terraform"],
    category: "Cloud Architecture",
    status: "Ongoing",
    duration: "8 months",
    highlights: [
      "Zero-downtime migration strategy",
      "Implemented microservices architecture",
      "Automated CI/CD pipeline with 99.9% uptime"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Microservices Platform",
    description: "Built scalable SaaS platform integrating local LLMs with cloud infrastructure, serving 500K+ daily API requests with sub-200ms response times.",
    techStack: ["Node.js", "Python", "LLM", "Kubernetes", "PostgreSQL"],
    category: "AI Integration",
    status: "Live Production",
    duration: "12 months",
    highlights: [
      "Local LLM evaluation pipeline",
      "SLM optimization for native code",
      "Auto-scaling microservices architecture"
    ]
  },
  {
    id: 3,
    title: "Multi-Cloud DevOps Pipeline",
    description: "Designed hybrid cloud infrastructure spanning AWS, Azure, and GCP with unified CI/CD pipeline, achieving 95% deployment success rate.",
    techStack: ["Jenkins", "Helm", "Docker", "AWS", "Prometheus"],
    category: "DevOps",
    status: "Ongoing",
    duration: "6 months",
    highlights: [
      "Cross-cloud service mesh implementation",
      "Automated infrastructure provisioning",
      "Real-time monitoring and alerting"
    ]
  },
  {
    id: 4,
    title: "Business Intelligence Integration Suite",
    description: "Developed unified BI platform connecting disparate data sources across ERP, CRM, and legacy systems for real-time analytics and reporting.",
    techStack: ["Apache_Kafka", "Apache_Spark", "ElasticSearch", "React", "MongoDB"],
    category: "Data Architecture",
    status: "Beta Testing",
    duration: "10 months",
    highlights: [
      "Real-time data streaming pipeline",
      "Advanced analytics dashboard",
      "Machine learning-powered insights"
    ]
  }
];

export const techStack = [
  {
    category: "Cloud & Container Orchestration",
    technologies: [
      { name: "Kubernetes", icon: "⚙️", description: "Container orchestration and cluster management" },
      { name: "Docker", icon: "📦", description: "Containerization and microservices deployment" },
      { name: "Helm", icon: "⎈", description: "Kubernetes package management" },
      { name: "AWS/Azure/GCP", icon: "☁️", description: "Multi-cloud infrastructure management" }
    ]
  },
  {
    category: "Enterprise Integration",
    technologies: [
      { name: "SAP S/4HANA", icon: "🏢", description: "Enterprise resource planning systems" },
      { name: "ERP Integration", icon: "🔗", description: "Cross-platform enterprise system connectivity" },
      { name: "Business Intelligence", icon: "📊", description: "Data analytics and reporting platforms" },
      { name: "API Gateway", icon: "🌐", description: "Microservices communication hub" }
    ]
  },
  {
    category: "AI & Machine Learning",
    technologies: [
      { name: "Local LLM", icon: "🤖", description: "On-premise large language model deployment" },
      { name: "Cloud LLM", icon: "🧠", description: "Cloud-based AI model integration" },
      { name: "SLM Optimization", icon: "⚡", description: "Small language model for edge computing" },
      { name: "ML Pipelines", icon: "🔄", description: "Automated machine learning workflows" }
    ]
  },
  {
    category: "Architecture & Development",
    technologies: [
      { name: "MVC Architecture", icon: "🏗️", description: "Scalable application design patterns" },
      { name: "Microservices", icon: "🔧", description: "Distributed system architecture" },
      { name: "SaaS Platforms", icon: "💼", description: "Software as a Service development" },
      { name: "CI/CD Pipelines", icon: "🚀", description: "Continuous integration and deployment" }
    ]
  }
];

export const personalInfo = {
  name: "Soo Ji Dano",
  title: "Cloud System Architect & SaaS Integration Specialist",
  tagline: "Designing scalable cloud-native architectures, orchestrating microservices, and integrating AI-driven intelligence for enterprise solutions.",
  bio: "With over 8 years of experience in cloud architecture and enterprise system integration, I specialize in building scalable, resilient infrastructure that powers modern businesses. My expertise spans from Kubernetes orchestration to AI-powered microservices, delivering solutions that bridge the gap between complex enterprise requirements and cutting-edge technology.",
  experience: "8+ years",
  projectsCompleted: "50+",
  clientsSatisfied: "25+",
  email: "soojidano@gmail.com",
  location: "Manila, PH",
  availability: "Available for consulting"
};
