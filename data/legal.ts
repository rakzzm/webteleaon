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
        title: "1. Who We Are and Scope",
        body: [
          `${companyName} is the operator of this website and Teleaon AI services. Our registered business address is ${companyAddress}.`,
          "This Privacy Policy applies to our public website, demo requests, contact forms, sales interactions, product trials, hosted AI agent services, support conversations, events, newsletters, documentation portals, and related business communications.",
          "If you use Teleaon AI through an employer, customer organization, reseller, systems integrator, or enterprise agreement, additional contractual privacy and data processing terms may apply. Where those documents conflict with this website policy, the signed agreement controls for that customer deployment."
        ]
      },
      {
        title: "2. Categories of Information We Collect",
        body: [
          "We may collect business contact details such as name, work email, phone number, company, job title, department, country, and communication preferences.",
          "We may collect enquiry and relationship data such as demo requests, sales notes, procurement details, use-case requirements, requested integrations, support tickets, workshop participation, webinar registration, and account communications.",
          "We may collect technical and usage data such as IP address, browser type, device identifiers, pages viewed, referring URLs, timestamps, product events, logs, diagnostics, error reports, authentication events, performance metrics, and security telemetry.",
          "When you use AI agent features, we may process prompts, messages, chat history, audio, voice recordings, transcripts, uploaded files, images, document text, workflow instructions, tool outputs, integration metadata, and generated responses needed to deliver the requested service."
        ]
      },
      {
        title: "3. How We Use Information",
        body: [
          "We use information to provide, operate, secure, maintain, and improve our website, AI services, demos, pilots, customer environments, integrations, support workflows, billing administration, and business communications.",
          "We use information to respond to enquiries, qualify use cases, schedule meetings, prepare architecture recommendations, deliver demos, provide onboarding, troubleshoot issues, monitor service health, investigate incidents, and send service-related notices.",
          "We may use technical data, telemetry, aggregated information, and de-identified information to improve reliability, security, model orchestration, latency, product analytics, user experience, capacity planning, abuse detection, and roadmap decisions.",
          "We may use business contact and preference information to send relevant product updates, event invitations, research, implementation resources, and commercial communications where permitted by applicable law."
        ]
      },
      {
        title: "4. AI Data Handling and Customer Content",
        body: [
          "Customer content used by AI workflows is processed to generate responses, automate tasks, route requests, call tools, update connected systems, create transcripts, summarize interactions, support handoffs, and provide observability or audit records.",
          "AI outputs may be generated using configured models, retrieval systems, memory layers, business rules, and customer-approved tools. Customers are responsible for deciding what data is connected, what actions an agent may perform, and when human approval is required.",
          "Enterprise customers may configure data retention, access control, encryption options, environment boundaries, integration scopes, review workflows, redaction patterns, logging levels, and deployment requirements based on their operating model.",
          "Unless a customer agreement states otherwise, Teleaon AI does not use customer content from enterprise deployments to train third-party foundation models. Some subprocessors may process inputs and outputs to provide hosted model, infrastructure, monitoring, or support services under applicable contractual safeguards."
        ]
      },
      {
        title: "5. Cookies, Analytics, and Tracking",
        body: [
          "Our website may use cookies, pixels, local storage, analytics tools, and similar technologies to keep the site working, measure performance, understand visitor behavior, remember preferences, improve content, and evaluate campaign effectiveness.",
          "You can control cookies through your browser settings. Some features may not work correctly if certain cookies or storage technologies are disabled.",
          "Where legally required, we will request consent before using non-essential cookies or similar technologies."
        ]
      },
      {
        title: "6. Sharing and Service Providers",
        body: [
          "We may share information with trusted service providers that support hosting, cloud infrastructure, analytics, communications, CRM, payments, billing, security, authentication, AI processing, speech processing, monitoring, customer support, and professional services.",
          "We may share information with customer-approved integrations, implementation partners, resellers, advisors, auditors, legal counsel, payment processors, and government or law enforcement bodies where required by law or necessary to protect rights, safety, and security.",
          "We do not sell personal data. Where required, vendors are expected to process information under appropriate confidentiality, security, and data protection commitments."
        ]
      },
      {
        title: "7. International Transfers",
        body: [
          "Teleaon AI may process information in Malaysia and in other countries where we, our affiliates, infrastructure providers, or service providers operate.",
          "Where applicable, we use contractual, technical, and organizational safeguards designed to protect information transferred across borders."
        ]
      },
      {
        title: "8. Security and Retention",
        body: [
          "We use technical and organizational safeguards designed to protect information from unauthorized access, misuse, loss, alteration, and disclosure. Safeguards may include access controls, encryption, monitoring, segmentation, logging, secure development practices, incident response procedures, and vendor review.",
          "No system is completely secure. Customers should configure access controls, user roles, agent permissions, integration scopes, and approval workflows appropriate to the sensitivity of their data and use case.",
          "We retain information for as long as needed to provide services, comply with legal obligations, resolve disputes, enforce agreements, maintain security, prevent abuse, and support business operations. Retention periods may vary by data type, customer configuration, legal requirement, and contract."
        ]
      },
      {
        title: "9. Your Rights and Choices",
        body: [
          "Depending on applicable law, you may request access, correction, deletion, restriction, portability, objection, or withdrawal of consent for certain personal data processing.",
          "You may unsubscribe from marketing communications using the unsubscribe link in our emails or by contacting us. Service, security, billing, and account communications may still be sent where necessary.",
          "To submit a request, contact info@teleaon.ai with enough information for us to verify and respond to your request. If your data is controlled by an enterprise customer, we may refer your request to that customer."
        ]
      },
      {
        title: "10. Children, Updates, and Contact",
        body: [
          "Teleaon AI services are intended for business and enterprise use and are not directed to children.",
          "We may update this Privacy Policy from time to time. The updated version will be posted on this website with a revised effective date.",
          "For privacy questions, data protection requests, or security concerns, contact info@teleaon.ai."
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
        title: "1. General Refund Principles",
        body: [
          "Teleaon AI provides software, AI infrastructure, pilots, implementation support, and professional services for business customers. Refund eligibility depends on the type of purchase, the applicable order form, the stage of delivery, usage, and any signed agreement.",
          "Unless a written agreement states otherwise, fees are charged in advance and are non-refundable once a subscription period, pilot, implementation phase, reserved capacity period, or professional services engagement has started.",
          "This Refund Policy does not limit any rights that cannot be excluded under applicable law."
        ]
      },
      {
        title: "2. Subscription Plans",
        body: [
          "Unless a separate written agreement states otherwise, paid subscription fees are billed in advance and are generally non-refundable once the billing period begins.",
          "Subscription cancellations normally take effect at the end of the current billing period. Access may continue until the end of the paid term unless the account is terminated for breach, misuse, security risk, or non-payment.",
          "If you believe you were charged in error, contact info@teleaon.ai within 7 days of the charge so our team can review the issue."
        ]
      },
      {
        title: "3. Usage, Compute, and Third-Party Costs",
        body: [
          "Usage-based charges, model usage, voice or speech processing, GPU or compute consumption, storage, data transfer, message volume, integration calls, and other metered services are generally non-refundable once consumed.",
          "If Teleaon AI incurs third-party costs on your behalf, those costs may be deducted from any approved refund, credit, or cancellation adjustment.",
          "Enterprise customers should monitor usage, configure limits, and request assistance if unexpected usage patterns appear."
        ]
      },
      {
        title: "4. Pilot Programs and Proofs of Concept",
        body: [
          "Pilot fees, setup fees, and proof-of-concept fees are used to reserve technical resources, solution architecture time, deployment support, infrastructure capacity, and customer-specific planning.",
          "Refund eligibility for pilot programs depends on the signed proposal, statement of work, or enterprise order form.",
          "If a pilot is delayed because required customer systems, data access, approvals, credentials, or stakeholder availability are not provided, fees may remain payable even if timelines shift."
        ]
      },
      {
        title: "5. Professional Services",
        body: [
          "Implementation, integration, training, consulting, migration, architecture, security review, workflow design, model evaluation, and custom development services are normally non-refundable once work has started.",
          "If a service is cancelled before work begins, Teleaon AI may review whether a partial refund or credit is appropriate after deducting committed third-party, planning, procurement, staffing, and administrative costs.",
          "Professional services deliverables may be accepted, revised, or closed according to the applicable statement of work. Delays caused by incomplete feedback, unavailable stakeholders, or customer-controlled blockers do not automatically create refund eligibility."
        ]
      },
      {
        title: "6. Service Credits",
        body: [
          "Where appropriate, Teleaon AI may offer service credits instead of cash refunds. Service credits may be applied to future usage, support, subscription charges, additional implementation time, or other approved services.",
          "Any service credit is subject to written confirmation from Teleaon AI, may have an expiration date, may not be transferable, and may not be redeemable for cash unless required by law.",
          "Service credits may be the exclusive remedy for certain service-level or availability commitments if stated in the applicable agreement."
        ]
      },
      {
        title: "7. Exclusions",
        body: [
          "Refunds are generally not available for accounts terminated due to breach, misuse, fraud, prohibited content, non-payment, unauthorized access attempts, violation of acceptable use requirements, or actions that create security, legal, or operational risk.",
          "Refunds are generally not available for dissatisfaction caused by customer configuration choices, third-party outages, customer-controlled integrations, unsupported use cases, rejected approvals, or AI outputs that require human review.",
          "Discounts, promotional offers, special pricing, and bundled packages may have additional refund limitations."
        ]
      },
      {
        title: "8. How to Request a Refund Review",
        body: [
          "To request a refund review, contact info@teleaon.ai and include your company name, billing contact, invoice or order reference, service type, date of charge, reason for the request, and any supporting documentation.",
          "We may ask for additional information to verify the account, evaluate usage, review delivery status, and determine whether a refund, credit, correction, or alternative resolution is appropriate.",
          "Approved refunds are normally returned to the original payment method where practical. Processing times depend on payment providers and banks."
        ]
      },
      {
        title: "9. Enterprise Agreements",
        body: [
          "Enterprise refund, termination, suspension, renewal, usage, service credit, and cancellation terms are governed by the applicable master services agreement, order form, statement of work, or proposal.",
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
        title: "1. Company and Acceptance",
        body: [
          `These terms are provided by ${companyName}, located at ${companyAddress}.`,
          "By using our website or services, you agree to these terms. If you are using the services on behalf of an organization, you represent that you have authority to bind that organization.",
          "Additional terms may apply to subscriptions, pilots, enterprise agreements, statements of work, product documentation, acceptable use policies, data processing terms, service-level commitments, and order forms."
        ]
      },
      {
        title: "2. Accounts, Access, and Security",
        body: [
          "You are responsible for maintaining the confidentiality of account credentials, API keys, tokens, identity provider settings, integration credentials, and user permissions.",
          "You must promptly notify Teleaon AI if you suspect unauthorized access, credential compromise, security incidents, or misuse of the services.",
          "Teleaon AI may suspend or restrict access where necessary to protect the platform, customers, users, connected systems, or legal compliance."
        ]
      },
      {
        title: "3. Use of Services",
        body: [
          "You may use Teleaon AI services only for lawful business purposes and in accordance with applicable documentation, usage limits, security requirements, and agreed commercial terms.",
          "You must not misuse the services, attempt unauthorized access, interfere with platform operations, probe or bypass security controls, reverse engineer restricted components, overload systems, scrape protected areas, or use the services to create harmful, unlawful, deceptive, abusive, infringing, or discriminatory content.",
          "You must not use the services to make decisions or take actions that require professional judgment without appropriate human review, approval, and compliance controls."
        ]
      },
      {
        title: "4. Customer Data and Responsibilities",
        body: [
          "You are responsible for the data, prompts, files, integrations, credentials, and instructions you provide to Teleaon AI services.",
          "You must ensure you have the required rights, permissions, notices, and consents to process any personal data, audio, files, images, recordings, customer communications, internal records, or third-party content through the services.",
          "You are responsible for configuring access controls, retention settings, approval workflows, knowledge sources, agent permissions, integration scopes, and user roles appropriate to your organization and use case."
        ]
      },
      {
        title: "5. AI Outputs and Automated Actions",
        body: [
          "AI outputs may be probabilistic and should be reviewed where accuracy, legal, financial, medical, safety, compliance, or customer-impacting decisions matter.",
          "Teleaon AI may provide controls for human review, escalation, evaluation, citations, guardrails, audit logs, and governance, but customers are responsible for configuring these controls appropriately for their use case.",
          "You are responsible for decisions made using AI outputs, including whether outputs are published, sent to customers, used in business workflows, written to connected systems, or relied upon by your personnel.",
          "You should not represent AI-generated outputs as reviewed, verified, or approved unless appropriate human or automated validation has occurred."
        ]
      },
      {
        title: "6. Integrations and Third-Party Services",
        body: [
          "The services may connect with third-party platforms, model providers, cloud services, telephony providers, CRMs, ticketing systems, calendars, messaging tools, payment systems, analytics products, and customer-controlled APIs.",
          "Third-party services are governed by their own terms, privacy notices, security models, uptime commitments, and pricing. Teleaon AI is not responsible for third-party services outside our control.",
          "You authorize Teleaon AI to access, transmit, process, and exchange data with connected systems as necessary to provide the configured services."
        ]
      },
      {
        title: "7. Intellectual Property",
        body: [
          "Teleaon AI owns its platform, software, models where applicable, orchestration layer, designs, documentation, workflows, templates, infrastructure patterns, trademarks, branding, and related intellectual property.",
          "Customers retain ownership of their customer data, subject to rights needed for Teleaon AI to provide, secure, support, operate, troubleshoot, and improve the services as permitted by agreement and law.",
          "Feedback, suggestions, and improvement ideas may be used by Teleaon AI without restriction or obligation, provided we do not disclose confidential customer information in violation of applicable commitments."
        ]
      },
      {
        title: "8. Confidentiality and Publicity",
        body: [
          "Confidential information exchanged under a signed agreement will be handled according to that agreement. Website enquiries and general business communications should not include highly sensitive information unless appropriate confidentiality terms are in place.",
          "Teleaon AI will not use customer names, logos, testimonials, or case studies in public marketing without permission or applicable contractual rights."
        ]
      },
      {
        title: "9. Fees, Taxes, and Payment",
        body: [
          "Fees, payment terms, taxes, renewals, overages, usage limits, and billing schedules are governed by the applicable order form, pricing page, invoice, or written agreement.",
          "Late payments may result in suspension, restricted access, collection activity, or termination where permitted by the applicable agreement and law.",
          "You are responsible for taxes, duties, withholding, bank charges, and similar governmental charges except taxes based on Teleaon AI's income."
        ]
      },
      {
        title: "10. Disclaimers and Liability",
        body: [
          "Services are provided subject to applicable agreements and may depend on third-party providers, model platforms, networks, and customer-controlled integrations.",
          "Teleaon AI does not warrant that AI outputs will be error-free, complete, current, suitable for every use case, or free from hallucinations. Customers should use appropriate review, testing, monitoring, and approval processes.",
          "To the maximum extent permitted by law, Teleaon AI is not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, loss of profits, loss of revenue, loss of data, business interruption, or procurement of substitute services unless a signed agreement states otherwise."
        ]
      },
      {
        title: "11. Termination",
        body: [
          "Teleaon AI may suspend or terminate access where necessary for non-payment, security risk, legal compliance, platform protection, misuse, or breach of these terms or an applicable agreement.",
          "Upon termination, access to services may end and customer data may be exported, retained, or deleted according to the applicable agreement, product functionality, retention settings, and legal requirements."
        ]
      },
      {
        title: "12. Governing Terms, Changes, and Contact",
        body: [
          "We may update these terms from time to time. The latest version will be posted on this website with an updated effective date.",
          "Continued use of the website or services after changes become effective means you accept the updated terms.",
          "Questions about these terms may be sent to info@teleaon.ai."
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
        title: "1. Marketing Communications",
        body: [
          "We may send product updates, research, event invitations, implementation resources, and commercial communications to people who request information, subscribe, attend an event, or engage with Teleaon AI.",
          "Marketing messages are intended for business audiences evaluating enterprise AI systems, infrastructure, automation, agentic workflows, governance, and AI transformation programs.",
          "Marketing communications may include newsletters, product announcements, release notes, customer stories, webinars, research summaries, event invitations, surveys, educational content, and relevant sales follow-up."
        ]
      },
      {
        title: "2. How We Build Communication Lists",
        body: [
          "We may receive contact information directly from you when you submit a form, request a demo, subscribe, register for an event, download content, speak with our team, or communicate with us by email or phone.",
          "We may also receive business contact information from conferences, partner referrals, customer introductions, public business sources, professional networks, or service providers that support sales and marketing operations.",
          "We aim to send communications that are relevant to business roles and organizational interests, not consumer profiling."
        ]
      },
      {
        title: "3. Preference Management and Unsubscribe",
        body: [
          "You can unsubscribe from marketing emails using the unsubscribe link included in our communications or by contacting info@teleaon.ai.",
          "You may ask us to update your contact details, change the topics you receive, reduce communication frequency, or stop sales follow-up.",
          "Operational messages, security notices, account updates, billing communications, contract notices, incident communications, and service-related notifications may still be sent where necessary."
        ]
      },
      {
        title: "4. Events, Webinars, and Workshops",
        body: [
          "If you register for an event, webinar, workshop, or demo, we may use your information to confirm attendance, send reminders, share related materials, and follow up with relevant content.",
          "We may use participation information such as registration status, attendance, questions asked, poll responses, session feedback, and requested follow-ups to improve future events and tailor relevant communications.",
          "Event partners or platforms may process registration information according to their own terms and privacy notices."
        ]
      },
      {
        title: "5. Sales Follow-Up and Account Development",
        body: [
          "When you request a demo, pricing, technical consultation, or product information, Teleaon AI may contact you to understand your requirements and recommend suitable next steps.",
          "Sales follow-up may include discovery questions, solution recommendations, technical architecture discussions, proposal preparation, pilot planning, procurement support, and implementation scoping.",
          "You can ask us to stop sales follow-up at any time by contacting info@teleaon.ai."
        ]
      },
      {
        title: "6. Analytics, Personalization, and Advertising",
        body: [
          "We may use website analytics, campaign analytics, CRM activity, email engagement, event participation, and content interest signals to understand which topics are useful and to improve communications.",
          "Where permitted, we may use advertising platforms or retargeting tools to reach business audiences with relevant Teleaon AI content. You can manage cookies and ad preferences through your browser, device, or platform settings.",
          "We do not intend to use marketing analytics to make decisions that produce legal or similarly significant effects about individuals."
        ]
      },
      {
        title: "7. Brand and Content Use",
        body: [
          "Teleaon AI marketing materials, website content, product names, visuals, and brand assets may not be copied, modified, or used in a misleading way without permission.",
          "Customer names, logos, case studies, quotes, screenshots, metrics, or testimonials are used only where approved or permitted by agreement.",
          "Partners, resellers, event organizers, media contacts, and community members should follow Teleaon AI brand guidelines and avoid implying sponsorship, endorsement, or partnership without written permission."
        ]
      },
      {
        title: "8. Contacting Us",
        body: [
          "For marketing preferences, unsubscribe requests, brand permission questions, event follow-up, or communication concerns, contact info@teleaon.ai.",
          "We may need reasonable time to process preference changes across systems, campaign tools, event platforms, and partner workflows."
        ]
      }
    ]
  }
];

export const legalLinks = legalPages.map((page) => ({
  title: page.title,
  href: `/${page.slug}`
}));
