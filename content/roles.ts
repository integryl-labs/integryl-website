export type Role = {
  title: string;
  /** One line on where the role sits in the institution. */
  stance: string;
  summary: string;
  responsibilities: string[];
};

/**
 * The two roles offered under Fractional Risk & Cybersecurity Leadership.
 * In both, Integryl is the senior expert behind whoever carries the role at
 * the institution: a dedicated officer, a named executive, or someone yet to
 * be chosen. A named officer role, examination
 * preparation and incident response are scoped separately.
 */
export const roles: Role[] = [
  {
    title: "Fractional Chief Information Security Officer",
    stance: "Senior security expertise behind whoever holds the role",
    summary:
      "Gives the person responsible for security senior counsel, a clear set of priorities and intelligence on the threats and vendors that matter to your institution.",
    responsibilities: [
      "A baseline of the security program and its priorities",
      "Monitoring of critical vendors, with alerts when one is affected",
      "Review of policies, vendor assessments and security decisions",
      "Quarterly priorities and a summary for senior leadership and the board",
    ],
  },
  {
    title: "Fractional Chief Technology & AI Risk Officer",
    stance: "The technology and AI risk expert behind your leadership team",
    summary:
      "Helps leadership decide how the institution adopts technology and artificial intelligence, and what it permits vendors, models and agents to do.",
    responsibilities: [
      "A baseline of technology and artificial intelligence risk",
      "Review of artificial intelligence use cases, vendors and platform decisions",
      "Governance, inventory and risk tiering for artificial intelligence",
      "Quarterly priorities and a summary for senior leadership and the board",
    ],
  },
];

export const FRACTIONAL_OFFER = "Fractional Risk & Cybersecurity Leadership";
