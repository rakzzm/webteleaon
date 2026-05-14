export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: {
    title: string;
    body: string[];
  }[];
};

const companyName = "TELEAON AI SDN BHD (202501027023 - 1628435-V)";
const companyAddress = "BO1-A-09, Menara 2, KL Eco City, 3, Jalan Bangsar, 59200 Kuala Lumpur, W.P. Kuala Lumpur, Malaysia";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Teleaon AI collects, uses, protects, and manages personal data across our website, products, and services.",
    updated: "14 May 2026",
    intro:
      "This Privacy Policy explains how Teleaon AI handles personal data when you visit our website, contact our team, request a demo, use our AI products, or interact with our services.",
    sections: [
      {
        title: "Who We Are",
        body: [
          `${companyName} is the operator of this website and Teleaon AI services. Our registered business address is ${companyAddress}.`,
          "You can contact us at hello@teleaon.ai for privacy, data protection, or account-related questions."
        ]
      },
      {
        title: "Information We Collect",
        body: [
          "We may collect contact details, company information, role information, enquiry details, product usage information, support requests, technical logs, device data, and communication preferences.",
          "When you use AI agent features, we may process prompts, messages, audio, transcripts, files, metadata, and workflow outputs needed to deliver the requested service."
        ]
      },
      {
        title: "How We Use Information",
        body: [
          "We use information to provide and improve our website, respond to enquiries, deliver demos, operate AI agent services, manage customer accounts, process support requests, protect systems, and communicate product updates.",
          "We may also use aggregated or de-identified information to improve reliability, security, performance, analytics, and product planning."
        ]
      },
      {
        title: "AI Data Handling",
        body: [
          "Customer data used by AI workflows is processed to generate responses, automate tasks, route requests, update connected systems, and provide observability or audit records.",
          "Enterprise customers may configure data retention, access control, integrations, review workflows, and deployment requirements based on their operating model."
        ]
      },
      {
        title: "Sharing and Service Providers",
        body: [
          "We may share information with trusted service providers that support hosting, analytics, communications, payments, security, AI processing, and customer support.",
          "We do not sell personal data. Where required, vendors are expected to process information under appropriate confidentiality, security, and data protection commitments."
        ]
      },
      {
        title: "Security and Retention",
        body: [
          "We use technical and organizational safeguards designed to protect information from unauthorized access, misuse, loss, and disclosure.",
          "We retain information for as long as needed to provide services, comply with legal obligations, resolve disputes, maintain security, and support business operations."
        ]
      },
      {
        title: "Your Rights",
        body: [
          "Depending on applicable law, you may request access, correction, deletion, restriction, portability, objection, or withdrawal of consent for certain personal data processing.",
          "To submit a request, contact hello@teleaon.ai with enough information for us to verify and respond to your request."
        ]
      }
    ]
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Teleaon AI refund terms for subscriptions, pilots, professional services, and enterprise agreements.",
    updated: "14 May 2026",
    intro:
      "This Refund Policy explains how refund requests are reviewed for Teleaon AI subscriptions, pilot programs, implementation services, and enterprise agreements.",
    sections: [
      {
        title: "Subscription Plans",
        body: [
          "Unless a separate written agreement states otherwise, paid subscription fees are billed in advance and are generally non-refundable once the billing period begins.",
          "If you believe you were charged in error, contact hello@teleaon.ai within 7 days of the charge so our team can review the issue."
        ]
      },
      {
        title: "Pilot Programs and Proofs of Concept",
        body: [
          "Pilot fees, setup fees, and proof-of-concept fees are used to reserve technical resources, solution architecture time, and deployment support.",
          "Refund eligibility for pilot programs depends on the signed proposal, statement of work, or enterprise order form."
        ]
      },
      {
        title: "Professional Services",
        body: [
          "Implementation, integration, training, consulting, and custom development services are normally non-refundable once work has started.",
          "If a service is cancelled before work begins, Teleaon AI may review whether a partial refund or credit is appropriate after deducting committed third-party or planning costs."
        ]
      },
      {
        title: "Service Credits",
        body: [
          "Where appropriate, Teleaon AI may offer service credits instead of cash refunds. Service credits may be applied to future usage, support, or subscription charges.",
          "Any service credit is subject to written confirmation from Teleaon AI and may not be transferable."
        ]
      },
      {
        title: "Enterprise Agreements",
        body: [
          "Enterprise refund, termination, and credit terms are governed by the applicable master services agreement, order form, or statement of work.",
          "If those documents conflict with this Refund Policy, the signed agreement controls."
        ]
      }
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "Terms governing access to Teleaon AI websites, products, services, demos, and related materials.",
    updated: "14 May 2026",
    intro:
      "These Terms & Conditions govern your access to and use of Teleaon AI websites, products, demos, software, content, and services.",
    sections: [
      {
        title: "Company and Acceptance",
        body: [
          `These terms are provided by ${companyName}, located at ${companyAddress}.`,
          "By using our website or services, you agree to these terms. If you are using the services on behalf of an organization, you represent that you have authority to bind that organization."
        ]
      },
      {
        title: "Use of Services",
        body: [
          "You may use Teleaon AI services only for lawful business purposes and in accordance with applicable documentation, usage limits, security requirements, and agreed commercial terms.",
          "You must not misuse the services, attempt unauthorized access, interfere with platform operations, reverse engineer restricted components, or use the services to create harmful, unlawful, or abusive content."
        ]
      },
      {
        title: "Customer Data and Responsibilities",
        body: [
          "You are responsible for the data, prompts, files, integrations, credentials, and instructions you provide to Teleaon AI services.",
          "You must ensure you have the required rights, permissions, notices, and consents to process any personal data or third-party content through the services."
        ]
      },
      {
        title: "AI Outputs",
        body: [
          "AI outputs may be probabilistic and should be reviewed where accuracy, legal, financial, medical, safety, compliance, or customer-impacting decisions matter.",
          "Teleaon AI may provide controls for human review, escalation, evaluation, and governance, but customers are responsible for configuring these controls appropriately for their use case."
        ]
      },
      {
        title: "Intellectual Property",
        body: [
          "Teleaon AI owns its platform, software, designs, documentation, trademarks, and related intellectual property.",
          "Customers retain ownership of their customer data, subject to rights needed for Teleaon AI to provide, secure, support, and improve the services as permitted by agreement and law."
        ]
      },
      {
        title: "Disclaimers and Liability",
        body: [
          "Services are provided subject to applicable agreements and may depend on third-party providers, model platforms, networks, and customer-controlled integrations.",
          "To the maximum extent permitted by law, Teleaon AI is not liable for indirect, incidental, special, consequential, or punitive damages unless a signed agreement states otherwise."
        ]
      },
      {
        title: "Changes",
        body: [
          "We may update these terms from time to time. The latest version will be posted on this website with an updated effective date.",
          "Continued use of the website or services after changes become effective means you accept the updated terms."
        ]
      }
    ]
  },
  {
    slug: "marketing",
    title: "Marketing & Communications",
    description: "How Teleaon AI manages marketing communications, newsletter subscriptions, events, and contact preferences.",
    updated: "14 May 2026",
    intro:
      "This page explains how Teleaon AI manages marketing communications, newsletter subscriptions, event invitations, product updates, and preference requests.",
    sections: [
      {
        title: "Marketing Communications",
        body: [
          "We may send product updates, research, event invitations, implementation resources, and commercial communications to people who request information, subscribe, attend an event, or engage with Teleaon AI.",
          "Marketing messages are intended for business audiences evaluating enterprise AI systems, infrastructure, automation, and agentic workflows."
        ]
      },
      {
        title: "Preference Management",
        body: [
          "You can unsubscribe from marketing emails using the unsubscribe link included in our communications or by contacting hello@teleaon.ai.",
          "Operational messages, security notices, account updates, billing communications, and service-related notifications may still be sent where necessary."
        ]
      },
      {
        title: "Events and Webinars",
        body: [
          "If you register for an event, webinar, workshop, or demo, we may use your information to confirm attendance, send reminders, share related materials, and follow up with relevant content.",
          "Event partners or platforms may process registration information according to their own terms and privacy notices."
        ]
      },
      {
        title: "Sales Follow-Up",
        body: [
          "When you request a demo, pricing, technical consultation, or product information, Teleaon AI may contact you to understand your requirements and recommend suitable next steps.",
          "You can ask us to stop sales follow-up at any time by contacting hello@teleaon.ai."
        ]
      },
      {
        title: "Brand and Content Use",
        body: [
          "Teleaon AI marketing materials, website content, product names, visuals, and brand assets may not be copied, modified, or used in a misleading way without permission.",
          "Customer names, logos, case studies, or testimonials are used only where approved or permitted by agreement."
        ]
      }
    ]
  }
];

export const legalLinks = legalPages.map((page) => ({
  title: page.title,
  href: `/${page.slug}`
}));
