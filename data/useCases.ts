import type { PageContent } from "./site";

export const useCases: PageContent[] = [
  {
    slug: "agentic-voice-bot",
    title: "Agentic Voice Bot",
    navTitle: "Agentic Voice Bot",
    description: "AI voice agent for inbound and outbound calls, IVR replacement, lead qualification, scheduling, support, CRM updates, and analytics.",
    headline: "Resolve calls with a voice agent that understands intent and action",
    subheadline:
      "Replace rigid IVR trees with multilingual AI voice agents that qualify leads, schedule appointments, support customers, and update systems.",
    visual: "voice",
    accentColor: "#22d3ee",
    iconName: "PhoneCall",
    positioning: "For contact centers, sales teams, service operations, healthcare access teams, telecom providers, and appointment-driven businesses.",
    capabilities: ["Natural voice conversations", "Inbound and outbound calling", "Lead qualification", "Appointment scheduling", "CRM updates", "Call analytics"],
    benefits: ["Reduce queue pressure", "Increase call coverage", "Capture structured outcomes", "Escalate complex conversations with context"],
    workflows: ["Answer inbound support calls", "Verify identity", "Resolve or escalate", "Write call notes", "Trigger follow-up"],
    architecture: ["Telephony", "Speech-to-text", "LLM agent", "Tool calls", "CRM writeback", "Analytics"],
    integrations: ["Twilio", "Genesys", "Five9", "Salesforce", "HubSpot", "Calendly"],
    faq: [
      { question: "Can it hand off to humans?", answer: "Yes. Handoffs include transcript, intent, customer profile, and attempted resolution steps." },
      { question: "Does it support outbound calls?", answer: "Yes. Outbound campaigns can be configured for reminders, qualification, surveys, and follow-up." }
    ]
  },
  {
    slug: "agentic-chat-bot",
    title: "Agentic Chat Bot",
    navTitle: "Agentic Chat Bot",
    description: "AI chat agent for websites, apps, WhatsApp, Slack, Teams, and customer portals with knowledge answers, tickets, lead capture, and escalation.",
    headline: "Turn every chat surface into an intelligent service channel",
    subheadline:
      "Deploy AI chat agents that answer from approved knowledge, create tickets, capture leads, personalize responses, and escalate when needed.",
    visual: "chat",
    accentColor: "#34d399",
    iconName: "MessageSquare",
    positioning: "For customer support, sales, internal help desks, employee portals, and product-led onboarding.",
    capabilities: ["Website and app chat", "WhatsApp, Slack, and Teams channels", "Knowledge base answers", "Ticket creation", "Lead capture", "Personalization"],
    benefits: ["Improve first response time", "Deflect repetitive tickets", "Increase lead conversion", "Maintain consistent answers"],
    workflows: ["Identify visitor intent", "Retrieve grounded answer", "Capture lead fields", "Open ticket if unresolved", "Sync conversation history"],
    architecture: ["Channel adapter", "Retrieval layer", "Agent runtime", "Escalation router", "CRM and help desk sync"],
    integrations: ["Intercom", "Zendesk", "Freshdesk", "WhatsApp", "Slack", "Teams", "Salesforce"],
    faq: [
      { question: "Can answers cite sources?", answer: "Yes. The agent can cite articles, documents, policies, and product documentation used to answer." },
      { question: "Can it personalize responses?", answer: "Yes. Personalization can use approved profile, account, product, and conversation context." }
    ]
  },
  {
    slug: "agent-video-bot",
    title: "Agent Video Bot",
    navTitle: "Agent Video Bot",
    description: "AI video avatar agent for demos, onboarding, support, training, and interactive video communication.",
    headline: "Create interactive video agents for demos, onboarding, and training",
    subheadline:
      "Use holographic video avatars to guide users through products, explain processes, answer questions, and personalize learning experiences.",
    visual: "video",
    accentColor: "#a78bfa",
    iconName: "Video",
    positioning: "For customer onboarding, sales demos, employee training, product education, and support experiences.",
    capabilities: ["Interactive video avatar", "Personalized demos", "Training guidance", "Support walkthroughs", "Knowledge-grounded answers", "Engagement analytics"],
    benefits: ["Scale expert communication", "Improve onboarding completion", "Reduce repetitive training", "Make complex workflows easier to understand"],
    workflows: ["Start guided demo", "Ask clarifying question", "Show relevant step", "Capture completion", "Route unresolved questions"],
    architecture: ["Avatar layer", "Knowledge retrieval", "Conversation agent", "Media renderer", "Analytics"],
    integrations: ["LMS platforms", "Product tours", "CRM", "Help centers", "Web apps"],
    faq: [
      { question: "Can the avatar use our brand voice?", answer: "Yes. Scripts, tone, terminology, and escalation rules can be configured to match brand and compliance standards." },
      { question: "Can users ask live questions?", answer: "Yes. The video agent can answer questions during the experience and adapt the journey." }
    ]
  },
  {
    slug: "agent-email-bot",
    title: "Agent Email Bot",
    navTitle: "Agent Email Bot",
    description: "AI email agent for inbox triage, automated replies, follow-ups, lead nurturing, customer support, and internal workflow automation.",
    headline: "Automate high-volume email without losing context or control",
    subheadline:
      "Classify inboxes, draft replies, trigger follow-ups, nurture leads, resolve support requests, and route internal tasks with governed email agents.",
    visual: "email",
    accentColor: "#f97316",
    iconName: "Mail",
    positioning: "For sales, support, recruiting, finance, operations, and shared service inboxes.",
    capabilities: ["Inbox triage", "Automated reply drafting", "Follow-up sequencing", "Lead nurturing", "Support routing", "Internal workflow triggers"],
    benefits: ["Reduce inbox backlog", "Improve reply consistency", "Protect sensitive decisions with approval", "Increase follow-through"],
    workflows: ["Read inbound email", "Classify intent", "Draft response", "Request approval when needed", "Update system of record"],
    architecture: ["Mailbox connector", "Classifier", "Knowledge retrieval", "Approval workflow", "CRM or ticket sync"],
    integrations: ["Gmail", "Outlook", "Salesforce", "HubSpot", "Zendesk", "ServiceNow"],
    faq: [
      { question: "Can replies require approval?", answer: "Yes. Rules can require human approval based on customer type, risk, topic, value, or confidence." },
      { question: "Can it manage shared inboxes?", answer: "Yes. Shared inbox workflows can include assignment, routing, draft creation, and reporting." }
    ]
  },
  {
    slug: "agentic-operating-system",
    title: "Agentic Operating System",
    navTitle: "Agentic Operating System",
    description: "Central AI operating layer connecting agents, tools, workflows, data, approvals, memory, analytics, and governance.",
    headline: "Coordinate every AI agent through one operating layer",
    subheadline:
      "Connect agents, tools, memory, approvals, analytics, and governance so AI work becomes observable, repeatable, and enterprise-ready.",
    visual: "os",
    accentColor: "#8b5cf6",
    iconName: "Network",
    positioning: "For enterprises that need multiple agents working across departments, systems, permissions, and approval boundaries.",
    capabilities: ["Agent registry", "Tool permissions", "Workflow orchestration", "Shared memory", "Approval queues", "Governance analytics"],
    benefits: ["Prevent fragmented AI pilots", "Create reusable operating patterns", "Improve visibility and accountability", "Scale agent collaboration"],
    workflows: ["Receive request", "Select agent", "Call approved tools", "Route approval", "Update memory", "Report outcome"],
    architecture: ["Agent control plane", "Policy engine", "Tool registry", "Memory fabric", "Observability layer"],
    integrations: ["Identity providers", "Data warehouses", "SaaS apps", "Model providers", "Approval systems"],
    faq: [
      { question: "Is this different from a chatbot?", answer: "Yes. It is the coordination layer for many agents, workflows, tools, policies, and operating metrics." },
      { question: "Can agents collaborate?", answer: "Yes. Agents can hand off tasks, share approved memory, and coordinate through workflow policies." }
    ]
  },
  {
    slug: "agentic-coder",
    title: "Agentic Coder",
    navTitle: "Agentic Coder",
    description: "AI software engineering agent for code generation, debugging, test writing, documentation, code review, and deployment support.",
    headline: "Accelerate engineering with governed AI coding agents",
    subheadline:
      "Help teams generate code, debug issues, write tests, document systems, review changes, and support deployments with enterprise controls.",
    visual: "coder",
    accentColor: "#10b981",
    iconName: "TerminalSquare",
    positioning: "For software teams that want AI coding leverage while preserving review, security, quality, and deployment discipline.",
    capabilities: ["Code generation", "Debugging support", "Test writing", "Documentation", "Code review", "Deployment assistance"],
    benefits: ["Increase engineering throughput", "Improve test coverage", "Reduce repetitive maintenance", "Keep changes reviewable"],
    workflows: ["Read issue", "Inspect codebase", "Propose patch", "Run checks", "Open review", "Document result"],
    architecture: ["Repository connector", "Code intelligence", "Sandbox execution", "Policy checks", "CI integration"],
    integrations: ["GitHub", "GitLab", "Bitbucket", "Jira", "Linear", "CI/CD systems"],
    faq: [
      { question: "Can it follow repository conventions?", answer: "Yes. Agents inspect local patterns and can be constrained by coding standards and review policies." },
      { question: "Does it replace code review?", answer: "No. It accelerates implementation and review preparation while keeping human review in the loop." }
    ]
  },
  {
    slug: "agentic-commerce",
    title: "Agentic Commerce",
    navTitle: "Agentic Commerce",
    description: "AI commerce agent for product discovery, recommendations, cart recovery, support, order tracking, upselling, and personalized shopping.",
    headline: "Personalize commerce journeys with AI agents that can sell and serve",
    subheadline:
      "Guide shoppers from discovery to purchase with recommendations, cart recovery, order tracking, support, and personalized upsell workflows.",
    visual: "commerce",
    accentColor: "#e00083",
    iconName: "ShoppingCart",
    positioning: "For retailers, marketplaces, subscription brands, B2B commerce teams, and digital sales organizations.",
    capabilities: ["Product discovery", "Recommendations", "Cart recovery", "Customer support", "Order tracking", "Upsell and cross-sell"],
    benefits: ["Increase conversion", "Recover abandoned carts", "Reduce commerce support load", "Personalize at scale"],
    workflows: ["Understand shopper need", "Recommend products", "Answer questions", "Recover cart", "Track order", "Suggest next purchase"],
    architecture: ["Catalog connector", "Recommendation engine", "Conversation agent", "Order system", "Marketing automation"],
    integrations: ["Shopify", "Magento", "Commerce Cloud", "Klaviyo", "Stripe", "Zendesk"],
    faq: [
      { question: "Can recommendations use catalog rules?", answer: "Yes. Recommendations can respect stock, margin, geography, eligibility, and merchandising rules." },
      { question: "Can it support post-purchase journeys?", answer: "Yes. Agents can handle order status, returns, support, replenishment, and loyalty journeys." }
    ]
  }
];
