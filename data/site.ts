import {
  Bot,
  Building2,
  Cpu,
  DatabaseZap,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  Mail,
  MessageSquare,
  Network,
  PhoneCall,
  RadioTower,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TerminalSquare,
  Video,
  Workflow,
  Zap
} from "lucide-react";

export type VisualVariant =
  | "home"
  | "saas"
  | "infrastructure"
  | "platform"
  | "genai"
  | "telecom"
  | "enterprise"
  | "smb"
  | "government"
  | "voice"
  | "chat"
  | "video"
  | "email"
  | "os"
  | "coder"
  | "commerce"
  | "library"
  | "contact";

export type PageContent = {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  headline: string;
  subheadline: string;
  visual: VisualVariant;
  accentColor: string;
  iconName: keyof typeof icons;
  problem?: string;
  positioning?: string;
  capabilities: string[];
  modules?: string[];
  benefits: string[];
  workflows?: string[];
  architecture?: string[];
  integrations?: string[];
  outcomes?: string[];
  production?: {
    metrics: { label: string; value: string; detail: string }[];
    architecture: { title: string; description: string }[];
    pipeline: string[];
    controls: string[];
  };
  faq: { question: string; answer: string }[];
};

export const icons = {
  Bot,
  Building2,
  Cpu,
  DatabaseZap,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  Mail,
  MessageSquare,
  Network,
  PhoneCall,
  RadioTower,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TerminalSquare,
  Video,
  Workflow,
  Zap
};

export const productCards = [
  {
    title: "AI SaaS",
    href: "/products/ai-saas",
    description: "Ready-to-use AI applications for business teams that need automation live in weeks, not quarters.",
    iconName: "Sparkles" as const
  },
  {
    title: "AI Infrastructure",
    href: "/products/ai-infrastructure",
    description: "Secure model hosting, GPU orchestration, vector search, and deployment pipelines for AI workloads.",
    iconName: "Cpu" as const
  },
  {
    title: "AI Platform",
    href: "/products/ai-platform",
    description: "A control plane to design, deploy, monitor, and govern agentic systems across the enterprise.",
    iconName: "Layers3" as const
  },
  {
    title: "Gen AI",
    href: "/products/gen-ai",
    description: "Enterprise generative AI, RAG, document intelligence, copilots, and secure LLM deployment.",
    iconName: "Bot" as const
  }
];

export const solutionCards = [
  {
    title: "Telecommunication",
    href: "/solutions/telecommunication",
    description: "AI for network operations, field service, churn reduction, contact centers, and intelligent ticketing.",
    iconName: "RadioTower" as const
  },
  {
    title: "Large Enterprise",
    href: "/solutions/large-enterprise",
    description: "Governed AI adoption for global teams, sensitive data, internal copilots, and complex workflows.",
    iconName: "Building2" as const
  },
  {
    title: "Small Medium Business",
    href: "/solutions/small-medium-business",
    description: "Affordable automation for sales, service, marketing, and operations without heavy platform overhead.",
    iconName: "Workflow" as const
  },
  {
    title: "Government",
    href: "/solutions/government",
    description: "Secure citizen services, document automation, multilingual assistants, and policy operations.",
    iconName: "Landmark" as const
  }
];

export const useCaseCards = [
  ["Agentic Voice Bot", "/use-case/agentic-voice-bot", "PhoneCall", "Realtime voice agents for support, scheduling, reminders, qualification, and CRM writeback."],
  ["Agentic Chat Bot", "/use-case/agentic-chat-bot", "MessageSquare", "Grounded chat agents for web, app, WhatsApp, Slack, Teams, tickets, and lead capture."],
  ["Agent Video Bot", "/use-case/agent-video-bot", "Video", "Interactive video agents for demos, onboarding, training, product education, and analytics."],
  ["Agent Email Bot", "/use-case/agent-email-bot", "Mail", "Inbox agents for triage, reply drafting, approvals, follow-ups, shared queues, and SLA reporting."],
  ["Agentic Operating System", "/use-case/agentic-operating-system", "Network", "A central operating layer for agent registry, tools, memory, approvals, telemetry, and governance."],
  ["Agentic Coder", "/use-case/agentic-coder", "TerminalSquare", "Governed engineering agents for implementation, debugging, tests, documentation, and PR prep."],
  ["Agentic Commerce", "/use-case/agentic-commerce", "ShoppingCart", "Commerce agents for discovery, recommendations, cart recovery, order support, and lifecycle journeys."]
].map(([title, href, iconName, description]) => ({
  title,
  href,
  iconName: iconName as keyof typeof icons,
  description
}));

export const stats = [
  { value: "42%", label: "average reduction in manual workflow time" },
  { value: "99.9%", label: "target platform availability for enterprise deployments" },
  { value: "10x", label: "faster agent rollout with reusable orchestration modules" },
  { value: "24/7", label: "AI operations across channels, teams, and regions" }
];

export const testimonials = [
  {
    quote:
      "The platform gave our operations teams a governed way to deploy AI agents without losing control of data, workflows, or compliance.",
    name: "Maya Chen",
    role: "Chief Digital Officer, Global Services Group"
  },
  {
    quote:
      "We moved from pilot projects to measurable automation outcomes across support, knowledge search, and internal engineering workflows.",
    name: "Arun Malik",
    role: "VP Infrastructure, CloudScale Telecom"
  },
  {
    quote:
      "The security model and observability layer made it possible to bring legal, IT, and business leaders into the same deployment motion.",
    name: "Elena Brooks",
    role: "Head of Enterprise AI, Northstar Financial"
  }
];
