import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, Bot, BrainCircuit, CheckCircle2, CloudCog, Cpu, DatabaseZap, FileSearch, FileText, Gauge, GitBranch, LockKeyhole, MessageSquareText, MonitorDot, Network, PlugZap, ServerCog, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AIInfrastructureScrollHero } from "@/components/sections/AIInfrastructureScrollHero";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { GenAIFlowTrailHero } from "@/components/sections/GenAIFlowTrailHero";
import { ParticleTextEffect } from "@/components/sections/ParticleTextEffect";
import { SmokeBackground } from "@/components/sections/SmokeBackground";
import { Section, SectionHeading } from "@/components/ui/Section";
import { productCards } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCards.map((product) => ({ slug: product.href.split("/").pop() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productCards.find((item) => item.href.endsWith(`/${slug}`));

  if (!product) return {};

  if (slug === "ai-saas") {
    return {
      title: "AI SaaS | Enterprise AI Applications",
      description: "Teleaon AI SaaS delivers ready-to-use AI applications for workflow automation, customer engagement, analytics, knowledge automation, and business productivity."
    };
  }

  if (slug === "ai-infrastructure") {
    return {
      title: "AI Infrastructure | Secure Model Hosting and Deployment",
      description: "Teleaon AI Infrastructure provides GPU orchestration, model hosting, vector databases, observability, deployment pipelines, API gateway, compliance, and secure cloud architecture."
    };
  }

  if (slug === "ai-platform") {
    return {
      title: "AI Platform | Build, Manage, and Govern AI Agents",
      description: "Teleaon AI Platform gives teams an end-to-end control plane for agent builder, model orchestration, data connectors, memory, tools, guardrails, monitoring, workflow automation, and governance."
    };
  }

  if (slug === "gen-ai") {
    return {
      title: "Gen AI | Enterprise Generative AI, RAG, and Copilots",
      description: "Teleaon Gen AI delivers enterprise RAG, document intelligence, multimodal assistants, knowledge copilots, secure LLM deployment, and governed content automation."
    };
  }

  return {
    title: `${product.title} | Rebuild in Progress`,
    description: `${product.title} is being rebuilt with updated Teleaon AI product content.`
  };
}

export default async function ProductRebuildPage({ params }: Props) {
  const { slug } = await params;
  const product = productCards.find((item) => item.href.endsWith(`/${slug}`));

  if (!product) notFound();

  if (slug === "ai-saas") {
    return <AISaaSPage />;
  }

  if (slug === "ai-infrastructure") {
    return <AIInfrastructurePage />;
  }

  if (slug === "ai-platform") {
    return <AIPlatformPage />;
  }

  if (slug === "gen-ai") {
    return <GenAIPage />;
  }

  return (
    <main className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fa_100%)] text-slate-950">
      <Section className="min-h-[70vh]">
        <SectionHeading
          title={`${product.title} is being rebuilt`}
          description="The old product page has been removed. This route is intentionally lightweight while the new production-grade page is designed."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-white/75 p-8 text-center shadow-sm">
          <p className="text-sm leading-7 text-slate-600">{product.description}</p>
          <Link href="/products" className="mt-6 inline-flex rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-ink transition hover:bg-slate-950 hover:text-white">
            Back to Products
          </Link>
        </div>
      </Section>
    </main>
  );
}

const capabilities = [
  {
    title: "Workflow automation agents",
    description: "Automate repetitive business processes across CRM, ticketing, email, calendars, knowledge bases, spreadsheets, and internal systems.",
    icon: Workflow
  },
  {
    title: "Customer engagement copilots",
    description: "Deploy AI assistants for sales, support, onboarding, account management, lead qualification, appointment booking, and retention.",
    icon: MessageSquareText
  },
  {
    title: "Knowledge automation",
    description: "Turn policies, product docs, PDFs, meeting notes, tickets, and internal wikis into governed answers and task-ready recommendations.",
    icon: FileSearch
  },
  {
    title: "AI analytics and insights",
    description: "Summarize customer conversations, detect intent, score opportunities, surface operational bottlenecks, and produce executive-ready insights.",
    icon: BarChart3
  },
  {
    title: "Business productivity apps",
    description: "Help teams draft emails, update records, prepare reports, create follow-ups, reconcile requests, and complete admin work faster.",
    icon: Sparkles
  },
  {
    title: "Governed agent actions",
    description: "Define approvals, guardrails, audit trails, role-based access, escalation logic, and human handoff for sensitive actions.",
    icon: ShieldCheck
  }
];

const modules = [
  ["Agent Workspace", "Role-specific AI workspaces for sales, support, operations, finance, HR, and leadership teams."],
  ["Conversation Hub", "Unified inbox for voice, chat, email, web forms, WhatsApp, Slack, Teams, and customer portals."],
  ["Knowledge Studio", "Upload, structure, sync, and govern company knowledge with citations, freshness controls, and source visibility."],
  ["Workflow Builder", "No-code and code-assisted workflows for approvals, CRM updates, ticket creation, enrichment, and reporting."],
  ["Analytics Console", "Intent trends, sentiment, deflection, conversion, SLA, agent activity, and productivity outcome reporting."],
  ["Governance Center", "Policies, access controls, PII handling, escalation rules, audit logs, and model usage visibility."]
];

const workflows = [
  {
    title: "Lead qualification and booking",
    steps: ["Capture enquiry", "Qualify fit", "Score urgency", "Book meeting", "Update CRM", "Notify sales owner"]
  },
  {
    title: "Customer support resolution",
    steps: ["Detect issue", "Search knowledge", "Answer customer", "Create ticket", "Escalate exception", "Summarize outcome"]
  },
  {
    title: "Internal knowledge assistant",
    steps: ["Receive employee request", "Verify permissions", "Retrieve sources", "Draft answer", "Suggest next action", "Log usage"]
  },
  {
    title: "Operations follow-through",
    steps: ["Read incoming email", "Classify task", "Extract fields", "Trigger workflow", "Request approval", "Close loop"]
  }
];

const integrations = ["Salesforce", "HubSpot", "Zendesk", "ServiceNow", "Microsoft 365", "Google Workspace", "Slack", "Teams", "WhatsApp", "Twilio", "Snowflake", "Databricks", "Postgres", "SharePoint", "Notion", "Custom APIs"];

const securityItems = [
  "Role-based access controls for business users, admins, and reviewers",
  "Human approval gates for sensitive workflow actions",
  "Audit logs for conversations, agent decisions, tool calls, and data access",
  "PII-aware prompts, redaction patterns, and configurable retention policies",
  "Knowledge source permissions and citation-backed responses",
  "Environment separation for sandbox, pilot, and production deployments"
];

const outcomes = [
  ["35-60%", "fewer repetitive service tasks"],
  ["2-4 weeks", "to launch first department app"],
  ["24/7", "customer and employee assistance"],
  ["100%", "logged agent actions and handoffs"]
];

const faqs = [
  {
    question: "What makes Teleaon AI SaaS different from a normal chatbot?",
    answer: "Teleaon AI SaaS is built as a suite of business applications, not a single chat widget. It can connect to tools, follow workflows, update systems, request approvals, cite company knowledge, and hand off complex cases with context."
  },
  {
    question: "Can business teams use it without developers?",
    answer: "Yes. Teams can use prebuilt workspaces, templates, knowledge tools, and workflow patterns. Developers and platform teams can still extend integrations, controls, and custom business logic where needed."
  },
  {
    question: "How does it protect enterprise data?",
    answer: "The product supports role-based access, source permissions, audit trails, approval gates, PII handling, and configurable data retention. AI actions are designed to be reviewable and governed."
  },
  {
    question: "Which departments can use AI SaaS first?",
    answer: "Common starting points include customer support, sales development, revenue operations, internal IT, HR service desks, finance operations, and knowledge-heavy account teams."
  },
  {
    question: "Does it integrate with our existing systems?",
    answer: "Yes. Teleaon AI SaaS is designed to connect with CRM, helpdesk, email, calendars, collaboration apps, data warehouses, knowledge bases, and custom APIs."
  },
  {
    question: "Can we start with one use case and expand later?",
    answer: "Yes. Most teams start with a focused workflow, prove measurable value, then expand to more teams, channels, automations, and governance requirements."
  }
];

const infrastructureCapabilities = [
  {
    title: "GPU orchestration",
    description: "Schedule model workloads across GPU pools with workload isolation, autoscaling, utilization tracking, queue controls, and environment-aware deployment policies.",
    icon: Cpu
  },
  {
    title: "Model hosting and serving",
    description: "Host open-source, commercial, fine-tuned, and private models behind secure endpoints with versioning, canary rollout, rollback, routing, and cost controls.",
    icon: ServerCog
  },
  {
    title: "Vector databases and memory",
    description: "Operate vector search, embeddings, long-term agent memory, retrieval indexes, freshness jobs, and source-aware knowledge pipelines for RAG and agent systems.",
    icon: DatabaseZap
  },
  {
    title: "Deployment pipelines",
    description: "Move models, prompts, tools, policies, and agent services from sandbox to staging to production with CI/CD patterns and release approvals.",
    icon: GitBranch
  },
  {
    title: "AI observability",
    description: "Monitor latency, token usage, GPU utilization, retrieval quality, model errors, tool calls, conversation traces, drift, and business outcome signals.",
    icon: MonitorDot
  },
  {
    title: "Secure API gateway",
    description: "Expose AI services through authenticated APIs with rate limits, tenant controls, secrets management, policy enforcement, and traceable request routing.",
    icon: Network
  }
];

const infrastructureModules = [
  ["Compute Orchestrator", "Controls GPU and CPU pools, model replicas, autoscaling policies, queueing, region placement, and workload isolation."],
  ["Model Gateway", "Routes requests across LLMs, embedding models, speech models, vision models, rerankers, and custom inference endpoints."],
  ["Vector and Retrieval Layer", "Manages embeddings, indexes, metadata filters, source permissions, retrieval evaluation, and data freshness schedules."],
  ["Deployment Control Plane", "Coordinates releases, environment promotion, rollback, configuration, runtime variables, and policy approval workflows."],
  ["Observability Stack", "Captures traces, logs, metrics, cost, latency, quality checks, error budgets, and conversation-level debugging evidence."],
  ["Security and Compliance Hub", "Centralizes identity, secrets, encryption, audit trails, PII handling, retention rules, and compliance evidence."]
];

const infrastructureWorkflows = [
  {
    title: "Deploy a private model endpoint",
    steps: ["Register model", "Select compute profile", "Configure gateway", "Run smoke tests", "Canary traffic", "Promote to production"]
  },
  {
    title: "Launch a RAG knowledge pipeline",
    steps: ["Connect sources", "Chunk documents", "Generate embeddings", "Build index", "Evaluate retrieval", "Schedule refresh"]
  },
  {
    title: "Scale realtime agent traffic",
    steps: ["Measure latency", "Autoscale replicas", "Route by region", "Throttle noisy tenants", "Monitor cost", "Review SLOs"]
  },
  {
    title: "Govern model changes",
    steps: ["Create release", "Review prompts", "Approve policies", "Run evaluations", "Deploy gradually", "Audit outcome"]
  }
];

const infrastructureSecurity = [
  "Private networking, VPC deployment patterns, and controlled ingress for model endpoints",
  "Encryption for data in transit and at rest across knowledge, logs, and model artifacts",
  "Secrets management for provider keys, internal APIs, database credentials, and deployment variables",
  "Tenant-aware access controls for teams, environments, workloads, and infrastructure operations",
  "Audit trails for model requests, gateway routing, deployment changes, and admin activity",
  "Configurable retention and redaction policies for traces, prompts, files, and conversation logs"
];

const infrastructureIntegrations = ["AWS", "Azure", "Google Cloud", "Kubernetes", "NVIDIA GPUs", "Postgres", "pgvector", "Pinecone", "Weaviate", "Milvus", "Databricks", "Snowflake", "OpenAI", "Anthropic", "Hugging Face", "Langfuse", "Datadog", "Grafana", "GitHub Actions", "Terraform"];

const infrastructureOutcomes = [
  ["60%+", "higher GPU utilization target"],
  ["<300ms", "routing overhead design goal"],
  ["99.9%", "target availability pattern"],
  ["100%", "traceable releases and requests"]
];

const infrastructureFaqs = [
  {
    question: "Is Teleaon AI Infrastructure only for companies running their own models?",
    answer: "No. It supports private model hosting, managed model providers, hybrid routing, embeddings, retrieval, speech, and agent runtime services. Teams can use it even when some workloads run on commercial model APIs."
  },
  {
    question: "Can it run in our cloud environment?",
    answer: "Yes. The architecture is designed for secure cloud deployment patterns including private networking, environment separation, identity integration, and controlled access to enterprise systems."
  },
  {
    question: "How does it help reduce AI infrastructure cost?",
    answer: "It provides routing, autoscaling, GPU utilization monitoring, model selection, caching patterns, usage visibility, and quota controls so teams can match workloads to the right compute and model path."
  },
  {
    question: "Does it support vector databases and RAG?",
    answer: "Yes. It includes infrastructure patterns for embeddings, vector indexes, retrieval permissions, document refresh, metadata filters, evaluation, and production RAG observability."
  },
  {
    question: "How do we move models and agents from pilot to production?",
    answer: "The deployment control plane supports environments, release approvals, evaluations, canary rollout, rollback, trace monitoring, and policy controls across model, prompt, tool, and agent changes."
  },
  {
    question: "What observability is included?",
    answer: "Teams can monitor latency, cost, GPU utilization, token usage, model errors, retrieval quality, tool calls, conversation traces, deployments, and business outcome metrics."
  }
];

const platformOutcomes = [
  ["10x", "faster agent rollout with reusable orchestration"],
  ["360°", "visibility across tools, models, memory, and workflows"],
  ["24/7", "agent operations with monitoring and human handoff"],
  ["100%", "auditable agent decisions and tool calls"]
];

const platformCapabilities = [
  {
    title: "Agent builder",
    description: "Design role-specific agents with instructions, memory, tools, escalation paths, approval rules, test data, and channel-specific behavior.",
    icon: Bot
  },
  {
    title: "Model orchestration",
    description: "Route tasks across LLMs, embedding models, speech models, vision models, and private endpoints with fallback, cost, latency, and quality controls.",
    icon: BrainCircuit
  },
  {
    title: "Data connectors",
    description: "Connect agents to CRM, helpdesk, documents, data warehouses, knowledge bases, collaboration tools, databases, and internal APIs.",
    icon: PlugZap
  },
  {
    title: "Memory and context",
    description: "Manage short-term task context, long-term customer memory, retrieval indexes, source citations, and permission-aware knowledge access.",
    icon: DatabaseZap
  },
  {
    title: "Guardrails and approvals",
    description: "Apply policies, tool restrictions, safety checks, human review, PII handling, escalation logic, and audit trails before agents act.",
    icon: ShieldCheck
  },
  {
    title: "Monitoring and governance",
    description: "Track conversations, tool calls, cost, latency, success rate, failure reasons, evaluations, drift, and production business outcomes.",
    icon: MonitorDot
  }
];

const platformModules = [
  ["Agent Studio", "A design workspace for prompts, tasks, tools, role policies, memory, test conversations, and production release preparation."],
  ["Model Router", "A policy-driven orchestration layer for selecting models by task type, cost, latency, region, risk, and fallback requirement."],
  ["Connector Hub", "Secure integrations for enterprise systems, APIs, databases, file stores, collaboration tools, support platforms, and CRMs."],
  ["Workflow Engine", "Multi-step automation for approvals, tickets, CRM updates, data enrichment, calendar booking, handoffs, and notifications."],
  ["Evaluation Lab", "Test suites, simulation runs, benchmark datasets, regression checks, red-team scenarios, and quality scorecards."],
  ["Governance Console", "Central controls for access, environments, policies, audit logs, deployment history, analytics, and compliance evidence."]
];

const platformWorkflows = [
  {
    title: "Build a production support agent",
    steps: ["Define role", "Connect knowledge", "Add tools", "Set handoff rules", "Run evaluations", "Deploy to channels"]
  },
  {
    title: "Automate a sales workflow",
    steps: ["Capture lead", "Qualify intent", "Enrich account", "Book meeting", "Update CRM", "Notify owner"]
  },
  {
    title: "Govern a model change",
    steps: ["Create version", "Run tests", "Review policy", "Canary release", "Monitor traces", "Promote or rollback"]
  },
  {
    title: "Coordinate multiple agents",
    steps: ["Route request", "Assign specialist", "Share memory", "Execute tools", "Escalate exception", "Summarize outcome"]
  }
];

const platformSecurity = [
  "Role-based access controls across builders, reviewers, admins, and business users",
  "Environment separation for sandbox, staging, pilot, and production agents",
  "Approval gates for sensitive tool calls, external messages, customer records, and high-impact actions",
  "Conversation, model, memory, retrieval, workflow, and tool-call audit trails",
  "Evaluation and regression testing before prompt, tool, policy, or model changes are released",
  "Configurable retention, redaction, and data access policies for enterprise governance"
];

const platformIntegrations = ["Salesforce", "HubSpot", "Zendesk", "ServiceNow", "Microsoft 365", "Google Workspace", "Slack", "Teams", "SharePoint", "Confluence", "Postgres", "Snowflake", "Databricks", "OpenAI", "Anthropic", "Hugging Face", "Twilio", "WhatsApp", "GitHub", "Custom APIs"];

const platformFaqs = [
  {
    question: "What is Teleaon AI Platform?",
    answer: "Teleaon AI Platform is an end-to-end operating layer for building, deploying, monitoring, and governing AI agents across enterprise tools, data, models, channels, and workflows."
  },
  {
    question: "How is this different from AI SaaS?",
    answer: "AI SaaS provides ready-to-use applications for business teams. AI Platform gives technical and operations teams the control plane to design custom agents, orchestrate models, connect tools, govern behavior, and scale agent systems."
  },
  {
    question: "Can business and technical teams collaborate in the platform?",
    answer: "Yes. Business teams can define workflows and review outcomes, while technical teams manage tools, models, integrations, evaluations, security, and deployment controls."
  },
  {
    question: "Does it support multiple agents working together?",
    answer: "Yes. The platform supports specialist agents, routing logic, shared memory, workflow coordination, human handoff, and orchestration across tools and channels."
  },
  {
    question: "How do we monitor agents in production?",
    answer: "Teams can monitor traces, latency, cost, tool calls, escalation rates, errors, response quality, user feedback, evaluations, and business outcomes from the governance console."
  },
  {
    question: "Can we integrate our own tools and APIs?",
    answer: "Yes. The connector hub and workflow engine are designed for standard SaaS tools, databases, internal APIs, custom business systems, and secure enterprise deployment patterns."
  }
];

const genAIOutcomes = [
  ["70%+", "target document processing automation"],
  ["<2 weeks", "to deploy first governed knowledge assistant"],
  ["Multimodal", "text, document, image, voice, and video workflows"],
  ["100%", "citation and audit coverage for sensitive answers"]
];

const genAICapabilities = [
  {
    title: "Enterprise RAG",
    description: "Build retrieval-augmented generation over documents, websites, wikis, tickets, contracts, policies, and structured data with citations and permissions.",
    icon: FileSearch
  },
  {
    title: "Enterprise search",
    description: "Give employees and customers precise answers across fragmented knowledge systems with freshness checks, source ranking, and role-aware access.",
    icon: DatabaseZap
  },
  {
    title: "Document intelligence",
    description: "Extract fields, summarize files, compare versions, classify content, route approvals, and transform PDFs, forms, images, and spreadsheets into workflows.",
    icon: FileText
  },
  {
    title: "AI copilots",
    description: "Create copilots for support, sales, legal, HR, finance, operations, engineering, and leadership teams with secure tool access and memory.",
    icon: Bot
  },
  {
    title: "Content generation",
    description: "Generate compliant emails, briefs, proposals, knowledge articles, campaign copy, product descriptions, and executive summaries with brand controls.",
    icon: Sparkles
  },
  {
    title: "Secure LLM deployment",
    description: "Route prompts through approved models, enforce policies, log requests, evaluate responses, protect sensitive data, and review production behavior.",
    icon: ShieldCheck
  }
];

const genAIModules = [
  ["Knowledge Graph Studio", "Connect sources, map entities, organize metadata, manage freshness, and expose reliable knowledge to copilots and search experiences."],
  ["RAG Orchestrator", "Configure chunking, embeddings, hybrid search, reranking, prompt templates, context windows, citations, and retrieval quality checks."],
  ["Document AI Pipeline", "Process files, extract fields, classify document types, validate confidence, trigger workflows, and hand exceptions to reviewers."],
  ["Copilot Builder", "Design role-specific assistants with memory, tools, tone controls, approval gates, and workflow execution for each department."],
  ["Model Governance Layer", "Route to approved LLMs, run evaluations, compare outputs, manage prompt versions, redact sensitive data, and monitor usage."],
  ["Content Operations Console", "Create, review, localize, approve, publish, and measure generated content across customer and internal channels."]
];

const genAIWorkflows = [
  {
    title: "Knowledge assistant for employees",
    steps: ["Ask question", "Verify user role", "Retrieve sources", "Generate answer", "Show citations", "Suggest next action"]
  },
  {
    title: "Document intake automation",
    steps: ["Upload file", "Classify type", "Extract fields", "Validate confidence", "Route exception", "Update system"]
  },
  {
    title: "Customer-facing product copilot",
    steps: ["Understand need", "Search product data", "Compare options", "Generate answer", "Capture lead", "Escalate sales"]
  },
  {
    title: "Governed content production",
    steps: ["Create brief", "Generate draft", "Apply brand rules", "Review compliance", "Approve content", "Measure performance"]
  }
];

const genAISecurity = [
  "Source-level permission checks before retrieval and answer generation",
  "Citation-backed responses with visible source references and confidence signals",
  "Prompt, model, and policy versioning for production change control",
  "PII redaction, sensitive-topic routing, and retention controls for generated content",
  "Human review queues for low-confidence extraction, legal content, and customer-facing publication",
  "Evaluation harnesses for hallucination risk, retrieval quality, tone, policy adherence, and answer completeness"
];

const genAIIntegrations = ["SharePoint", "Google Drive", "Confluence", "Notion", "Zendesk", "ServiceNow", "Salesforce", "HubSpot", "Snowflake", "Databricks", "Postgres", "S3", "Azure Blob", "OpenAI", "Anthropic", "Hugging Face", "Pinecone", "pgvector", "Slack", "Teams"];

const genAIFaqs = [
  {
    question: "What does Teleaon Gen AI help us build?",
    answer: "It helps teams build governed generative AI experiences such as enterprise search, RAG assistants, document intelligence workflows, department copilots, content automation, and secure LLM-powered applications."
  },
  {
    question: "How does it reduce hallucination risk?",
    answer: "Teleaon Gen AI combines retrieval controls, source permissions, citations, response policies, evaluation checks, prompt versioning, and review workflows so sensitive answers are grounded and auditable."
  },
  {
    question: "Can it use our existing files and knowledge bases?",
    answer: "Yes. It is designed to connect to document repositories, wikis, ticketing systems, CRM records, data platforms, websites, and APIs while respecting source permissions and freshness rules."
  },
  {
    question: "Does it support document intelligence?",
    answer: "Yes. Teams can classify documents, extract fields, summarize files, compare versions, route exceptions, trigger approvals, and update downstream systems from PDFs, forms, spreadsheets, images, and contracts."
  },
  {
    question: "Can we choose which LLMs are used?",
    answer: "Yes. The architecture supports approved model routing across commercial APIs, private endpoints, and open-source models, with logs, usage visibility, and governance policies around each model path."
  },
  {
    question: "How do we start safely?",
    answer: "Most teams start with one high-value knowledge or document workflow, define source permissions and success metrics, run evaluations with real examples, then expand to more copilots and channels."
  }
];

function AISaaSPage() {
  return (
    <main className="overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fbff]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_12%,rgba(40,199,232,0.30),transparent_32%),radial-gradient(circle_at_18%_24%,rgba(224,0,131,0.20),transparent_30%),linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fa_100%)]" />
        <SmokeBackground smokeColor="#28c7e8" className="absolute inset-0 z-[1] h-full w-full opacity-95 mix-blend-multiply" />
        <div className="product-hero-motion product-hero-motion--saas absolute inset-0 z-[2]" />
        <div className="absolute inset-0 z-[3] opacity-[0.24] [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/45 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-xl">
              AI SaaS for business teams
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
              Ready-to-use AI applications for enterprise teams
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-650">
              Launch secure AI apps that automate workflows, answer customer questions, qualify leads, summarize operations, and help teams get work done across every business function.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book a Demo</Button>
              <Button href="#capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Capabilities
              </Button>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {outcomes.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <AISaaSVisual />
        </div>
      </section>

      <LightSection
        eyebrow="Product Positioning"
        title="AI SaaS gives every department a governed AI operating layer"
        description="Instead of asking business teams to assemble models, prompts, infrastructure, and integrations from scratch, Teleaon provides packaged AI applications that can be deployed quickly, measured clearly, and governed centrally."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["For business leaders", "Launch measurable automation initiatives without waiting for long platform programs. Track adoption, outcomes, risk, and ROI across departments."],
            ["For operations teams", "Automate manual steps, reduce queue volume, standardize follow-up, and make sure every request has a clear owner and next action."],
            ["For IT and AI teams", "Give the business prebuilt apps while keeping control over permissions, integrations, model behavior, auditability, and data governance."]
          ].map(([title, description]) => (
            <InfoCard key={title} title={title} description={description} />
          ))}
        </div>
      </LightSection>

      <LightSection
        id="capabilities"
        eyebrow="Key Capabilities"
        title="Everything needed to launch productive AI apps"
        description="Teleaon AI SaaS combines conversational AI, enterprise knowledge, workflow execution, analytics, and governance so teams can move from request to resolution."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan/12 text-cyan">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </LightSection>

      <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.22),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(224,0,131,0.20),transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Platform Modules</div>
            <h2 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">Modular apps that work together</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Deploy one module for a focused team or combine multiple modules into an AI operating environment for customer, employee, and operational workflows.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {modules.map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-350">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LightSection
        eyebrow="Example Workflows"
        title="Use cases that connect front office, back office, and knowledge work"
        description="AI SaaS is designed for practical business execution, not demos. These workflows show how requests become outcomes with connected systems and clear handoffs."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {workflows.map((workflow) => (
            <div key={workflow.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{workflow.title}</h3>
              <div className="mt-5 grid gap-3">
                {workflow.steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan text-sm font-semibold text-ink">{index + 1}</span>
                    <span className="text-sm font-medium text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LightSection>

      <LightSection
        eyebrow="Enterprise Security"
        title="Built for governed adoption across real business teams"
        description="Teleaon AI SaaS gives teams the convenience of packaged AI applications while giving IT, security, and AI leaders the controls required for production use."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm">
            <LockKeyhole className="h-10 w-10 text-cyan" />
            <h3 className="mt-5 text-2xl font-semibold text-slate-950">Security and governance model</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">Control what agents know, which systems they can access, what actions require approval, and how every conversation is recorded for review.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {securityItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                <p className="text-sm leading-6 text-slate-650">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </LightSection>

      <LightSection
        eyebrow="Integrations"
        title="Connect AI apps to the systems your teams already use"
        description="AI SaaS works best when it can read context, take approved actions, and close the loop in the tools where work already happens."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((integration) => (
            <div key={integration} className="rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-semibold text-slate-700 shadow-sm">
              {integration}
            </div>
          ))}
        </div>
      </LightSection>

      <section className="bg-slate-950 py-16 lg:py-24">
        <Section>
          <SectionHeading title="AI SaaS FAQ" description="Answers for business sponsors, IT leaders, and teams evaluating production AI applications." />
          <FAQSection items={faqs} />
        </Section>
      </section>

      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fa_100%)] py-16 lg:py-24">
        <Section>
          <CTASection
            title="Ready to launch AI SaaS for your business teams?"
            description="Book a working session to map your first use case, review integrations, define governance needs, and create a rollout plan for measurable automation."
            secondaryHref="/products"
          />
        </Section>
      </section>
    </main>
  );
}

function AIInfrastructurePage() {
  return (
    <main className="overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative isolate border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_12%,rgba(40,199,232,0.30),transparent_32%),radial-gradient(circle_at_16%_28%,rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,#ffffff_0%,#eefbff_48%,#f3f7ff_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/25 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan shadow-sm backdrop-blur-xl">
              AI Infrastructure for production workloads
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02]">
              Secure infrastructure for scalable AI workloads
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-650">
              Run models, embeddings, vector search, agent services, deployment pipelines, and observability controls on a secure foundation designed for enterprise AI operations.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book Infrastructure Review</Button>
              <Button href="#infra-capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Infrastructure
              </Button>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {infrastructureOutcomes.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <AIInfrastructureScrollHero />
        </div>
      </section>

      <LightSection
        eyebrow="Problem Statement"
        title="AI pilots fail when infrastructure is improvised"
        description="Many teams can build a demo, but production AI needs reliable model serving, secure data access, deployment discipline, cost controls, monitoring, and governance from day one."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Fragmented model access", "Teams use different providers, keys, prompts, and endpoints without consistent security, routing, usage visibility, or cost controls."],
            ["Unreliable retrieval pipelines", "RAG systems drift when documents, embeddings, metadata, permissions, and freshness schedules are not operated as production infrastructure."],
            ["No production evidence", "AI teams need traces, evaluations, audit logs, deployment history, and operational metrics to support risk, compliance, and reliability reviews."]
          ].map(([title, description]) => (
            <InfoCard key={title} title={title} description={description} />
          ))}
        </div>
      </LightSection>

      <LightSection
        id="infra-capabilities"
        eyebrow="Key Capabilities"
        title="Infrastructure services for the full AI workload lifecycle"
        description="Teleaon AI Infrastructure gives platform teams a secure control plane for model workloads, retrieval systems, agent runtimes, and production operations."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {infrastructureCapabilities.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan/12 text-cyan">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </LightSection>

      <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_16%,rgba(40,199,232,0.24),transparent_28%),radial-gradient(circle_at_84%_74%,rgba(59,130,246,0.22),transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Infrastructure Modules</div>
            <h2 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">A control plane for AI compute, data, and deployment</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Use modular services independently or as a full AI infrastructure layer across model providers, private deployments, retrieval workloads, and agent applications.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {infrastructureModules.map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-350">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LightSection
        eyebrow="Deployment Workflows"
        title="Repeatable paths from model experiment to production service"
        description="Infrastructure teams get practical release workflows for private models, retrieval pipelines, realtime agent traffic, and governed AI changes."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {infrastructureWorkflows.map((workflow) => (
            <div key={workflow.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{workflow.title}</h3>
              <div className="mt-5 grid gap-3">
                {workflow.steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan text-sm font-semibold text-ink">{index + 1}</span>
                    <span className="text-sm font-medium text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LightSection>

      <LightSection
        eyebrow="Secure Cloud Architecture"
        title="Built for sensitive workloads, regulated teams, and enterprise controls"
        description="Teleaon AI Infrastructure is designed around secure access, controlled environments, observable operations, and reviewable deployment activity."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm">
            <CloudCog className="h-10 w-10 text-cyan" />
            <h3 className="mt-5 text-2xl font-semibold text-slate-950">Private, governed AI runtime</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">Deploy model endpoints, vector services, and agent runtimes with clear boundaries between teams, tenants, regions, environments, and operational responsibilities.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {infrastructureSecurity.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                <p className="text-sm leading-6 text-slate-650">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </LightSection>

      <LightSection
        eyebrow="Integrations"
        title="Connect infrastructure to your cloud, data, model, and observability stack"
        description="Teleaon works alongside existing cloud architecture so platform teams can standardize AI operations without forcing every workload into one provider."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {infrastructureIntegrations.map((integration) => (
            <div key={integration} className="rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-semibold text-slate-700 shadow-sm">
              {integration}
            </div>
          ))}
        </div>
      </LightSection>

      <section className="bg-slate-950 py-16 lg:py-24">
        <Section>
          <SectionHeading title="AI Infrastructure FAQ" description="Answers for AI platform teams, infrastructure owners, security leaders, and technical evaluators." />
          <FAQSection items={infrastructureFaqs} />
        </Section>
      </section>

      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#f3f7ff_100%)] py-16 lg:py-24">
        <Section>
          <CTASection
            title="Ready to harden your AI infrastructure for production?"
            description="Book an infrastructure review to map model workloads, data pipelines, deployment environments, security controls, and observability requirements."
            secondaryHref="/products"
          />
        </Section>
      </section>
    </main>
  );
}

function AIPlatformPage() {
  return (
    <main className="overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fbff]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_12%,rgba(40,199,232,0.34),transparent_32%),radial-gradient(circle_at_16%_28%,rgba(224,0,131,0.24),transparent_30%),linear-gradient(135deg,#ffffff_0%,#effcff_48%,#f5f0ff_100%)]" />
        <div className="product-hero-motion product-hero-motion--platform absolute inset-0 z-[1]" />
        <div className="absolute inset-0 z-[3] opacity-[0.24] [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/45 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-xl">
              AI Platform control plane
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02]">
              Build, manage, and govern AI agents at enterprise scale
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-650">
              Design agentic systems with model orchestration, data connectors, memory, tools, guardrails, workflow automation, monitoring, and governance in one production-ready platform.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book Platform Demo</Button>
              <Button href="#platform-capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Platform
              </Button>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {platformOutcomes.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-950/10 bg-slate-950 shadow-[0_40px_120px_rgba(14,116,144,0.24)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(40,199,232,0.22),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(224,0,131,0.22),transparent_30%)]" />
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="relative z-10 h-[420px] p-4">
              <ParticleTextEffect words={["AGENTS", "ORCHESTRATE", "GOVERN", "DEPLOY", "MONITOR"]} className="h-full w-full opacity-95" />
            </div>
            <div className="absolute inset-x-6 bottom-6 z-20 grid gap-3 sm:grid-cols-3">
              {[
                ["Agent builder", "Design"],
                ["Model router", "Orchestrate"],
                ["Governance", "Control"]
              ].map(([title, label]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-white shadow-2xl backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-cyan">{label}</div>
                  <div className="mt-2 text-sm font-semibold">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LightSection
        eyebrow="Problem Statement"
        title="Agent pilots need a control plane before they become production systems"
        description="Enterprise teams can prototype agents quickly, but scaling them safely requires orchestration, connectors, memory, tools, approval gates, evaluation, monitoring, and governance built into the operating model."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Agents are hard to operate", "Prompts, tools, models, memory, and data access become difficult to manage when every team builds agents differently."],
            ["Actions need controls", "AI agents must know when to answer, when to act, when to ask for approval, and when to hand off to a human with full context."],
            ["Production needs evidence", "Leaders need traces, evaluations, version history, monitoring, cost visibility, and measurable outcomes before scaling agent programs."]
          ].map(([title, description]) => (
            <InfoCard key={title} title={title} description={description} />
          ))}
        </div>
      </LightSection>

      <LightSection
        id="platform-capabilities"
        eyebrow="Key Capabilities"
        title="Everything required to build and operate enterprise AI agents"
        description="Teleaon AI Platform combines agent design, model orchestration, enterprise data access, workflow execution, monitoring, and governance into one platform for agentic AI."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platformCapabilities.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan/12 text-cyan">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </LightSection>

      <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.24),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(224,0,131,0.18),transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Platform Modules</div>
            <h2 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">A modular operating system for agentic AI</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Deploy a single agent workflow or coordinate multi-agent systems across teams, channels, tools, approvals, and production environments.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {platformModules.map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-350">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LightSection
        eyebrow="Example Workflows"
        title="From agent design to governed production release"
        description="The platform supports the full lifecycle: build agents, connect systems, evaluate behavior, release safely, monitor outcomes, and improve over time."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {platformWorkflows.map((workflow) => (
            <div key={workflow.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{workflow.title}</h3>
              <div className="mt-5 grid gap-3">
                {workflow.steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan text-sm font-semibold text-ink">{index + 1}</span>
                    <span className="text-sm font-medium text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LightSection>

      <LightSection
        eyebrow="Enterprise Security"
        title="Govern agent behavior, tool access, and operational risk"
        description="Teleaon AI Platform gives AI, IT, security, and business leaders the controls needed to scale agents without losing visibility or accountability."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm">
            <LockKeyhole className="h-10 w-10 text-cyan" />
            <h3 className="mt-5 text-2xl font-semibold text-slate-950">Governed agent operations</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">Define what agents can know, which tools they can use, when approval is required, how releases are tested, and how every action is reviewed.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platformSecurity.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                <p className="text-sm leading-6 text-slate-650">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </LightSection>

      <LightSection
        eyebrow="Integrations"
        title="Connect agents to the tools, data, and channels that run your business"
        description="Agents become useful when they can understand context, take approved action, and update the systems where teams already work."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {platformIntegrations.map((integration) => (
            <div key={integration} className="rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-semibold text-slate-700 shadow-sm">
              {integration}
            </div>
          ))}
        </div>
      </LightSection>

      <section className="bg-slate-950 py-16 lg:py-24">
        <Section>
          <SectionHeading title="AI Platform FAQ" description="Answers for teams evaluating enterprise agent builders, model orchestration, workflow automation, monitoring, and governance." />
          <FAQSection items={platformFaqs} />
        </Section>
      </section>

      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#f5f0ff_100%)] py-16 lg:py-24">
        <Section>
          <CTASection
            title="Ready to build governed AI agents on one platform?"
            description="Book a platform demo to map your first agent systems, integrations, approval rules, evaluation plan, and production rollout path."
            secondaryHref="/products"
          />
        </Section>
      </section>
    </main>
  );
}

function GenAIPage() {
  return (
    <main className="overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fbff]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_10%,rgba(224,0,131,0.18),transparent_32%),radial-gradient(circle_at_14%_30%,rgba(40,199,232,0.24),transparent_34%),linear-gradient(135deg,#ffffff_0%,#effcff_45%,#fff1fb_100%)]" />
        <div className="product-hero-motion product-hero-motion--gen absolute inset-0 z-[1]" />
        <div className="absolute inset-0 z-[2] opacity-[0.24] [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/45 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-xl">
              Enterprise generative AI
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02]">
              Governed Gen AI for knowledge, documents, and copilots
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-650">
              Build secure generative AI systems that search enterprise knowledge, understand documents, generate trusted content, and power role-specific copilots with citations, controls, and measurable outcomes.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book Gen AI Workshop</Button>
              <Button href="#gen-ai-capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Gen AI
              </Button>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {genAIOutcomes.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <GenAIVisual />
        </div>
      </section>

      <LightSection
        eyebrow="Problem Statement"
        title="Generative AI needs trusted context, not isolated prompts"
        description="Enterprise teams need more than a public chat interface. They need reliable retrieval, governed knowledge access, document understanding, model controls, evaluation, and workflows that turn generated answers into approved action."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Knowledge is fragmented", "Critical answers live across documents, tickets, CRM notes, policies, wikis, data warehouses, and inboxes with different owners and permissions."],
            ["Outputs need governance", "Business users need speed, while legal, security, and AI leaders need citations, review gates, audit trails, and policy-aligned responses."],
            ["Pilots rarely scale", "Without retrieval quality, model routing, prompt versioning, evaluations, and measurable workflows, Gen AI experiments remain disconnected demos."]
          ].map(([title, description]) => (
            <InfoCard key={title} title={title} description={description} />
          ))}
        </div>
      </LightSection>

      <LightSection
        id="gen-ai-capabilities"
        eyebrow="Key Capabilities"
        title="A complete Gen AI layer for enterprise use cases"
        description="Teleaon Gen AI combines RAG, enterprise search, document intelligence, copilots, content generation, multimodal AI, and secure model operations in one governed product motion."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {genAICapabilities.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan/12 text-cyan">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </LightSection>

      <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(40,199,232,0.24),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(224,0,131,0.24),transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Gen AI Modules</div>
            <h2 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">From knowledge ingestion to governed generation</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Use individual modules for focused use cases or combine them into a full generative AI operating model for employees, customers, and content teams.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {genAIModules.map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-350">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LightSection
        eyebrow="Example Workflows"
        title="Gen AI workflows that move from answer to outcome"
        description="Teleaon Gen AI is built for practical enterprise work: grounded answers, structured extraction, customer assistance, content operations, and approved downstream actions."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {genAIWorkflows.map((workflow) => (
            <div key={workflow.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{workflow.title}</h3>
              <div className="mt-5 grid gap-3">
                {workflow.steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan text-sm font-semibold text-ink">{index + 1}</span>
                    <span className="text-sm font-medium text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LightSection>

      <LightSection
        eyebrow="Enterprise Security"
        title="Govern answers, documents, models, and content before scaling"
        description="Teleaon Gen AI lets teams move quickly while preserving source permissions, auditability, policy controls, response quality, and human review where the risk is higher."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm">
            <LockKeyhole className="h-10 w-10 text-cyan" />
            <h3 className="mt-5 text-2xl font-semibold text-slate-950">Trusted generation architecture</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">Control which sources are retrieved, which model paths are approved, what content needs review, and how every generated answer can be traced back to context.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {genAISecurity.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                <p className="text-sm leading-6 text-slate-650">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </LightSection>

      <LightSection
        eyebrow="Integrations"
        title="Connect Gen AI to enterprise knowledge, data, and collaboration systems"
        description="The strongest Gen AI experiences use the data your organization already trusts, with connectors and APIs that keep permissions, context, and workflow ownership intact."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {genAIIntegrations.map((integration) => (
            <div key={integration} className="rounded-2xl border border-slate-200 bg-white/75 p-4 text-sm font-semibold text-slate-700 shadow-sm">
              {integration}
            </div>
          ))}
        </div>
      </LightSection>

      <section className="bg-slate-950 py-16 lg:py-24">
        <Section>
          <SectionHeading title="Gen AI FAQ" description="Answers for teams evaluating enterprise RAG, document intelligence, copilots, secure LLM deployment, and content automation." />
          <FAQSection items={genAIFaqs} />
        </Section>
      </section>

      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fb_100%)] py-16 lg:py-24">
        <Section>
          <CTASection
            title="Ready to build governed Gen AI for your enterprise?"
            description="Book a Gen AI workshop to map knowledge sources, select high-value workflows, define governance controls, and design your first production assistant."
            secondaryHref="/products"
          />
        </Section>
      </section>
    </main>
  );
}

function AISaaSVisual() {
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-[0_28px_90px_rgba(14,116,144,0.14)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(224,0,131,0.16),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(40,199,232,0.20),transparent_34%)]" />
      <div className="relative grid gap-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan">AI SaaS Command Center</div>
              <div className="mt-2 text-xl font-semibold">Customer workflow live</div>
            </div>
            <div className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-ink">Active</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Intent", "Demo request"],
              ["Sentiment", "Positive"],
              ["Next action", "Book meeting"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                <div className="mt-2 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <VisualTile icon={<Bot />} title="AI Agent" body="Understands the request and selects the right workflow." />
          <VisualTile icon={<DatabaseZap />} title="CRM Update" body="Creates lead, updates score, and logs conversation summary." />
          <VisualTile icon={<PlugZap />} title="Tool Actions" body="Books calendar slot and sends confirmation to the customer." />
          <VisualTile icon={<Gauge />} title="Analytics" body="Tracks conversion, handling time, and automation outcome." />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-6 w-6 text-cyan" />
            <div className="font-semibold text-slate-950">Governed response</div>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">“I can help with that. I found the best product specialist slot for Tuesday at 10:30 AM and updated your CRM record with the full enquiry context.”</p>
        </div>
      </div>
    </div>
  );
}

function GenAIVisual() {
  const contentSignals = ["RAG", "Search", "Docs", "Citations", "Copilots", "LLM"];

  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[1.5rem] border border-white/70 bg-slate-950 p-4 shadow-[0_28px_90px_rgba(14,116,144,0.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.18),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(224,0,131,0.22),transparent_34%)]" />
      <GenAIFlowTrailHero />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative grid gap-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan">Gen AI Intelligence Layer</div>
              <div className="mt-2 text-xl font-semibold">Grounded answer generated</div>
            </div>
            <div className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-ink">Cited</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Sources", "14 retrieved"],
              ["Confidence", "94%"],
              ["Policy", "Approved"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                <div className="mt-2 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <VisualTile icon={<FileSearch />} title="Retrieval" body="Finds source-backed context across documents, wikis, tickets, and data systems." />
          <VisualTile icon={<BrainCircuit />} title="Generation" body="Creates concise answers, summaries, drafts, and recommendations with policy controls." />
          <VisualTile icon={<ShieldCheck />} title="Governance" body="Applies permissions, citations, redaction, evaluation, and review gates." />
          <VisualTile icon={<Workflow />} title="Workflow" body="Turns generated output into approvals, CRM updates, tickets, briefs, and next actions." />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {contentSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                {signal}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-cyan" />
            <div className="font-semibold text-slate-950">Trusted enterprise output</div>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">“The policy allows premium customers to request priority onboarding. I found the latest source, generated the response, and attached two citations for review.”</p>
        </div>
      </div>
    </div>
  );
}

function VisualTile({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/78 p-5 shadow-sm">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-cyan/12 text-cyan [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function LightSection({ id, eyebrow, title, description, children }: { id?: string; eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f6fdff_52%,#fff8fc_100%)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">{eyebrow}</div>
          <h2 className="mt-4 text-balance text-4xl font-semibold text-slate-950 sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-cyan/12 text-cyan">
        <Zap className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
