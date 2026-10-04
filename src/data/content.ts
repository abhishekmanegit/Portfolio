export const profile = {
  name: "Abhishek Mane",
  firstName: "Abhishek",
  role: "Computer Science & Engineering",
  tagline: "Engineer who understands systems, products, and how software gets built.",
  email: "abhishekmane2110@gmail.com",
  phone: "+91 91560 68192",
  location: "Sangli, Maharashtra, India",
  links: {
    github: "https://github.com/abhishekmanegit",
    linkedin: "https://www.linkedin.com/in/abhishekmane1/",
    leetcode: "https://leetcode.com/u/god-abhishek/",
    portfolio: "/",
  },
  // Path to resume PDF. Update this one value to rewire the button.
  resume: "/Abhishek_Mane_BTech.pdf",
}

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
]

export type Project = {
  id: string
  index: string
  title: string
  category: string
  oneLiner: string
  description: string
  problem: string
  built: string[]
  approach: string
  decisions: string[]
  stack: string[]
  features: string[]
  architecture?: {
    label: string
    nodes: { name: string; detail?: string }[]
    note?: string
  }
  github: string
  live?: string
  accent: string
  signature?: boolean
}

export const featuredProjects: Project[] = [
  {
    id: "event-driven-order-system",
    index: "01",
    title: "Event-Driven Order System",
    category: "Distributed Systems · Kafka",
    oneLiner:
      "A Kafka-based microservices system that coordinates order, inventory, and notification services using the SAGA choreography pattern.",
    description:
      "Built a production-style event-driven system where three independent Spring Boot services communicate asynchronously through Apache Kafka instead of synchronous REST calls. A SAGA state machine keeps each service's data consistent without a distributed transaction manager.",
    problem:
      "Coordinating an order across separate services (ordering, inventory, notifications) with synchronous calls couples them together, makes partial failures hard, and slows the whole flow. I wanted services that stay independent but still reach a consistent outcome.",
    built: [
      "Three independent Spring Boot services (order, inventory, notification) sharing Kafka event contracts as Java records",
      "A SAGA choreography flow where order state moves PENDING → APPROVED or REJECTED based on inventory results",
      "Idempotency guards in the inventory consumer so retried events never double-reserve stock",
      "Dead-letter topics (order-events.DLT, inventory-events.DLT) with retry routing on failure",
      "Docker Compose orchestration for Kafka, Zookeeper, and two PostgreSQL databases",
    ],
    approach:
      "Each service publishes and consumes domain events. The order service saves the order in a PENDING state, then publishes an OrderCreatedEvent. The inventory service reserves stock and responds with an InventoryReservedEvent or an InventoryFailedEvent. The order service advances its state machine accordingly, while the notification service consumes both streams to log customer notifications. Consumers enable idempotence and use key-based partitioning so events for one order stay ordered.",
    decisions: [
      "SAGA choreography over orchestration — keeps services decoupled, no central coordinator",
      "Kafka over REST between services — async resilience, so one slow service never blocks the flow",
      "Schema-evolution resilient JSON (FAIL_ON_UNKNOWN_PROPERTIES=false) — tolerant of contract changes",
      "Idempotent consumers + DLQ — handles at-least-once delivery without corrupting stock",
    ],
    stack: [
      "Java 17",
      "Spring Boot 3.3.4",
      "Apache Kafka",
      "PostgreSQL 15",
      "Docker Compose",
      "Maven",
      "SpringDoc OpenAPI",
      "Actuator",
    ],
    features: [
      "SAGA state machine",
      "Idempotency guards",
      "Dead-letter queue",
      "Key-based partitioning",
      "Schema-evolution resilient",
      "3 Kafka topics with 3 partitions",
    ],
    architecture: {
      label: "Event flow",
      nodes: [
        { name: "Order Service", detail: "REST API · SAGA state" },
        { name: "Kafka · order-events", detail: "async broker" },
        { name: "Inventory Service", detail: "stock · idempotency" },
        { name: "Kafka · inventory-events", detail: "async broker" },
        { name: "Notification Service", detail: "consumes both streams" },
      ],
      note: "Failure paths route to a dead-letter topic after retries; a SAGA keeps service data consistent.",
    },
    github: "https://github.com/abhishekmanegit/event-driven-order-system",
    accent: "#e3541e",
    signature: true,
  },
  {
    id: "sitcoe-faq-chatbot",
    index: "02",
    title: "SITCOE FAQ Chatbot",
    category: "GenAI · REST API",
    oneLiner:
      "A deployed AI-powered FAQ chatbot for college students, backed by a Spring Boot REST API integrated with Groq's LLM.",
    description:
      "Built and deployed an AI chatbot that answers student questions about courses, campus facilities, and college information in plain English. A Spring Boot backend wraps Groq's LLM API and feeds it a SITCOE-specific knowledge base for context-aware answers.",
    problem:
      "Students repeat the same questions about courses, WiFi, gym, and canteen timings. A static FAQ page is unhelpful, but an LLM without college context gives generic or wrong answers.",
    built: [
      "Spring Boot REST backend exposing an /api/chat endpoint",
      "Groq LLM integration with a college-specific system prompt",
      "A conversational frontend (HTML, CSS, JS) served from the Spring Boot app",
      "Extensible knowledge base covering courses, campus facilities, and timings",
    ],
    approach:
      "The frontend sends the user's question to the backend. The backend builds a prompt that includes SITCOE facts alongside the LLM's system instruction, forwards it to Groq, and returns the contextual answer to the chat UI. Keeping the API key server-side avoids exposing credentials in the browser.",
    decisions: [
      "REST API seam between chat UI and LLM — the model is swappable without touching the frontend",
      "College facts injected at request time — keeps answers grounded instead of purely generative",
      "API key stored as an environment variable on the server — never shipped to the client",
    ],
    stack: ["Java", "Spring Boot", "REST API", "Groq API", "GenAI", "Maven"],
    features: [
      "Conversational chat UI",
      "Context-aware responses",
      "College knowledge base",
      "Server-side API key",
      "Easy-to-extend FAQs",
    ],
    github: "https://github.com/abhishekmanegit/sitcoe-faq-chatbot",
    accent: "#2f7d54",
    signature: true,
  },
  {
    id: "devcollab",
    index: "03",
    title: "DevCollab",
    category: "Full-Stack Product · JWT",
    oneLiner:
      "A full-stack developer collaboration platform where developers showcase projects, discover teammates, and discuss ideas in real time.",
    description:
      "A real product built to solve a genuine problem: while building projects, I often had backend knowledge but needed frontend developers to collaborate with, and finding teammates was hard. DevCollab is a modular full-stack platform (React + Spring Boot + PostgreSQL) for matching developers with complementary skills.",
    problem:
      "Finding developers with complementary skills to collaborate on projects is difficult. Developers need a focused place to showcase work, search for teammates, join projects, and discuss ideas.",
    built: [
      "React + Vite + Tailwind frontend driven by Axios calls to the REST API",
      "Spring Boot backend with Spring Security and JWT authentication & authorization",
      "PostgreSQL persistence across users, projects, and comments",
      "Developer profiles, project creation & search, and a real-time discussion/comment system",
      "Deployed live at devcollab-bice.vercel.app",
    ],
    approach:
      "The React frontend talks to a Spring Boot backend over REST APIs. Spring Security issues and validates JWTs so protected routes (creating projects, commenting) require an authenticated user. The comment system lets collaborators discuss projects in place rather than moving conversations off-platform.",
    decisions: [
      "JWT stateless auth — no server session, natural fit for a REST + SPA architecture",
      "React + Tailwind for fast, responsive UI; Spring Boot for a clean backend contract",
      "Comment/discussion threaded to projects — keeps collaboration context where it belongs",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Axios",
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "PostgreSQL",
      "JWT",
    ],
    features: [
      "JWT authentication & authorization",
      "Developer profiles",
      "Showcase projects",
      "Project search",
      "Join / collaborate",
      "Real-time discussion system",
      "Responsive UI",
    ],
    architecture: {
      label: "Architecture",
      nodes: [
        { name: "React Frontend", detail: "Vite · Tailwind · Axios" },
        { name: "REST API + JWT", detail: "secured routes" },
        { name: "Spring Boot Backend", detail: "Spring Security" },
        { name: "PostgreSQL", detail: "users · projects · comments" },
      ],
    },
    github: "https://github.com/abhishekmanegit/devcollab",
    live: "https://devcollab-bice.vercel.app",
    accent: "#1d6fa5",
    signature: true,
  },
]

export const secondaryProjects: Project[] = [
  {
    id: "square-tattoo-live",
    index: "04",
    title: "Square Tattoo Studio",
    category: "Shipped Web Product",
    oneLiner:
      "A polished, responsive studio website that presents a brand, its artists, and its work — built to production standards.",
    description:
      "A modern tattoo studio website designed to present the brand, artwork, and services through a clean, engaging interface. Built with a deliberate component architecture so it is easy to customize and extend for a real client.",
    problem:
      "A visual business like a tattoo studio needs a site that reflects its craft — fast, responsive, and clearly presenting work and services without feeling templated.",
    built: [
      "React + TypeScript + Vite frontend with a component-based structure",
      "Tailwind CSS and shadcn/ui for a clean, reusable, consistent UI",
      "Responsive layout across all screen sizes",
      "Production build configured for static hosting",
    ],
    approach:
      "The project treats the site as a real frontend product: reusable components organised under src/components and src/pages, a design system via Tailwind + shadcn/ui, and a fast Vite build ready for static deployment.",
    decisions: [
      "TypeScript for maintainability — the codebase scales without type drift",
      "Component architecture — pages are assembled from small, reusable pieces",
      "Static deploy — fast and cheap to host on Vercel / Netlify",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    features: [
      "Responsive design",
      "Modern, reusable components",
      "Clean, maintainable codebase",
      "Fast dev & build",
    ],
    github: "https://github.com/abhishekmanegit/square-tattoo-live",
    live: "https://www.squaretattoo.com/",
    accent: "#8c5a2b",
  },
  {
    id: "churn-prediction",
    index: "05",
    title: "Telecom Churn Prediction",
    category: "ML · SQL · Business Decisions",
    oneLiner:
      "An end-to-end pipeline that uses SQL feature engineering and ML models to predict churn — then turns predictions into a business recommendation.",
    description:
      "An end-to-end churn analysis: SQL for feature engineering, then Logistic Regression and Random Forest to predict which customers are likely to cancel. Beyond accuracy, a decision layer evaluates risk thresholds to estimate business value and recommend who to target.",
    problem:
      "A telecom provider loses customers it could have retained. The task wasn't just to train a model, but to produce a targeting recommendation a business can act on — working backwards from churn data to value.",
    built: [
      "SQL feature engineering on the IBM Telco Churn dataset (7,043 customers, 21 columns)",
      "Logistic Regression and Random Forest models with ROC-AUC, precision, and recall evaluation",
      "An ROI decision layer that tests risk thresholds and estimates net business value",
      "Charts for churn insights, feature importance, and value by threshold",
    ],
    approach:
      "SQL surfaces the first insight before any modeling: month-to-month customers churn ~15× more than two-year contract customers (42.7% vs 2.8%). Models then predict churn, and I evaluate them with an eye to the cost of errors — a false-negative (missed churner) costs more than a false-positive retention offer. The decision layer finds the threshold that maximizes net value.",
    decisions: [
      "Random Forest preferred for this use case — its higher recall is worth slightly lower precision given the cost of missing real churners",
      "Threshold analysis over a single tuned classifier — the best model depends on the business trade-off",
      "SQL-first feature engineering — the highest-signal insight (contract type) came from querying the data, not the model",
    ],
    stack: ["SQL", "Python", "Logistic Regression", "Random Forest", "scikit-learn", "Pandas"],
    features: [
      "SQL feature engineering",
      "ROC-AUC evaluation",
      "Precision / recall analysis",
      "Threshold analysis",
      "Estimated ROI / business value",
    ],
    github: "https://github.com/abhishekmanegit/churn-prediction",
    accent: "#5b6bbf",
  },
  {
    id: "open-source",
    index: "06",
    title: "Open Source & Contributions",
    category: "Contributions · Practice",
    oneLiner:
      "Ongoing engineering practice: GitHub contributions, pull requests, API integration, and problem-solving on LeetCode.",
    description:
      "Beyond standalone projects, I build in public. This covers feature implementation, bug fixes, API integration, and UI improvements across repositories I contribute to, alongside consistent algorithm practice.",
    problem:
      "Shipping good software means getting comfortable with other people's codebases, writing clean PRs, and staying sharp on fundamentals.",
    built: [
      "Active GitHub contributions — features, fixes, and API integrations",
      "LeetCode practice for data structures and algorithms in Java",
      "GirlScript Summer of Code 2026 — open-source contributor",
      "Google Gemini Student Ambassador 2026 — building and sharing with GenAI",
    ],
    approach:
      "I treat open source and systems practice as part of the same craft: reading existing systems, making small, reviewable changes, and connecting what I learn back to the products I build.",
    decisions: [
      "Contribute + practice in public — improves code quality and review discipline",
      "Contextualize contributions with the AI ecosystem (Gemini, Groq) I use in projects",
    ],
    stack: ["Git", "GitHub", "Java", "Python", "GenAI", "DSA"],
    features: [
      "GitHub contributions",
      "Pull requests",
      "Bug fixes & features",
      "LeetCode practice",
      "GSSoC 2026 contributor",
      "Gemini Student Ambassador",
    ],
    github: "https://github.com/abhishekmanegit",
    accent: "#6b6559",
  },
]

export const allProjects = [...featuredProjects, ...secondaryProjects]

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Java", "Python", "SQL"],
    note: "Where I write most of my systems and scripts.",
  },
  {
    label: "Backend",
    skills: ["Spring Boot", "Hibernate", "REST APIs"],
    note: "The core of how I build server-side software.",
  },
  {
    label: "Database",
    skills: ["PostgreSQL", "MySQL"],
    note: "Modeling and querying data that services rely on.",
  },
  {
    label: "Tools",
    skills: ["Docker", "Git", "GitHub"],
    note: "How I run, version, and share what I build.",
  },
  {
    label: "AI / ML",
    skills: ["Groq API", "Gemini API", "GenAI", "Machine Learning"],
    note: "Integrating and reasoning with LLMs and models.",
  },
  {
    label: "Core CS",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS"],
    note: "The fundamentals behind every project.",
  },
]

export const mindset = [
  {
    title: "Build before overthinking",
    body: "Most of my learning has come from shipping — the event-driven order system taught me more about SAGA and failure handling than any tutorial could, because I had to watch it break.",
  },
  {
    title: "Understand the system",
    body: "In the churn project, the most valuable insight (contract type predicts churn) came from querying the data in SQL before touching a model. Understanding what I'm working with comes first.",
  },
  {
    title: "Keep APIs clean",
    body: "From the chatbot's /api/chat endpoint to DevCollab's REST contract, I design APIs as stable seams — callers shouldn't care what's behind them.",
  },
  {
    title: "Design for failure",
    body: "The order system routes failed events to a dead-letter topic and guards against double-reservation. Systems that assume things always work are the ones that break.",
  },
  {
    title: "Use the right tool for the problem",
    body: "Kafka when services need to stay decoupled; SQL when the question is about data; a LOCAL decision layer when the goal is a business recommendation rather than just a metric.",
  },
  {
    title: "Learn by shipping",
    body: "Every project ended with something new deployed or documented — a live bot, a Vercel product, a study guide. I keep things public so the work has to hold up.",
  },
]

export const journey = [
  {
    period: "2020 — 2021",
    title: "SSC",
    detail: "Kabnur Highschool · 82.32%",
  },
  {
    period: "2021 — 2024",
    title: "Diploma, Computer Science & Engineering",
    detail: "Sharad Institute of Technology, Polytechnic · 85.63%",
  },
  {
    period: "2024 — 2027",
    title: "B.Tech, Computer Science & Engineering",
    detail: "Sharad Institute of Technology & College of Engineering · CGPA 7.63/10",
  },
  {
    period: "2026",
    title: "Google Gemini Student Ambassador",
    detail: "Building and sharing experience with GenAI.",
  },
  {
    period: "2026",
    title: "GirlScript Summer of Code — Contributor",
    detail: "Open-source contributions to real projects.",
  },
]

export const learningPath = [
  "Foundations",
  "Backend development",
  "REST APIs",
  "Full-stack applications",
  "Distributed systems",
  "GenAI",
  "ML & data-driven projects",
]

export const currentFocus = [
  "Distributed systems",
  "Backend architecture",
  "Spring Boot",
  "GenAI applications",
  "System design",
  "SQL & Python",
  "Building useful products",
]
