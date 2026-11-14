export type Practice = {
  id: string;
  name: string;
  line: string;
  capabilities: string[];
  note?: string;
};

/**
 * The six practices, in the one order used everywhere on the site:
 * home grid, Advisory page and its jump links, footer and the Engage form.
 * Change the order here and nowhere else.
 */
export const practices: Practice[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    line: "Artificial intelligence adopted with confidence and control.",
    capabilities: [
      "Strategy and use-case prioritization",
      "Governance and policy",
      "Model and agent risk assessment",
      "Adoption and enablement",
    ],
    note: "We operate what we advise on. Integryl Intelligence is produced on an artificial intelligence pipeline of our own design, under human editorial control.",
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    line: "Technical depth, from penetration testing to security architecture.",
    capabilities: [
      "Penetration testing",
      "Adversary simulation",
      "Security architecture and identity",
      "Incident readiness",
    ],
  },
  {
    id: "data",
    name: "Data Risk",
    line: "Clarity on what data the institution holds, where it resides and who can reach it.",
    capabilities: [
      "Data governance and ownership",
      "Classification and protection",
      "Privacy",
      "Data risk in analytics and artificial intelligence",
    ],
  },
  {
    id: "technology",
    name: "Technology Risk",
    line: "Technology decisions made with a clear view of the risk they carry.",
    capabilities: [
      "Technology strategy and roadmaps",
      "Third-party and vendor risk",
      "Cloud and platform change",
      "Merger and acquisition diligence",
    ],
  },
  {
    id: "grc",
    name: "Governance, Risk & Compliance",
    line: "Risk and compliance programs that inform decisions and stand up to scrutiny.",
    capabilities: [
      "Enterprise and technology risk frameworks",
      "Policy and control design",
      "Regulatory readiness",
      "Board and committee reporting",
    ],
  },
  {
    id: "resilience",
    name: "Operational Resilience",
    line: "Critical services that continue to operate under stress.",
    capabilities: [
      "Critical service mapping",
      "Business continuity and recovery",
      "Crisis exercises",
      "Vendor concentration and exit planning",
    ],
  },
];
