import type { PageContent } from "./site";

const baseUseCases: PageContent[] = [
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

const productionDetails: Record<
  string,
  Pick<PageContent, "problem" | "modules" | "production" | "outcomes">
> = {
  "agentic-voice-bot": {
    problem:
      "Call teams are constrained by queue spikes, inconsistent note quality, disconnected telephony data, and IVR paths that cannot resolve real intent. Production voice agents need telephony reliability, live escalation, consent handling, and auditable system updates.",
    modules: ["Call intake and identity", "Realtime speech pipeline", "Resolution playbooks", "Human handoff", "CRM and ticket writeback", "QA analytics"],
    outcomes: ["Shorter average speed to answer", "Higher after-hours coverage", "More complete call notes", "Lower repeat-call volume"],
    production: {
      metrics: [
        { label: "Containment target", value: "35-55%", detail: "Resolution share for known intents after knowledge, policy, and escalation tuning." },
        { label: "Handoff context", value: "100%", detail: "Transcript, intent, sentiment, verified details, and attempted actions travel with the transfer." },
        { label: "Coverage model", value: "24/7", detail: "Always-on intake for support, appointment, collections, survey, and reminder workflows." }
      ],
      architecture: [
        { title: "Telephony ingress", description: "Connect SIP, IVR, call center, or programmable voice channels with routing and consent prompts." },
        { title: "Realtime conversation loop", description: "Low-latency speech recognition, agent reasoning, tool calls, and speech synthesis." },
        { title: "Action layer", description: "Book appointments, open tickets, verify status, update CRM fields, and trigger follow-up messages." },
        { title: "Supervisor controls", description: "Live transfer, transcript review, escalation policy, redaction, and quality scoring." }
      ],
      pipeline: ["Intent and risk mapping", "Knowledge and tool approval", "Pilot number rollout", "QA calibration", "Progressive traffic ramp"],
      controls: ["Call recording policy", "PII redaction", "Human transfer rules", "Outbound consent", "Audit logs", "Fallback prompts"]
    }
  },
  "agentic-chat-bot": {
    problem:
      "Most chatbots answer shallow FAQs but fail when users need account context, tickets, quotes, approvals, or source-backed explanations. Production chat agents need retrieval discipline, channel memory, and controlled tool access.",
    modules: ["Channel router", "Grounded knowledge answers", "Lead and ticket capture", "Account-aware personalization", "Escalation queue", "Conversation analytics"],
    outcomes: ["Faster first response", "Reduced repetitive tickets", "Higher qualified lead capture", "Consistent sourced answers"],
    production: {
      metrics: [
        { label: "First response", value: "<3 sec", detail: "Target response latency for web chat and messaging channels." },
        { label: "Source coverage", value: "100%", detail: "Answers can cite approved documentation, policy, or account data where required." },
        { label: "Channel reach", value: "7+", detail: "Website, portal, WhatsApp, Slack, Teams, mobile app, and support inbox surfaces." }
      ],
      architecture: [
        { title: "Channel adapters", description: "Normalize web, app, WhatsApp, Slack, Teams, and portal events into one agent runtime." },
        { title: "Retrieval layer", description: "Permission-aware retrieval across help centers, docs, policies, product data, and account context." },
        { title: "Action router", description: "Create tickets, qualify leads, update CRM, start workflows, and notify human owners." },
        { title: "Quality analytics", description: "Track deflection, answer confidence, citation gaps, escalations, and customer sentiment." }
      ],
      pipeline: ["Knowledge audit", "Channel selection", "Tool permission setup", "Conversation pilot", "Deflection and QA review"],
      controls: ["Source citation", "Confidence thresholds", "Human escalation", "Channel-specific policies", "Prompt versioning", "PII handling"]
    }
  },
  "agent-video-bot": {
    problem:
      "Video onboarding and training often depend on static recordings that cannot adapt to a user's role, question, product state, or completion status. Production video agents need interactive knowledge, analytics, and safe escalation.",
    modules: ["Avatar experience", "Guided demo flows", "Knowledge Q&A", "Training checkpoints", "Completion analytics", "Human follow-up"],
    outcomes: ["Higher onboarding completion", "Fewer repetitive walkthroughs", "More consistent product education", "Better learner intent data"],
    production: {
      metrics: [
        { label: "Session modes", value: "3", detail: "Guided demo, live question answering, and training assessment flows." },
        { label: "Completion tracking", value: "100%", detail: "Capture step progress, unresolved questions, drop-offs, and handoff reasons." },
        { label: "Reuse library", value: "1:N", detail: "One governed knowledge base can power many branded video experiences." }
      ],
      architecture: [
        { title: "Video avatar layer", description: "Render branded presenters, scripted segments, voice, and dynamic responses." },
        { title: "Journey orchestration", description: "Branch demos and training based on role, intent, product plan, or knowledge gaps." },
        { title: "Grounded answer runtime", description: "Answer live questions using approved documentation, scripts, and policy guidance." },
        { title: "Engagement telemetry", description: "Track viewed steps, questions, completions, sentiment, and follow-up triggers." }
      ],
      pipeline: ["Journey design", "Script and voice approval", "Knowledge binding", "Pilot embed", "Engagement optimization"],
      controls: ["Brand voice rules", "Script approval", "Answer citations", "Escalation capture", "Analytics retention", "Content versioning"]
    }
  },
  "agent-email-bot": {
    problem:
      "Shared inboxes bury urgent work, create uneven response quality, and make follow-through difficult to audit. Production email agents need classification, drafting, approvals, routing, and system-of-record updates.",
    modules: ["Inbox classifier", "Draft generation", "Approval routing", "Follow-up sequencing", "System updates", "SLA reporting"],
    outcomes: ["Lower backlog", "Faster approved replies", "Cleaner ownership", "Higher follow-through on commitments"],
    production: {
      metrics: [
        { label: "Triage coverage", value: "90%+", detail: "Target classification for common inbound requests after mailbox calibration." },
        { label: "Approval safety", value: "Rule-based", detail: "Sensitive topics, high-value accounts, and low-confidence drafts route to review." },
        { label: "SLA visibility", value: "Live", detail: "Track waiting, needs reply, blocked, escalated, and completed email states." }
      ],
      architecture: [
        { title: "Mailbox connector", description: "Read shared inboxes, labels, threads, attachments, and sender context." },
        { title: "Intent classifier", description: "Detect urgency, topic, owner, risk, sentiment, and required next action." },
        { title: "Draft and action layer", description: "Prepare replies, update CRM or tickets, schedule follow-ups, and create tasks." },
        { title: "Approval console", description: "Review drafts, compare sources, approve sends, and monitor SLA queues." }
      ],
      pipeline: ["Mailbox audit", "Intent taxonomy", "Approval rules", "Draft pilot", "SLA dashboard rollout"],
      controls: ["Send approval", "Sender permissions", "Attachment policy", "Sensitive-topic routing", "Audit trail", "Retention controls"]
    }
  },
  "agentic-operating-system": {
    problem:
      "Disconnected AI pilots multiply risk when every team chooses its own tools, prompts, approvals, and measurement. A production operating system standardizes agent identity, memory, permissions, observability, and governance.",
    modules: ["Agent registry", "Tool permissioning", "Workflow orchestration", "Shared memory", "Approval operations", "Governance reporting"],
    outcomes: ["Reusable deployment patterns", "Better cross-agent coordination", "Clear accountability", "Faster governance reviews"],
    production: {
      metrics: [
        { label: "Agent inventory", value: "One", detail: "A central registry for owners, versions, tools, policies, and deployment status." },
        { label: "Policy reuse", value: "Multi-team", detail: "Common approval, redaction, retention, and escalation rules apply across agents." },
        { label: "Observability", value: "End-to-end", detail: "Trace prompts, retrieved sources, tool calls, decisions, approvals, and outcomes." }
      ],
      architecture: [
        { title: "Control plane", description: "Manage agent lifecycle, environment promotion, ownership, versions, and operational status." },
        { title: "Policy engine", description: "Enforce tool permissions, approvals, data access, retention, and risk controls." },
        { title: "Memory fabric", description: "Store approved context, customer state, workflow state, and agent handoff records." },
        { title: "Telemetry layer", description: "Measure quality, cost, latency, escalation, completion, and compliance indicators." }
      ],
      pipeline: ["Agent inventory", "Policy baseline", "Tool registry", "Pilot orchestration", "Governance operating rhythm"],
      controls: ["RBAC", "Environment separation", "Approval queues", "Audit logs", "Cost guardrails", "Model routing policy"]
    }
  },
  "agentic-coder": {
    problem:
      "Engineering teams need AI leverage without unreviewed changes, inconsistent tests, or security blind spots. Production coding agents need repository context, sandboxed execution, CI evidence, and human review.",
    modules: ["Repository analysis", "Issue planning", "Patch generation", "Test execution", "Review preparation", "Release notes"],
    outcomes: ["Faster maintenance work", "Better test discipline", "More complete review context", "Lower repetitive engineering load"],
    production: {
      metrics: [
        { label: "Review-ready output", value: "PR-first", detail: "Changes are packaged with summary, tests run, risks, and files touched." },
        { label: "Sandboxing", value: "Isolated", detail: "Commands and code edits run in controlled workspaces with clear permissions." },
        { label: "Quality gates", value: "CI-linked", detail: "Lint, type, unit, integration, and security checks can gate completion." }
      ],
      architecture: [
        { title: "Repository connector", description: "Read issues, code, tests, docs, dependencies, and project conventions." },
        { title: "Planning runtime", description: "Break work into bounded patches, identify risks, and preserve existing user changes." },
        { title: "Execution sandbox", description: "Edit files, run tests, collect logs, and refine patches safely." },
        { title: "Review bridge", description: "Prepare PR summaries, explain tradeoffs, address comments, and track residual risk." }
      ],
      pipeline: ["Repo policy setup", "Task class selection", "Sandbox trial", "CI integration", "Review workflow rollout"],
      controls: ["Branch policy", "Secrets isolation", "Command allowlist", "Human approval", "Diff audit", "Dependency checks"]
    }
  },
  "agentic-commerce": {
    problem:
      "Commerce teams lose revenue when discovery, support, order status, and retention live in separate systems. Production commerce agents need catalog rules, customer context, payment safety, and merchandising controls.",
    modules: ["Catalog understanding", "Recommendation rules", "Cart recovery", "Order support", "Returns guidance", "Lifecycle campaigns"],
    outcomes: ["Higher conversion", "Recovered carts", "Lower order-status tickets", "More personalized repeat purchase journeys"],
    production: {
      metrics: [
        { label: "Catalog rules", value: "Real-time", detail: "Recommendations can respect inventory, eligibility, region, margin, and merchandising policy." },
        { label: "Journey coverage", value: "Pre + post", detail: "Product discovery, cart, checkout support, order tracking, returns, and loyalty." },
        { label: "Revenue signals", value: "Tracked", detail: "Attribute recovered carts, assisted conversions, upsells, support deflection, and repeat purchase." }
      ],
      architecture: [
        { title: "Catalog connector", description: "Read product, price, inventory, promotions, variants, and merchandising constraints." },
        { title: "Customer context", description: "Use approved profile, order, loyalty, and browsing signals to personalize safely." },
        { title: "Commerce action layer", description: "Recover carts, check order status, start returns, create support tickets, and trigger campaigns." },
        { title: "Revenue analytics", description: "Measure conversion, AOV, support deflection, cart recovery, and post-purchase engagement." }
      ],
      pipeline: ["Catalog and policy sync", "Journey mapping", "Promotion guardrails", "Pilot storefront", "Revenue attribution tuning"],
      controls: ["Merchandising rules", "Payment boundaries", "Inventory constraints", "Return policy citations", "Offer approval", "Customer data limits"]
    }
  }
};

export const useCases: PageContent[] = baseUseCases.map((useCase) => ({
  ...useCase,
  ...productionDetails[useCase.slug]
}));
