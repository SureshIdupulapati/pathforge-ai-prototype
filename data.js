// Career benchmark data, skill requirements, roadmaps, and salary estimates
const CAREER_DATA = {
  ai_ml: {
    id: "ai_ml",
    title: "AI & Machine Learning Engineer",
    icon: "🧠",
    description: "Design, train, and deploy production machine learning models, neural networks, and generative AI pipelines.",
    avgSalary: "$125,000 - $185,000",
    demandLevel: "Very High (🔥 38% YoY)",
    requiredSkills: [
      { name: "Python", category: "Language", priority: "Must-Have" },
      { name: "NumPy & Pandas", category: "Data", priority: "Must-Have" },
      { name: "PyTorch or TensorFlow", category: "ML Framework", priority: "Must-Have" },
      { name: "Scikit-Learn", category: "ML Framework", priority: "Must-Have" },
      { name: "Linear Algebra & Calculus", category: "Foundations", priority: "Must-Have" },
      { name: "FastAPI / Model Serving", category: "Deployment", priority: "Must-Have" },
      { name: "Docker & Containerization", category: "DevOps", priority: "Must-Have" },
      { name: "LLM APIs & Prompt Engineering", category: "GenAI", priority: "High" },
      { name: "Vector Databases (Pinecone/Chroma)", category: "GenAI", priority: "High" },
      { name: "RAG Architecture", category: "GenAI", priority: "High" },
      { name: "MLflow / MLOps", category: "MLOps", priority: "Bonus" },
      { name: "GPU Optimization (CUDA/Triton)", category: "Advanced", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Mathematical Foundations & Python Data Mastery",
        estimatedWeeks: 4,
        description: "Solidify Python fluency, matrix arithmetic, vector calculus, statistical inference, and tabular data manipulation.",
        milestones: [
          { id: "aiml-1", title: "Master Python OOP, type hints, and vectorized operations", resource: "Python Official Docs & Exercism", tag: "Core" },
          { id: "aiml-2", title: "Complete NumPy & Pandas data cleaning and exploratory analysis projects", resource: "Kaggle Micro-Courses", tag: "Data" },
          { id: "aiml-3", title: "Implement gradient descent from scratch in pure NumPy", resource: "3Blue1Brown Neural Networks", tag: "Math" }
        ],
        miniProject: {
          title: "Algorithmic Market & Housing Price Predictor",
          difficulty: "Beginner-Friendly",
          specs: "Clean raw census datasets, engineer polynomial features, and predict valuations with linear & ridge regression."
        }
      },
      {
        phaseNumber: 2,
        title: "Classical Machine Learning & Deep Learning Core",
        estimatedWeeks: 5,
        description: "Build supervised and unsupervised ML models, evaluate with precision/recall curves, and transition to PyTorch deep learning.",
        milestones: [
          { id: "aiml-4", title: "Train XGBoost, Random Forests, and SVM classifiers on imbalanced datasets", resource: "Scikit-Learn Tutorials", tag: "Classical ML" },
          { id: "aiml-5", title: "Build, train, and validate a custom CNN image classifier in PyTorch", resource: "PyTorch 60-Minute Blitz", tag: "Deep Learning" },
          { id: "aiml-6", title: "Understand backpropagation, cross-entropy loss, and learning rate schedulers", resource: "Andrej Karpathy's Zero to Hero", tag: "Architecture" }
        ],
        miniProject: {
          title: "Medical Diagnostic Imaging Classifier",
          difficulty: "Intermediate",
          specs: "Train a transfer-learning ResNet model to detect radiological abnormalities with 94%+ F1 score and Grad-CAM interpretability."
        }
      },
      {
        phaseNumber: 3,
        title: "Generative AI, RAG Systems & LLM Engineering",
        estimatedWeeks: 4,
        description: "Harness Transformer architectures, fine-tuning, embeddings, vector indexing, and autonomous AI agents.",
        milestones: [
          { id: "aiml-7", title: "Implement a hybrid search Retrieval-Augmented Generation (RAG) pipeline", resource: "LangChain / LlamaIndex Docs", tag: "GenAI" },
          { id: "aiml-8", title: "Deploy vector embeddings with ChromaDB or Qdrant for semantic search", resource: "Hugging Face NLP Course", tag: "Embeddings" },
          { id: "aiml-9", title: "Evaluate hallucination benchmarks and LLM latency/token optimizations", resource: "OpenAI Cookbooks", tag: "Production" }
        ],
        miniProject: {
          title: "Enterprise Legal Document Intelligence & RAG Chatbot",
          difficulty: "Advanced",
          specs: "Chunk multi-page contracts, store in vector DB with metadata filtering, and answer citations with zero hallucinations."
        }
      },
      {
        phaseNumber: 4,
        title: "Production MLOps, Model Serving & Scaling",
        estimatedWeeks: 3,
        description: "Package models into high-throughput REST APIs, monitor drift, and containerize for cloud deployment.",
        milestones: [
          { id: "aiml-10", title: "Containerize model inference using Docker and asynchronous FastAPI endpoints", resource: "FastAPI Documentation", tag: "Deployment" },
          { id: "aiml-11", title: "Configure model registry, experiment tracking, and metrics logging with MLflow", resource: "MLflow Guides", tag: "MLOps" },
          { id: "aiml-12", title: "Run end-to-end CI/CD automated model evaluation on GitHub Actions", resource: "CML / DVC Guides", tag: "CI/CD" }
        ],
        miniProject: {
          title: "Live Cloud Model API with Real-Time Drift Monitoring",
          difficulty: "Cap-Stone",
          specs: "Deploy a Dockerized inference service on AWS/GCP with latency metrics, rate limiting, and automated regression tests."
        }
      }
    ]
  },

  fullstack: {
    id: "fullstack",
    title: "Full Stack Software Engineer",
    icon: "⚡",
    description: "Architect end-to-end web applications, scalable database schemas, responsive user interfaces, and robust APIs.",
    avgSalary: "$105,000 - $160,000",
    demandLevel: "Extremely High (🔥 42% YoY)",
    requiredSkills: [
      { name: "JavaScript / TypeScript", category: "Language", priority: "Must-Have" },
      { name: "React or Next.js", category: "Frontend", priority: "Must-Have" },
      { name: "Node.js or Express", category: "Backend", priority: "Must-Have" },
      { name: "HTML5 & Modern CSS", category: "Frontend", priority: "Must-Have" },
      { name: "PostgreSQL or MySQL", category: "Database", priority: "Must-Have" },
      { name: "RESTful API Design", category: "Backend", priority: "Must-Have" },
      { name: "Git & GitHub Workflow", category: "Tooling", priority: "Must-Have" },
      { name: "TailwindCSS / CSS Architecture", category: "Frontend", priority: "High" },
      { name: "Authentication (OAuth / JWT)", category: "Security", priority: "High" },
      { name: "Redis / In-Memory Caching", category: "Performance", priority: "High" },
      { name: "Docker & CI/CD Pipelines", category: "DevOps", priority: "Bonus" },
      { name: "GraphQL & WebSockets", category: "Architecture", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Frontend Foundations & Modern JavaScript",
        estimatedWeeks: 3,
        description: "Master modern ES6+, DOM manipulation, responsive layouts, CSS Flexbox/Grid, and async programming.",
        milestones: [
          { id: "fs-1", title: "Deep-dive into async/await, closures, promises, and array prototype methods", resource: "JavaScript.info", tag: "JS Core" },
          { id: "fs-2", title: "Build accessible, responsive UI layouts with semantic HTML and CSS Grid", resource: "MDN Web Docs", tag: "Layouts" },
          { id: "fs-3", title: "Understand Git branching, rebasing, and pull request review workflows", resource: "GitHub Skills", tag: "Git" }
        ],
        miniProject: {
          title: "Real-Time Interactive Kanban Board",
          difficulty: "Beginner-Friendly",
          specs: "Drag-and-drop task management with category filters, keyboard shortcuts, and local storage persistence."
        }
      },
      {
        phaseNumber: 2,
        title: "Modern React, State & TypeScript Architecture",
        estimatedWeeks: 4,
        description: "Component design, custom React hooks, TypeScript static typing, client-side caching, and state management.",
        milestones: [
          { id: "fs-4", title: "Refactor dynamic UI code into strongly-typed TypeScript interfaces and generics", resource: "TypeScript Handbook", tag: "TypeScript" },
          { id: "fs-5", title: "Implement efficient server state synchronization with React Query / TanStack", resource: "TanStack Docs", tag: "State" },
          { id: "fs-6", title: "Master React component lifecycles, memoization, and rendering optimization", resource: "React.dev Official", tag: "React" }
        ],
        miniProject: {
          title: "SaaS Team Analytics & Activity Dashboard",
          difficulty: "Intermediate",
          specs: "Dark/light theme, dynamic SVG charts, multi-filter data tables, and client-side pagination."
        }
      },
      {
        phaseNumber: 3,
        title: "Backend API Engineering, Relational DBs & Auth",
        estimatedWeeks: 4,
        description: "Design relational PostgreSQL schemas, write indexed SQL queries, implement secure JWT/session authentication, and rate limiting.",
        milestones: [
          { id: "fs-7", title: "Design 3rd normal form schemas with foreign keys, indexes, and migrations", resource: "PostgreSQL Tutorial", tag: "Database" },
          { id: "fs-8", title: "Build secure REST API with middleware validation (Zod/Joi) and bcrypt password hashing", resource: "Node.js Best Practices", tag: "Backend" },
          { id: "fs-9", title: "Implement secure refresh-token authentication with HTTP-only cookies", resource: "OWASP Auth Cheat Sheet", tag: "Security" }
        ],
        miniProject: {
          title: "Multi-Tenant Team Workspace API",
          difficulty: "Advanced",
          specs: "Role-based access control (RBAC), database transaction handling, invite tokens, and rate-limiting."
        }
      },
      {
        phaseNumber: 4,
        title: "Full-Stack Integration, Real-Time & Production Deploy",
        estimatedWeeks: 3,
        description: "Connect frontend and backend into an orchestrated application with WebSockets, caching, and cloud hosting.",
        milestones: [
          { id: "fs-10", title: "Implement two-way live messaging using WebSockets / Socket.io", resource: "Socket.io Guides", tag: "Realtime" },
          { id: "fs-11", title: "Cache hot API routes and session data using Redis", resource: "Redis University", tag: "Caching" },
          { id: "fs-12", title: "Automate testing and deployment to Vercel/Render with GitHub Actions", resource: "GitHub Actions Docs", tag: "DevOps" }
        ],
        miniProject: {
          title: "Production Collaborative Document Editor",
          difficulty: "Cap-Stone",
          specs: "Real-time multi-user cursor tracking, autosave with debouncing, markdown export, and automated CI test suite."
        }
      }
    ]
  },

  data_science: {
    id: "data_science",
    title: "Data Scientist & Analytics Specialist",
    icon: "📊",
    description: "Extract actionable business intelligence from complex data using statistical modeling, machine learning, and storytelling.",
    avgSalary: "$110,000 - $165,000",
    demandLevel: "High (📈 31% YoY)",
    requiredSkills: [
      { name: "Python", category: "Language", priority: "Must-Have" },
      { name: "SQL (Window Functions & Joins)", category: "Database", priority: "Must-Have" },
      { name: "Pandas & NumPy", category: "Analysis", priority: "Must-Have" },
      { name: "Data Visualization (Seaborn/Plotly)", category: "Storytelling", priority: "Must-Have" },
      { name: "A/B Testing & Hypothesis Testing", category: "Statistics", priority: "Must-Have" },
      { name: "Supervised & Unsupervised ML", category: "ML", priority: "Must-Have" },
      { name: "Tableau or Power BI", category: "BI Tools", priority: "High" },
      { name: "Feature Engineering & Pipelines", category: "Pipelines", priority: "High" },
      { name: "Git & Version Control", category: "Tooling", priority: "High" },
      { name: "Big Data (PySpark / DuckDB)", category: "Big Data", priority: "Bonus" },
      { name: "Cloud Warehousing (Snowflake/BigQuery)", category: "Cloud", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Advanced SQL & Exploratory Data Analysis",
        estimatedWeeks: 3,
        description: "Complex multi-table querying, window partitions, subqueries, and thorough EDA with Pandas and Seaborn.",
        milestones: [
          { id: "ds-1", title: "Write complex analytical queries with CTEs, window functions, and aggregations", resource: "Mode Analytics SQL Tutorial", tag: "SQL" },
          { id: "ds-2", title: "Conduct multivariate statistical EDA on dirty real-world datasets", resource: "Kaggle Datasets", tag: "EDA" },
          { id: "ds-3", title: "Design publication-grade interactive charts with Plotly and Seaborn", resource: "Plotly Express Guides", tag: "Viz" }
        ],
        miniProject: {
          title: "E-Commerce Customer Retention & Cohort Study",
          difficulty: "Beginner-Friendly",
          specs: "Analyze 500k transaction rows, compute monthly retention cohorts, and identify churn triggers."
        }
      },
      {
        phaseNumber: 2,
        title: "Applied Probability, Statistics & Experimentation",
        estimatedWeeks: 4,
        description: "Master hypothesis testing, p-values, power calculations, A/B testing methodologies, and confidence intervals.",
        milestones: [
          { id: "ds-4", title: "Formulate null hypothesis, calculate sample size, and run two-sample t-tests", resource: "OpenIntro Statistics", tag: "Stats" },
          { id: "ds-5", title: "Design robust A/B testing framework accounting for sample ratio mismatch (SRM)", resource: "Evan Miller A/B Tools", tag: "Experimentation" },
          { id: "ds-6", title: "Perform bootstrapping and permutation tests for non-normal distributions", resource: "StatQuest with Josh Starmer", tag: "Applied Stats" }
        ],
        miniProject: {
          title: "Product Feature Conversion A/B Test Simulator",
          difficulty: "Intermediate",
          specs: "Synthesize user clickstream data, evaluate lift with Bayesian & frequentist metrics, and output executive decision memo."
        }
      },
      {
        phaseNumber: 3,
        title: "Predictive Modeling & Feature Engineering",
        estimatedWeeks: 4,
        description: "Machine learning pipelines, hyperparameter optimization, model explainability (SHAP/LIME), and cross-validation.",
        milestones: [
          { id: "ds-7", title: "Engineer robust data transformations using Scikit-Learn ColumnTransformer and Pipelines", resource: "Scikit-Learn Docs", tag: "Pipelines" },
          { id: "ds-8", title: "Train and tune XGBoost & LightGBM with Optuna hyperparameter optimization", resource: "Optuna Guides", tag: "Tuning" },
          { id: "ds-9", title: "Explain black-box model decisions using SHAP value waterfall plots", resource: "SHAP GitHub", tag: "Explainability" }
        ],
        miniProject: {
          title: "SaaS Customer Churn Early Warning System",
          difficulty: "Advanced",
          specs: "Build predictive pipeline with 88% ROC-AUC, generate per-customer churn explanations, and quantify financial risk."
        }
      },
      {
        phaseNumber: 4,
        title: "Data Storytelling, Dashboarding & Portfolio Curation",
        estimatedWeeks: 3,
        description: "Translate technical findings into executive business cases, build interactive dashboards, and publish technical case studies.",
        milestones: [
          { id: "ds-10", title: "Build an interactive web dashboard using Streamlit or Shiny for Python", resource: "Streamlit Docs", tag: "Dashboards" },
          { id: "ds-11", title: "Draft a data product memo linking metrics directly to revenue ROI", resource: "Harvard Business Review Data Guides", tag: "Storytelling" },
          { id: "ds-12", title: "Publish reproducible GitHub analysis with interactive notebooks and README writeup", resource: "GitHub Showcase", tag: "Portfolio" }
        ],
        miniProject: {
          title: "Interactive Supply Chain Risk & Executive Dashboard",
          difficulty: "Cap-Stone",
          specs: "Streamlit dashboard featuring dynamic scenario sliders, predictive risk forecasts, and automated email alerts."
        }
      }
    ]
  },

  cloud_devops: {
    id: "cloud_devops",
    title: "Cloud & DevOps Solutions Architect",
    icon: "☁️",
    description: "Build automated deployment pipelines, infrastructure as code, container orchestration, and high-availability systems.",
    avgSalary: "$120,000 - $175,000",
    demandLevel: "Very High (🔥 35% YoY)",
    requiredSkills: [
      { name: "Linux & Bash Scripting", category: "OS", priority: "Must-Have" },
      { name: "Docker", category: "Containers", priority: "Must-Have" },
      { name: "Kubernetes (K8s)", category: "Orchestration", priority: "Must-Have" },
      { name: "AWS or Azure", category: "Cloud", priority: "Must-Have" },
      { name: "Terraform (IaC)", category: "IaC", priority: "Must-Have" },
      { name: "CI/CD (GitHub Actions / GitLab)", category: "Automation", priority: "Must-Have" },
      { name: "Networking (DNS, VPC, Subnets)", category: "Networking", priority: "Must-Have" },
      { name: "Prometheus & Grafana", category: "Monitoring", priority: "High" },
      { name: "Ansible", category: "Configuration", priority: "High" },
      { name: "Security & IAM Hardening", category: "Security", priority: "High" },
      { name: "Helm Charts", category: "K8s", priority: "Bonus" },
      { name: "Serverless (AWS Lambda)", category: "Cloud", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Linux Systems Administration & Containerization",
        estimatedWeeks: 3,
        description: "Master Linux terminal tools, file permissions, systemd, process debugging, networking tools, and Docker.",
        milestones: [
          { id: "dev-1", title: "Write robust Bash scripts for system maintenance and health checks", resource: "Linux Command Line Books", tag: "Linux" },
          { id: "dev-2", title: "Create optimized multi-stage Dockerfiles with minimal attack surfaces (<50MB)", resource: "Docker Best Practices", tag: "Docker" },
          { id: "dev-3", title: "Orchestrate multi-container environments with Docker Compose and volumes", resource: "Docker Docs", tag: "Containers" }
        ],
        miniProject: {
          title: "Hardened Multi-Container Microservices Stack",
          difficulty: "Beginner-Friendly",
          specs: "Configure Nginx reverse proxy, Node.js API, and Redis cache with non-root user execution and healthchecks."
        }
      },
      {
        phaseNumber: 2,
        title: "Infrastructure as Code (IaC) & Cloud Architecture",
        estimatedWeeks: 4,
        description: "Provision reproducible cloud infrastructure with Terraform, establish VPCs, subnets, and secure IAM policies.",
        milestones: [
          { id: "dev-4", title: "Design resilient multi-AZ VPC with public/private subnets and NAT gateways", resource: "AWS Well-Architected Framework", tag: "Cloud" },
          { id: "dev-5", title: "Write modular Terraform code with remote state locking in S3 + DynamoDB", resource: "HashiCorp Learn", tag: "Terraform" },
          { id: "dev-6", title: "Enforce least-privilege IAM roles and automated security drift scanning", resource: "tfsec / Checkov", tag: "Security" }
        ],
        miniProject: {
          title: "Automated Multi-Tier AWS Web Environment via Terraform",
          difficulty: "Intermediate",
          specs: "Deploy auto-scaling group, Application Load Balancer, and RDS PostgreSQL with automated backup policies."
        }
      },
      {
        phaseNumber: 3,
        title: "Continuous Delivery (CI/CD) & GitOps",
        estimatedWeeks: 3,
        description: "Automate automated linting, security testing, container builds, and canary deployments to production.",
        milestones: [
          { id: "dev-7", title: "Build multi-stage GitHub Actions workflow with matrix testing and artifact caching", resource: "GitHub Actions Guide", tag: "CI/CD" },
          { id: "dev-8", title: "Integrate SAST security scanning with Trivy and SonarQube in CI pipeline", resource: "Trivy Security Docs", tag: "DevSecOps" },
          { id: "dev-9", title: "Configure automated blue/green or canary deployment triggers", resource: "ArgoCD / GitOps Docs", tag: "GitOps" }
        ],
        miniProject: {
          title: "Zero-Downtime Production Pipeline with Automated Rollback",
          difficulty: "Advanced",
          specs: "Full GitHub Actions pipeline building images, pushing to ECR, running smoke tests, and rolling back upon failure."
        }
      },
      {
        phaseNumber: 4,
        title: "Kubernetes Orchestration & Observability",
        estimatedWeeks: 4,
        description: "Deploy scalable workloads in Kubernetes, configure Horizontal Pod Autoscaling, and build Grafana dashboards.",
        milestones: [
          { id: "dev-10", title: "Deploy Kubernetes Pods, Deployments, Services, and Ingress with Cert-Manager", resource: "Kubernetes.io Tutorials", tag: "K8s" },
          { id: "dev-11", title: "Package applications into reusable Helm charts with custom values.yaml", resource: "Helm Documentation", tag: "Helm" },
          { id: "dev-12", title: "Set up Prometheus metric scraping and create production Grafana alert rules", resource: "Prometheus Monitoring", tag: "Observability" }
        ],
        miniProject: {
          title: "Production EKS/K8s Cluster with Prometheus Alerting",
          difficulty: "Cap-Stone",
          specs: "Kubernetes cluster with autoscaling pods, SSL termination, rate-limiting ingress, and automated Slack alert triggers."
        }
      }
    ]
  },

  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity & Information Security Analyst",
    icon: "🛡️",
    description: "Defend organizational assets against threats, assess vulnerabilities, conduct incident response, and enforce security policies.",
    avgSalary: "$100,000 - $155,000",
    demandLevel: "Very High (🔥 36% YoY)",
    requiredSkills: [
      { name: "Networking (TCP/IP, OSI Model, DNS)", category: "Foundations", priority: "Must-Have" },
      { name: "Linux & Command Line", category: "Systems", priority: "Must-Have" },
      { name: "Wireshark & Packet Analysis", category: "Network Security", priority: "Must-Have" },
      { name: "Security Information & Event Management (SIEM)", category: "Blue Team", priority: "Must-Have" },
      { name: "Vulnerability Scanning (Nessus/Nmap)", category: "Assessment", priority: "Must-Have" },
      { name: "OWASP Top 10 Web Vulnerabilities", category: "AppSec", priority: "Must-Have" },
      { name: "Incident Response Frameworks (NIST)", category: "Operations", priority: "High" },
      { name: "Python / Bash Scripting", category: "Automation", priority: "High" },
      { name: "Metasploit & Burp Suite Basics", category: "Offensive", priority: "High" },
      { name: "Cloud Security (AWS IAM/GuardDuty)", category: "Cloud", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Network Fundamentals, Protocols & Packet Inspection",
        estimatedWeeks: 3,
        description: "Understand subnets, routing protocols, firewalls, TLS handshakes, and packet analysis with Wireshark.",
        milestones: [
          { id: "sec-1", title: "Analyze PCAP network captures in Wireshark to detect suspicious beaconing and DNS tunneling", resource: "Wireshark University", tag: "Networking" },
          { id: "sec-2", title: "Map subnet topologies and identify open ports with Nmap scripting engine", resource: "Nmap Network Scanning", tag: "Recon" },
          { id: "sec-3", title: "Configure host-based firewall rules (UFW/iptables) and verify traffic blocking", resource: "Linux Security Guide", tag: "Defense" }
        ],
        miniProject: {
          title: "Network Traffic & Threat Packet Analysis Report",
          difficulty: "Beginner-Friendly",
          specs: "Deconstruct malicious PCAP capture, isolate rogue C2 IP addresses, and write an actionable triage report."
        }
      },
      {
        phaseNumber: 2,
        title: "Web Application Security & OWASP Top 10",
        estimatedWeeks: 4,
        description: "Identify and remediate SQL injection, cross-site scripting (XSS), broken access control, and CSRF vulnerabilities.",
        milestones: [
          { id: "sec-4", title: "Audit web applications using Burp Suite proxy and discover injection flaws", resource: "PortSwigger Web Security Academy", tag: "AppSec" },
          { id: "sec-5", title: "Implement parameterized SQL queries and Content Security Policy (CSP) headers", resource: "OWASP Cheat Sheet Series", tag: "Mitigation" },
          { id: "sec-6", title: "Conduct authenticated vulnerability assessments with Nessus or OpenVAS", resource: "Tenable Community", tag: "Scanning" }
        ],
        miniProject: {
          title: "Full OWASP Web Application Penetration Test",
          difficulty: "Intermediate",
          specs: "Audit vulnerable test application (OWASP Juice Shop), exploit 5 core vulnerabilities, and prepare executive remediation guide."
        }
      },
      {
        phaseNumber: 3,
        title: "SIEM Threat Hunting & Security Operations (SOC)",
        estimatedWeeks: 4,
        description: "Log ingestion, correlation rules, Splunk/Wazuh alert investigation, and MITRE ATT&CK mapping.",
        milestones: [
          { id: "sec-7", title: "Ingest Windows Event logs and Sysmon into Splunk or Wazuh SIEM", resource: "Splunk Free Training", tag: "SIEM" },
          { id: "sec-8", title: "Write detection rules for brute force logins and privilege escalation techniques", resource: "Sigma Rules Community", tag: "Detection" },
          { id: "sec-9", title: "Map observed attacker tactics to MITRE ATT&CK matrix techniques", resource: "MITRE ATT&CK Navigator", tag: "Threat Intel" }
        ],
        miniProject: {
          title: "End-to-End SOC SIEM Lab & Incident Investigation",
          difficulty: "Advanced",
          specs: "Configure a Wazuh SIEM virtual lab, simulate a credential stuffing attack, trigger alerts, and write a forensic log timeline."
        }
      },
      {
        phaseNumber: 4,
        title: "Incident Response Playbooks & Threat Intelligence",
        estimatedWeeks: 3,
        description: "Develop NIST SP 800-61 incident response procedures, forensic artifact collection, and security governance.",
        milestones: [
          { id: "sec-10", title: "Formulate an incident response playbook for ransomware and data breach scenarios", resource: "NIST Computer Security Resource Center", tag: "Playbook" },
          { id: "sec-11", title: "Extract IOCs (Indicators of Compromise) and automate IP reputation lookups in Python", resource: "VirusTotal API Docs", tag: "Automation" },
          { id: "sec-12", title: "Pass practice exams for CompTIA Security+ or Certified in Cybersecurity (CC)", resource: "Professor Messer Security+", tag: "Certification" }
        ],
        miniProject: {
          title: "Automated Threat Intel Feed & Incident Playbook",
          difficulty: "Cap-Stone",
          specs: "Python script polling AlienVault OTX, enriching suspicious IPs, alerting Discord/Slack, and generating NIST-compliant incident reports."
        }
      }
    ]
  },

  product_mgmt: {
    id: "product_mgmt",
    title: "Technical Product Manager",
    icon: "🚀",
    description: "Bridge engineering, design, and business strategy to define product vision, conduct user research, and drive iterative execution.",
    avgSalary: "$115,000 - $170,000",
    demandLevel: "High (📈 28% YoY)",
    requiredSkills: [
      { name: "Product Strategy & OKRs", category: "Strategy", priority: "Must-Have" },
      { name: "User Research & Customer Interviews", category: "Research", priority: "Must-Have" },
      { name: "PRD (Product Requirement Documents)", category: "Execution", priority: "Must-Have" },
      { name: "Agile & Scrum Methodologies", category: "Process", priority: "Must-Have" },
      { name: "Metrics & North Star Definition", category: "Analytics", priority: "Must-Have" },
      { name: "Wireframing & Prototyping (Figma)", category: "Design", priority: "High" },
      { name: "Basic SQL & Data Exploration", category: "Analytics", priority: "High" },
      { name: "Technical Architecture Awareness (APIs, DBs)", category: "Technical", priority: "High" },
      { name: "Go-to-Market (GTM) Planning", category: "Business", priority: "High" },
      { name: "A/B Testing Product Experiments", category: "Analytics", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Product Discovery, Customer Empathy & Problem Validation",
        estimatedWeeks: 3,
        description: "Conduct structured user interviews, synthesize qualitative insights, create customer journey maps, and validate market pain points.",
        milestones: [
          { id: "pm-1", title: "Conduct 5 structured customer problem interviews using 'The Mom Test' methodology", resource: "The Mom Test Book Summary", tag: "Discovery" },
          { id: "pm-2", title: "Synthesize findings into empathy maps, persona archetypes, and value proposition canvas", resource: "Strategyzer Canvas", tag: "Strategy" },
          { id: "pm-3", title: "Evaluate market size (TAM, SAM, SOM) and analyze competitive landscape", resource: "Reforge Product Strategy", tag: "Market" }
        ],
        miniProject: {
          title: "Product Discovery & Market Opportunity Canvas",
          difficulty: "Beginner-Friendly",
          specs: "Select an underserved problem space, validate customer pain through 5 mock interview transcripts, and pitch 3 distinct solution vectors."
        }
      },
      {
        phaseNumber: 2,
        title: "PRD Writing, User Stories & Feature Prioritization",
        estimatedWeeks: 4,
        description: "Write comprehensive Product Requirement Documents (PRDs), write engineering-ready user stories, and prioritize using RICE.",
        milestones: [
          { id: "pm-4", title: "Draft a comprehensive PRD with clear problem statements, non-goals, and technical constraints", resource: "Lenny's Newsletter PRD Templates", tag: "PRD" },
          { id: "pm-5", title: "Score backlog candidate features using RICE (Reach, Impact, Confidence, Effort) matrix", resource: "Intercom RICE Framework", tag: "Prioritization" },
          { id: "pm-6", title: "Create interactive user flows and low-fidelity interactive wireframes in Figma", resource: "Figma for Product Managers", tag: "Prototyping" }
        ],
        miniProject: {
          title: "Full Product Specification (PRD) & Figma Wireframe",
          difficulty: "Intermediate",
          specs: "Complete PRD for a mobile micro-investment tool with user stories, acceptance criteria, edge cases, and clickable Figma prototype."
        }
      },
      {
        phaseNumber: 3,
        title: "Product Analytics, Metrics & North Star Frameworks",
        estimatedWeeks: 3,
        description: "Define core North Star Metric, build pirate funnel metrics (AARRR), write SQL for feature adoption, and design experiments.",
        milestones: [
          { id: "pm-7", title: "Establish North Star Metric and input metric tree for a SaaS or consumer application", resource: "Amplitude Product Analytics Playbook", tag: "Metrics" },
          { id: "pm-8", title: "Write SQL queries to measure daily active users (DAU/MAU) and 7-day retention curves", resource: "SQL for Product Managers", tag: "Analytics" },
          { id: "pm-9", title: "Formulate hypothesis-driven experiment briefs with primary/guardrail metrics", resource: "Optimizely Experimentation Library", tag: "Experimentation" }
        ],
        miniProject: {
          title: "Product Analytics Dashboard & Experiment Design",
          difficulty: "Advanced",
          specs: "Define metrics taxonomy, create retention cohort analysis, and design a feature onboarding A/B test with sample size calculations."
        }
      },
      {
        phaseNumber: 4,
        title: "Go-to-Market Strategy, Agile Execution & Leadership",
        estimatedWeeks: 3,
        description: "Lead sprint planning ceremonies, manage release launch checklists, align stakeholders, and launch cross-channel GTM campaigns.",
        milestones: [
          { id: "pm-10", title: "Facilitate sprint planning, backlog grooming, and retrospective ceremonies in Jira", resource: "Atlassian Agile Coach", tag: "Agile" },
          { id: "pm-11", title: "Formulate a Go-To-Market launch plan with marketing, sales enablement, and support docs", resource: "First Round Review Product Launches", tag: "GTM" },
          { id: "pm-12", title: "Conduct mock executive presentation addressing trade-offs, roadmap conflicts, and ROI", resource: "Exponent PM Interview Prep", tag: "Leadership" }
        ],
        miniProject: {
          title: "Product Teardown & Executive Launch Portfolio",
          difficulty: "Cap-Stone",
          specs: "In-depth teardown of a top product (e.g. Notion or Duolingo), identifying next killer feature with complete PRD, GTM plan, and financial model."
        }
      }
    ]
  },

  ui_ux: {
    id: "ui_ux",
    title: "Product & UI/UX Systems Designer",
    icon: "🎨",
    description: "Craft intuitive, accessible digital experiences, scalable design systems, micro-interactions, and high-fidelity prototypes.",
    avgSalary: "$95,000 - $150,000",
    demandLevel: "High (🎨 29% YoY)",
    requiredSkills: [
      { name: "Figma (Auto Layout & Components)", category: "Design Tools", priority: "Must-Have" },
      { name: "Design Systems & Token Architecture", category: "Systems", priority: "Must-Have" },
      { name: "User Research & Usability Testing", category: "Research", priority: "Must-Have" },
      { name: "Information Architecture & Wireframing", category: "UX", priority: "Must-Have" },
      { name: "Interaction Design & Prototyping", category: "Interaction", priority: "Must-Have" },
      { name: "Accessibility (WCAG 2.1 AA Compliance)", category: "Accessibility", priority: "Must-Have" },
      { name: "Visual Hierarchy, Typography & Color", category: "UI", priority: "Must-Have" },
      { name: "HTML & CSS Awareness", category: "Technical", priority: "High" },
      { name: "Micro-Animations & Lottie", category: "Delight", priority: "High" },
      { name: "Design Handoff & Developer Collaboration", category: "Workflow", priority: "Bonus" }
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "User Experience Foundations & UX Research",
        estimatedWeeks: 3,
        description: "Master heuristics, user interviews, information architecture, journey maps, and low-fidelity paper/digital wireframing.",
        milestones: [
          { id: "ux-1", title: "Conduct heuristic evaluation on an existing application based on Nielsen Norman 10 heuristics", resource: "NN/g Heuristic Guidelines", tag: "Heuristics" },
          { id: "ux-2", title: "Organize card-sorting study and define information architecture site maps", resource: "Optimal Workshop Guides", tag: "Information Architecture" },
          { id: "ux-3", title: "Build clickable wireframes validating user task completion flows", resource: "Figma Community Wireframes", tag: "Wireframes" }
        ],
        miniProject: {
          title: "UX Audit & Wireframe Redesign Case Study",
          difficulty: "Beginner-Friendly",
          specs: "Analyze friction points in a public government or university portal, conduct usability testing, and produce low-fidelity wireframe overhaul."
        }
      },
      {
        phaseNumber: 2,
        title: "Visual Design Mastery, Typography & Figma Systems",
        estimatedWeeks: 4,
        description: "Advanced Figma auto-layout 5.0, variables, design tokens, color ramps, typography scales, and responsive variants.",
        milestones: [
          { id: "ux-4", title: "Build scalable design token architecture (spacing, color modes, elevation, typography)", resource: "Material Design 3 & Apple HIG", tag: "Tokens" },
          { id: "ux-5", title: "Master nested Auto Layout, component variants, and interactive properties in Figma", resource: "Figma Advanced Tutorials", tag: "Figma" },
          { id: "ux-6", title: "Verify color contrast ratios and keyboard navigation to achieve WCAG 2.1 AA standards", resource: "Stark Accessibility Tools", tag: "A11y" }
        ],
        miniProject: {
          title: "Production Design System & Component Library",
          difficulty: "Intermediate",
          specs: "Create comprehensive UI kit with 25+ components, complete states (hover, focus, disabled, active), dark/light modes, and documentation."
        }
      },
      {
        phaseNumber: 3,
        title: "High-Fidelity Interaction Design & Micro-Animations",
        estimatedWeeks: 4,
        description: "Interactive smart animations, dynamic variables in prototyping, realistic feedback states, and micro-delight transitions.",
        milestones: [
          { id: "ux-7", title: "Build complex Figma prototypes utilizing conditional logic, variables, and expressions", resource: "Figma Variables Documentation", tag: "Prototyping" },
          { id: "ux-8", title: "Design purposeful micro-interactions with spring physics and fluid transitions", resource: "Interaction Design Foundation", tag: "Micro-Interactions" },
          { id: "ux-9", title: "Conduct remote unmoderated usability tests with Maze or Useberry to validate UX", resource: "Maze Usability Testing Guide", tag: "Testing" }
        ],
        miniProject: {
          title: "High-Fidelity Mobile Banking & Investment App",
          difficulty: "Advanced",
          specs: "End-to-end interactive mobile experience with biometric unlock animation, money transfer flows, and live balance graphing."
        }
      },
      {
        phaseNumber: 4,
        title: "Design Handoff, Case Study Presentation & Portfolio",
        estimatedWeeks: 3,
        description: "Document spacing/token specs for engineering handoff, write compelling portfolio storytelling case studies, and launch personal site.",
        milestones: [
          { id: "ux-10", title: "Generate developer-ready handoff documentation with redlining and CSS token mappings", resource: "Design Systems Repo", tag: "Handoff" },
          { id: "ux-11", title: "Structure in-depth portfolio case studies emphasizing problem, iteration, data, and impact", resource: "Best UX Portfolios Showcase", tag: "Portfolio" },
          { id: "ux-12", title: "Conduct mock design critique presentation defending design decisions with user data", resource: "Designing for Humans Podcast", tag: "Critique" }
        ],
        miniProject: {
          title: "Flagship Portfolio Case Study & Interactive Prototype",
          difficulty: "Cap-Stone",
          specs: "Comprehensive case study showcasing problem framing, research artifacts, 3 design iterations, usability metrics, and live prototype."
        }
      }
    ]
  }
};

// Preset profiles for instant demo testing
const PRESET_PROFILES = [
  {
    name: "CS Student → AI/ML Engineer",
    roleId: "ai_ml",
    level: "student",
    hours: 15,
    timeline: "6_months",
    skills: ["Python", "NumPy & Pandas", "Linear Algebra & Calculus", "Git & GitHub Workflow"]
  },
  {
    name: "Frontend Dev → Full Stack Pro",
    roleId: "fullstack",
    level: "junior",
    hours: 20,
    timeline: "3_months",
    skills: ["JavaScript / TypeScript", "HTML5 & Modern CSS", "React or Next.js", "TailwindCSS / CSS Architecture", "Git & GitHub Workflow"]
  },
  {
    name: "Business Analyst → Data Scientist",
    roleId: "data_science",
    level: "switcher",
    hours: 12,
    timeline: "6_months",
    skills: ["SQL (Window Functions & Joins)", "Tableau or Power BI", "A/B Testing & Hypothesis Testing"]
  },
  {
    name: "Junior SysAdmin → Cloud DevOps",
    roleId: "cloud_devops",
    level: "junior",
    hours: 18,
    timeline: "6_months",
    skills: ["Linux & Bash Scripting", "Networking (DNS, VPC, Subnets)", "Docker", "Git & GitHub Workflow"]
  }
];
