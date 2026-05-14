import type { PageContent } from "./site";

export const companyPages: PageContent[] = [
  {
    slug: "about",
    title: "About Teleaon AI",
    navTitle: "About",
    description: "Learn about Teleaon AI's mission to help enterprises build secure, observable, production-grade AI agents.",
    headline: "We help enterprises turn AI agents into dependable infrastructure",
    subheadline:
      "Teleaon AI brings together realtime AI, secure tool use, workflow automation, observability, and governance for organizations that need agents they can trust.",
    visual: "enterprise",
    accentColor: "#28c7e8",
    iconName: "Building2",
    positioning:
      "Our mission is to make agentic AI operationally dependable for organizations with complex systems, sensitive data, and high expectations for reliability.",
    capabilities: [
      "A product philosophy centered on production readiness, not demos",
      "A platform architecture that respects security, compliance, and business ownership",
      "A deployment model that supports both technical builders and business operators",
      "A customer success motion focused on measurable automation outcomes"
    ],
    benefits: [
      "Ship agentic AI with confidence across high-value workflows",
      "Give engineering, security, and business leaders a common operating model",
      "Reduce the distance between AI experiments and real business impact"
    ],
    workflows: [
      "Define operating outcomes, connect approved systems, deploy controlled agents, and measure results",
      "Scale from one department to many through reusable governance and integration patterns",
      "Continuously improve agents with evaluation, observability, and human feedback"
    ],
    faq: [
      { question: "What does Teleaon AI build?", answer: "Teleaon AI builds a developer platform and enterprise operating layer for realtime AI agents and workflow automation." },
      { question: "Who is Teleaon AI for?", answer: "It is for organizations that need AI agents connected to real systems with security, observability, and governance." }
    ]
  },
  {
    slug: "security",
    title: "Security",
    navTitle: "Security",
    description: "Security, privacy, compliance, and governance principles for Teleaon AI enterprise AI deployments.",
    headline: "Security controls for AI systems that take real action",
    subheadline:
      "Protect sensitive data, govern tool access, audit agent behavior, and enforce human approval where enterprise workflows require control.",
    visual: "government",
    accentColor: "#28c7e8",
    iconName: "ShieldCheck",
    positioning:
      "AI security is broader than model access. Teleaon AI secures the full path from identity and retrieval to tool calls, approvals, observability, and audit trails.",
    capabilities: [
      "Role-based access controls for agents, data sources, tools, environments, and reports",
      "Permission-aware retrieval with source attribution and data boundary enforcement",
      "Policy guardrails for redaction, approval, escalation, and restricted actions",
      "Audit logs for prompts, outputs, tool calls, human reviews, and configuration changes"
    ],
    benefits: [
      "Reduce risk when agents interact with business systems",
      "Give compliance teams evidence for AI operations",
      "Let teams innovate without bypassing security requirements"
    ],
    workflows: [
      "Define allowed tools and data access before an agent reaches production",
      "Route sensitive actions to human approval queues",
      "Review audit trails and quality metrics during governance meetings"
    ],
    faq: [
      { question: "Can Teleaon AI support regulated environments?", answer: "Yes. Deployments can include private networking, audit logging, data controls, approval workflows, and retention policies." },
      { question: "How are risky actions controlled?", answer: "Policies can require approval, redaction, escalation, or denial based on user, tool, data type, confidence, or workflow risk." }
    ]
  },
  {
    slug: "partners",
    title: "Partners",
    navTitle: "Partners",
    description: "Partner with Teleaon AI to deliver AI agent infrastructure, integrations, implementation services, and industry solutions.",
    headline: "Build the agentic AI ecosystem with us",
    subheadline:
      "Teleaon AI partners with systems integrators, cloud providers, model platforms, SaaS vendors, and consulting teams to deliver enterprise AI outcomes.",
    visual: "platform",
    accentColor: "#28c7e8",
    iconName: "Network",
    positioning:
      "Partners extend Teleaon AI into industry workflows, enterprise systems, and implementation programs where customers need trusted deployment support.",
    capabilities: [
      "Implementation partner programs for agent workflows and enterprise integrations",
      "Technology partnerships for models, data platforms, observability, and collaboration tools",
      "Industry solution packaging for telecom, government, commerce, SMB, and large enterprise",
      "Joint enablement for sales teams, solution architects, and customer success leaders"
    ],
    benefits: [
      "Deliver AI agent solutions with a production-ready platform foundation",
      "Create repeatable solution packages for target industries",
      "Expand customer value through integrations and managed implementation support"
    ],
    workflows: [
      "Design a partner solution around a specific industry or workflow",
      "Validate integrations, reference architecture, and go-to-market positioning",
      "Launch joint customer pilots with measurable deployment outcomes"
    ],
    faq: [
      { question: "Who can partner with Teleaon AI?", answer: "Systems integrators, SaaS vendors, cloud providers, model providers, consultancies, and managed service teams." },
      { question: "Do partners get technical enablement?", answer: "Yes. Partner programs can include architecture support, implementation playbooks, and joint solution planning." }
    ]
  },
  {
    slug: "careers",
    title: "Careers",
    navTitle: "Careers",
    description: "Join Teleaon AI to build the infrastructure layer for production AI agents.",
    headline: "Build the next operating layer for enterprise AI",
    subheadline:
      "We are looking for people who care about product craft, distributed systems, AI safety, developer experience, and real customer impact.",
    visual: "coder",
    accentColor: "#28c7e8",
    iconName: "TerminalSquare",
    positioning:
      "Teleaon AI is a builder-led company focused on high-quality systems, thoughtful design, and the practical work required to make AI useful in production.",
    capabilities: [
      "Engineering roles across realtime infrastructure, AI runtime, integrations, and product platform",
      "Design and product roles shaping developer workflows and enterprise operator experiences",
      "Customer-facing roles helping organizations deploy measurable AI automation",
      "Research and applied AI roles focused on evaluation, orchestration, and safety"
    ],
    benefits: [
      "Work on a category-defining infrastructure problem",
      "Build products used by technical teams and business operators",
      "Join a culture that values clarity, ownership, craft, and customer evidence"
    ],
    workflows: [
      "Explore open roles, share your background, and meet the team",
      "Discuss the kinds of AI systems you want to help build",
      "Join a product area where your work can reach production customers quickly"
    ],
    faq: [
      { question: "Are roles remote?", answer: "Teleaon AI supports distributed work for many roles, with team collaboration patterns based on function and customer needs." },
      { question: "What kind of people thrive here?", answer: "People who enjoy hard technical problems, precise communication, product taste, and practical customer outcomes." }
    ]
  }
];

export const companyCards = companyPages.map((page) => ({
  title: page.navTitle,
  href: `/company/${page.slug}`,
  description: page.description,
  iconName: page.iconName
}));
