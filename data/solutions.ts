import type { PageContent } from "./site";

export const solutions: PageContent[] = [
  {
    slug: "telecommunication",
    title: "Telecommunication",
    navTitle: "Telecommunication",
    description: "AI transformation for telecom network operations, customer support automation, churn prediction, field service, and contact center AI.",
    headline: "Modernize telecom operations with AI agents built for scale",
    subheadline:
      "Automate network tickets, contact center journeys, churn interventions, and field service workflows across high-volume telecom environments.",
    visual: "telecom",
    accentColor: "#22d3ee",
    iconName: "RadioTower",
    problem:
      "Telecom teams operate under constant pressure from network incidents, complex service journeys, margin compression, and rising customer expectations.",
    positioning:
      "Our telecom AI architecture connects network telemetry, service systems, customer data, and agentic workflows so operators can respond faster with better context.",
    capabilities: [
      "Network operations copilots for incident summarization and root-cause recommendations",
      "AI contact center agents for billing, plan changes, troubleshooting, and retention",
      "Churn prediction workflows that trigger personalized save actions",
      "Field service automation for dispatch, job notes, parts, and customer updates",
      "Intelligent ticketing that classifies, enriches, routes, and resolves repetitive cases"
    ],
    modules: ["Network event layer", "Customer 360", "Ticket automation", "Voice and chat agents", "Field service assistant"],
    benefits: [
      "Reduce mean time to resolution for network and customer incidents",
      "Improve first-contact resolution across digital and voice channels",
      "Give operations leaders live visibility into automation outcomes"
    ],
    workflows: [
      "Summarize an outage, correlate impacted accounts, draft customer updates, and open field tasks",
      "Detect churn risk, launch a retention journey, and log save offers in CRM",
      "Classify support tickets and resolve repeat questions using approved knowledge"
    ],
    architecture: ["Telemetry ingestion", "Event correlation", "Agent orchestration", "Human escalation", "Audit and reporting"],
    outcomes: ["Lower support cost", "Faster incident response", "Higher retention", "Improved NPS"],
    faq: [
      { question: "Can agents connect to OSS and BSS systems?", answer: "Yes. Telecom deployments typically connect ticketing, billing, CRM, network telemetry, and field service platforms." },
      { question: "How are customer-impacting actions controlled?", answer: "Policy rules, approvals, escalation thresholds, and audit trails govern actions such as credits, plan changes, and dispatch." }
    ]
  },
  {
    slug: "large-enterprise",
    title: "Large Enterprise",
    navTitle: "Large Enterprise",
    description: "Secure enterprise AI adoption for internal copilots, data governance, workflow automation, compliance, and cross-department agentic systems.",
    headline: "Adopt AI across the enterprise without fragmenting control",
    subheadline:
      "Create secure copilots, governed workflows, and cross-department agentic systems that respect data boundaries and compliance requirements.",
    visual: "enterprise",
    accentColor: "#8b5cf6",
    iconName: "Building2",
    problem:
      "Large organizations need AI adoption that can move quickly while satisfying legal, security, procurement, architecture, and operational controls.",
    positioning:
      "We provide a governed AI platform that lets departments build useful agents while enterprise teams manage data, models, risk, and observability.",
    capabilities: [
      "Internal copilots for HR, finance, legal, IT, sales, operations, and engineering",
      "Enterprise search over permissioned knowledge sources with source citations",
      "Workflow automation with approvals, exception handling, and policy enforcement",
      "Compliance-ready audit trails for prompts, outputs, tool calls, and data access",
      "Cross-department agent orchestration for complex operating processes"
    ],
    modules: ["Enterprise search", "Copilot framework", "Governance center", "Workflow studio", "Risk dashboard"],
    benefits: [
      "Scale AI adoption with repeatable architecture and governance",
      "Reduce shadow AI by giving teams approved tools that work",
      "Align technical buyers and business sponsors around measurable outcomes"
    ],
    workflows: [
      "Create a legal copilot that answers from approved contracts and routes exceptions",
      "Automate IT service requests from chat intake through fulfillment and closure",
      "Summarize executive dashboards and recommend department-specific actions"
    ],
    architecture: ["Identity-aware retrieval", "Private model routing", "Agent registry", "Policy guardrails", "Central observability"],
    outcomes: ["Higher productivity", "Lower operating friction", "Reduced AI risk", "Faster knowledge access"],
    faq: [
      { question: "Can departments have separate controls?", answer: "Yes. Access, connectors, prompts, approval rules, and reporting can be scoped by department, region, or business unit." },
      { question: "Does it support regulated workflows?", answer: "Yes. Regulated workflows can include data redaction, human approval, evidence capture, and detailed audit logs." }
    ]
  },
  {
    slug: "small-medium-business",
    title: "Small Medium Business",
    navTitle: "Small Medium Business",
    description: "Affordable automation for SMB sales support, customer service bots, marketing automation, operations management, and AI productivity.",
    headline: "Give lean teams the AI leverage of a much larger company",
    subheadline:
      "Automate customer service, sales follow-up, marketing operations, and back-office work with practical AI agents designed for smaller teams.",
    visual: "smb",
    accentColor: "#38bdf8",
    iconName: "Workflow",
    problem:
      "SMBs cannot afford slow implementations, heavy platforms, or AI programs that require dedicated engineering teams before business value appears.",
    positioning:
      "Our SMB solution packages high-impact automations with simple configuration, clear pricing, and integrations with the tools growing companies already use.",
    capabilities: [
      "Customer service bots for web, chat, email, and messaging channels",
      "Sales assistants for lead capture, qualification, follow-up, and CRM updates",
      "Marketing automation for campaign drafts, segmentation, and performance summaries",
      "Operations assistants for scheduling, intake, reporting, and task routing",
      "Productivity copilots for research, document generation, and meeting follow-through"
    ],
    modules: ["Customer assistant", "Sales automation", "Marketing copilot", "Operations queue", "Knowledge setup"],
    benefits: [
      "Automate repetitive work without hiring specialist AI teams",
      "Improve response times across customer and sales channels",
      "Keep setup manageable while leaving room to scale"
    ],
    workflows: [
      "Capture a website lead, qualify intent, schedule a meeting, and update the CRM",
      "Answer common support questions and escalate only complex cases",
      "Generate weekly sales and support summaries with recommended follow-ups"
    ],
    architecture: ["Managed AI workspace", "Prebuilt connectors", "Knowledge base", "Human handoff", "Analytics"],
    outcomes: ["More pipeline coverage", "Faster customer replies", "Lower admin load", "Better team focus"],
    faq: [
      { question: "Do we need an AI team?", answer: "No. SMB packages are designed for practical deployment with guided setup and lightweight administration." },
      { question: "Can it grow with us?", answer: "Yes. Teams can start with packaged automation and expand into platform, infrastructure, or custom agent workflows later." }
    ]
  },
  {
    slug: "government",
    title: "Government",
    navTitle: "Government",
    description: "Secure civic AI for citizen services, document automation, policy support, multilingual assistants, compliance, and data privacy.",
    headline: "Deliver responsive public services with secure civic AI",
    subheadline:
      "Support citizens, automate document-heavy services, assist policy teams, and modernize public workflows with privacy-first AI systems.",
    visual: "government",
    accentColor: "#60a5fa",
    iconName: "Landmark",
    problem:
      "Government agencies face growing service demand, complex regulations, multilingual communities, legacy systems, and strict privacy obligations.",
    positioning:
      "Our government AI solution helps agencies improve service delivery while preserving transparency, security, accessibility, and human oversight.",
    capabilities: [
      "Citizen service assistants for benefits, licensing, appointments, and case status",
      "Document automation for forms, applications, permits, and policy records",
      "Policy support copilots that summarize evidence and draft briefing materials",
      "Multilingual assistants for inclusive digital services",
      "Privacy controls, audit trails, and approval workflows for sensitive actions"
    ],
    modules: ["Citizen portal AI", "Document intelligence", "Policy copilot", "Translation layer", "Compliance console"],
    benefits: [
      "Reduce service backlogs while keeping humans in control",
      "Improve accessibility and multilingual service coverage",
      "Modernize workflows without compromising privacy requirements"
    ],
    workflows: [
      "Guide a resident through eligibility questions and prepare a case packet",
      "Extract form data, validate missing fields, and route applications for review",
      "Summarize policy submissions and identify themes for analysts"
    ],
    architecture: ["Secure data boundary", "Identity controls", "Case management connectors", "Human review", "Audit logging"],
    outcomes: ["Shorter wait times", "Higher service accessibility", "Lower manual processing", "Stronger transparency"],
    faq: [
      { question: "Can deployments meet public-sector security standards?", answer: "Deployments can be designed for agency-specific security, privacy, retention, and audit requirements." },
      { question: "Can citizens use it across languages?", answer: "Yes. Multilingual assistants can support service discovery, form guidance, and status updates across priority languages." }
    ]
  }
];
