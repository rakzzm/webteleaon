import type { PageContent } from "./site";

export const resourcePages: PageContent[] = [
  {
    slug: "blog",
    title: "Blog",
    navTitle: "Blog",
    description: "Technical articles and product updates for enterprise AI agent builders.",
    headline: "Field notes for teams building production AI agents",
    subheadline:
      "Read practical guidance on agent design, realtime infrastructure, model orchestration, workflow automation, and enterprise governance.",
    visual: "library",
    accentColor: "#38bdf8",
    iconName: "FileText",
    positioning:
      "The Teleaon AI blog gives builders and executives a clear view into what it takes to move AI agents from prototype to reliable production systems.",
    capabilities: [
      "Architecture breakdowns for voice, chat, email, video, and workflow agents",
      "Product updates covering platform releases, deployment patterns, and new integrations",
      "Operational playbooks for evaluation, observability, escalation, and continuous improvement",
      "Security and governance articles written for technical buyers and AI program leaders"
    ],
    benefits: [
      "Stay current on agentic AI implementation patterns",
      "Give stakeholders practical language for AI architecture decisions",
      "Learn from deployment lessons before your own rollout"
    ],
    workflows: [
      "Use blog playbooks to scope a pilot and define deployment requirements",
      "Share architecture explainers with security, data, and business sponsors",
      "Track release updates that unlock new enterprise use cases"
    ],
    faq: [
      { question: "Who is the blog written for?", answer: "AI leaders, platform engineers, solution architects, operations teams, and product owners building agentic systems." },
      { question: "Does the blog include technical depth?", answer: "Yes. Articles include deployment patterns, architecture tradeoffs, security guidance, and operational examples." }
    ]
  },
  {
    slug: "documentation",
    title: "Documentation",
    navTitle: "Documentation",
    description: "Product documentation for Teleaon AI agents, infrastructure, integrations, observability, and governance.",
    headline: "Build with clear documentation from prototype to production",
    subheadline:
      "Explore implementation guides, API patterns, deployment references, integration notes, and operating controls for enterprise AI systems.",
    visual: "coder",
    accentColor: "#10b981",
    iconName: "TerminalSquare",
    positioning:
      "Documentation is organized around the full agent lifecycle: connect channels, configure models, attach tools, deploy services, monitor sessions, and govern actions.",
    capabilities: [
      "Quickstarts for voice agents, chat agents, email automation, and workflow orchestration",
      "Reference guides for model routing, memory, tool permissions, and guardrails",
      "Deployment documentation for private cloud, hybrid, and managed platform environments",
      "Integration guides for CRM, ticketing, data, identity, collaboration, and telephony systems"
    ],
    benefits: [
      "Reduce implementation ambiguity for engineering teams",
      "Standardize agent builds across departments and partners",
      "Document governance controls before production release"
    ],
    workflows: [
      "Start with a quickstart, connect approved tools, run an evaluation, and publish to a channel",
      "Use deployment references to align security, networking, and observability requirements",
      "Follow integration guides to connect agents to systems of record"
    ],
    faq: [
      { question: "Can documentation support enterprise deployments?", answer: "Yes. It includes security, identity, observability, and environment guidance for production rollouts." },
      { question: "Is there sample code?", answer: "The documentation is structured to include code-first examples and replaceable configuration patterns." }
    ]
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    navTitle: "Case Studies",
    description: "Enterprise AI case studies covering support automation, telecom operations, internal copilots, and AI infrastructure.",
    headline: "See how organizations turn AI agents into measurable outcomes",
    subheadline:
      "Explore deployment stories across customer operations, network support, knowledge automation, engineering productivity, and commerce.",
    visual: "enterprise",
    accentColor: "#f59e0b",
    iconName: "Building2",
    positioning:
      "Case studies translate platform capabilities into real operating value: faster resolution, lower manual effort, better customer experiences, and stronger governance.",
    capabilities: [
      "Before-and-after operating metrics for agent deployments",
      "Architecture diagrams showing channels, tools, models, data, and governance controls",
      "Rollout lessons for pilots, production launches, and cross-functional expansion",
      "Executive summaries for budget owners, technical evaluators, and risk teams"
    ],
    benefits: [
      "Understand realistic deployment timelines and value drivers",
      "Benchmark your own use cases against proven patterns",
      "Align leadership around measurable AI outcomes"
    ],
    workflows: [
      "Review a relevant case study before scoping a pilot",
      "Map your current workflows to a proven deployment pattern",
      "Use outcome metrics to define your business case"
    ],
    faq: [
      { question: "Are case studies industry-specific?", answer: "Yes. They cover patterns across telecom, enterprise services, SMB operations, government, and commerce." },
      { question: "Do they include technical architecture?", answer: "Yes. Each case study includes a deployment model and the operational controls behind the outcome." }
    ]
  },
  {
    slug: "whitepapers",
    title: "Whitepapers",
    navTitle: "Whitepapers",
    description: "Deep research and architecture papers for secure, governed, enterprise-grade AI systems.",
    headline: "Deep technical papers for secure enterprise AI adoption",
    subheadline:
      "Download research-backed guidance for RAG, realtime AI, agent orchestration, infrastructure, observability, compliance, and governance.",
    visual: "genai",
    accentColor: "#e00083",
    iconName: "FileText",
    positioning:
      "Whitepapers give technical leaders a deeper foundation for AI platform decisions, from architecture principles to governance controls and deployment models.",
    capabilities: [
      "Secure RAG and enterprise search design patterns",
      "Agent orchestration and tool permission frameworks",
      "Inference infrastructure, model hosting, and observability architecture",
      "Risk, compliance, auditability, and human approval operating models"
    ],
    benefits: [
      "Make better architecture decisions before committing budget",
      "Support internal review with credible technical material",
      "Reduce risk during production AI rollout"
    ],
    workflows: [
      "Share a whitepaper with architecture review boards before platform selection",
      "Use security papers to prepare governance workshops",
      "Translate technical recommendations into deployment requirements"
    ],
    faq: [
      { question: "Are whitepapers vendor-neutral?", answer: "They are written around practical architecture patterns, with clear notes on where Teleaon AI capabilities fit." },
      { question: "Can they support procurement?", answer: "Yes. They help technical and governance stakeholders evaluate requirements before purchase." }
    ]
  },
  {
    slug: "webinars",
    title: "Webinars",
    navTitle: "Webinars",
    description: "Live and on-demand webinars for AI agent architecture, platform launches, governance, and industry transformation.",
    headline: "Learn from live technical sessions and deployment workshops",
    subheadline:
      "Join practical sessions on voice AI, agentic workflows, secure infrastructure, enterprise governance, and production operating models.",
    visual: "video",
    accentColor: "#a78bfa",
    iconName: "Video",
    positioning:
      "Webinars give teams a direct way to learn deployment patterns, ask architecture questions, and align business and technical stakeholders.",
    capabilities: [
      "Live architecture sessions with AI platform specialists",
      "Product walkthroughs for agent builder, infrastructure, observability, and governance",
      "Industry workshops for telecom, enterprise, SMB, government, and commerce",
      "On-demand recordings for internal enablement and implementation planning"
    ],
    benefits: [
      "Educate cross-functional teams quickly",
      "Ask deployment questions before committing engineering time",
      "Turn abstract AI strategy into concrete implementation steps"
    ],
    workflows: [
      "Register for a live session, submit questions, and review the recording with your team",
      "Use workshops to compare architecture choices",
      "Invite security and business stakeholders to a shared briefing"
    ],
    faq: [
      { question: "Are webinars technical or executive?", answer: "Both. Some sessions are architecture-heavy, while others focus on strategy, operating models, and business outcomes." },
      { question: "Can we request a private workshop?", answer: "Yes. Enterprise teams can request a private technical briefing through Contact Sales." }
    ]
  }
];

export const resourceCards = resourcePages.map((page) => ({
  title: page.navTitle,
  href: `/resources/${page.slug}`,
  description: page.description,
  iconName: page.iconName
}));
