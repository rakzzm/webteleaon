import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, Bot, BrainCircuit, CheckCircle2, CloudCog, Cpu, DatabaseZap, FileSearch, Gauge, GitBranch, HardDrive, LockKeyhole, MessageSquareText, MonitorDot, Network, PlugZap, Rocket, ServerCog, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
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

function AISaaSPage() {
  return (
    <main className="overflow-hidden bg-[#f8fbff] text-slate-950">
      <section className="relative isolate border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_12%,rgba(40,199,232,0.30),transparent_32%),radial-gradient(circle_at_18%_24%,rgba(224,0,131,0.20),transparent_30%),linear-gradient(135deg,#ffffff_0%,#effcff_48%,#fff1fa_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/25 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan shadow-sm backdrop-blur-xl">
              AI SaaS for business teams
            </div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl lg:text-[4.6rem] lg:leading-[0.98]">
              Ready-to-use AI applications for enterprise teams
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
              Launch secure AI apps that automate workflows, answer customer questions, qualify leads, summarize operations, and help teams get work done across every business function.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book a Demo</Button>
              <Button href="#capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Capabilities
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
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
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan/25 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan shadow-sm backdrop-blur-xl">
              AI Infrastructure for production workloads
            </div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl lg:text-[4.55rem] lg:leading-[0.98]">
              Secure infrastructure for scalable AI workloads
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
              Run models, embeddings, vector search, agent services, deployment pipelines, and observability controls on a secure foundation designed for enterprise AI operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact-us">Book Infrastructure Review</Button>
              <Button href="#infra-capabilities" variant="secondary" className="border-slate-300 text-slate-950 hover:border-cyan/50 hover:bg-white/80">
                Explore Infrastructure
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {infrastructureOutcomes.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <InfrastructureVisual />
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

function AISaaSVisual() {
  return (
    <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_40px_120px_rgba(14,116,144,0.16)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(224,0,131,0.16),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(40,199,232,0.20),transparent_34%)]" />
      <div className="relative grid gap-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan">AI SaaS Command Center</div>
              <div className="mt-2 text-2xl font-semibold">Customer workflow live</div>
            </div>
            <div className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-ink">Active</div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
        <div className="grid gap-4 sm:grid-cols-2">
          <VisualTile icon={<Bot />} title="AI Agent" body="Understands the request and selects the right workflow." />
          <VisualTile icon={<DatabaseZap />} title="CRM Update" body="Creates lead, updates score, and logs conversation summary." />
          <VisualTile icon={<PlugZap />} title="Tool Actions" body="Books calendar slot and sends confirmation to the customer." />
          <VisualTile icon={<Gauge />} title="Analytics" body="Tracks conversion, handling time, and automation outcome." />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm">
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

function InfrastructureVisual() {
  return (
    <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_40px_120px_rgba(14,116,144,0.16)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.18),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(59,130,246,0.18),transparent_34%)]" />
      <div className="relative grid gap-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan">AI Infrastructure Control Plane</div>
              <div className="mt-2 text-2xl font-semibold">Production workload routing</div>
            </div>
            <div className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-ink">Healthy</div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["GPU pool", "72% utilized"],
              ["P95 latency", "186ms"],
              ["Active models", "18 endpoints"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                <div className="mt-2 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <VisualTile icon={<Cpu />} title="GPU Orchestration" body="Schedules inference, embeddings, and batch jobs across scalable compute pools." />
          <VisualTile icon={<HardDrive />} title="Vector Layer" body="Manages indexes, metadata filters, memory stores, and retrieval freshness." />
          <VisualTile icon={<Rocket />} title="Release Pipeline" body="Promotes model, prompt, and policy changes through governed environments." />
          <VisualTile icon={<MonitorDot />} title="Observability" body="Traces requests, latency, cost, errors, retrieval quality, and tool activity." />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ServerCog className="h-6 w-6 text-cyan" />
            <div className="font-semibold text-slate-950">Secure runtime policy</div>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">Route sensitive workloads through private endpoints, enforce tenant policies, monitor every request, and keep deployment history ready for operational review.</p>
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
