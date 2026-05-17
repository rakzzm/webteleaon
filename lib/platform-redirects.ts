export const platformRedirects = {
  contactCenter: process.env.NEXT_PUBLIC_CONTACT_CENTER_PLATFORM_URL || "/solutions/telecommunication",
  contactCenterAdmin: process.env.NEXT_PUBLIC_CONTACT_CENTER_ADMIN_URL || "https://teleaon.ai/demo/service-provider/login",
  contactCenterTenant: process.env.NEXT_PUBLIC_CONTACT_CENTER_TENANT_URL || "https://teleaon.ai/demo/tenant/login",
  healthcare: process.env.NEXT_PUBLIC_HEALTHCARE_PLATFORM_URL || "/solutions/large-enterprise",
  genAi: process.env.NEXT_PUBLIC_GEN_AI_PLATFORM_URL || "/products/gen-ai",
  agenticVoice: process.env.NEXT_PUBLIC_AGENTIC_VOICE_PLATFORM_URL || "/use-case/agentic-voice-bot",
  agenticChat: process.env.NEXT_PUBLIC_AGENTIC_CHAT_PLATFORM_URL || "/use-case/agentic-chat-bot",
  campaignManager: process.env.NEXT_PUBLIC_AGENTIC_CAMPAIGN_MANAGER_URL || "/marketing"
} as const;
