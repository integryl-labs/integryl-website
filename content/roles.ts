export type Role = {
  letter: string;
  title: string;
  owns: string;
  summary: string;
  responsibilities: string[];
};

/** The two roles offered under Fractional Risk & Cybersecurity Leadership. */
export const roles: Role[] = [
  {
    letter: "A",
    title: "Fractional Chief Information Security Officer",
    owns: "Owns the security program",
    summary:
      "Sets security strategy and is accountable for it to the executive team, the board and regulators.",
    responsibilities: [
      "Security strategy, roadmap and budget",
      "Oversight of testing, vulnerability management and incident response",
      "Regulatory and examination response",
      "Board and committee reporting",
    ],
  },
  {
    letter: "B",
    title: "Fractional Chief Technology & AI Risk Officer",
    owns: "Owns the technology and AI risk program",
    summary:
      "Governs how the institution adopts technology and artificial intelligence, and the authority it extends to vendors, models and agents.",
    responsibilities: [
      "Technology and AI risk framework",
      "Artificial intelligence governance, inventory and risk tiering",
      "Third-party, cloud and platform risk",
      "Board and committee reporting",
    ],
  },
];

export const FRACTIONAL_OFFER = "Fractional Risk & Cybersecurity Leadership";
