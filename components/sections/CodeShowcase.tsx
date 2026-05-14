import { ArrowUpRight } from "lucide-react";

const code = [
  "const agent = new AgentSession({",
  "  voice: 'enterprise-realtime',",
  "  llm: 'secure-model-router',",
  "  memory: workspaceMemory(),",
  "  tools: [crm, tickets, calendar],",
  "  guardrails: policyEngine(),",
  "});"
];

const cards = [
  ["Voice agent quickstart", "Build a production voice workflow with routing, memory, and telephony."],
  ["Agent starter apps", "Launch web, mobile, and internal interfaces for business teams."],
  ["Secure integrations", "Connect CRM, ticketing, data, and collaboration systems."],
  ["Deploy to cloud", "Run agents on autoscaling realtime infrastructure with observability."]
];

export function CodeShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050806]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
            <span className="h-3 w-3 rounded-full bg-cyan/80" />
          </div>
          <div className="text-xs text-slate-500">agent.ts</div>
        </div>
        <pre className="overflow-x-auto p-6 text-sm leading-8 text-slate-200">
          <code>
            {code.map((line, index) => (
              <span key={line} className="block">
                <span className="mr-5 select-none text-slate-600">{index + 1}</span>
                {line}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="grid gap-3">
        {cards.map(([title, description]) => (
          <div key={title} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan/35 hover:bg-cyan/8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-white">{title}</h3>
              <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan" />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
