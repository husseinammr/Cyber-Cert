export type Level = "beginner" | "intermediate" | "advanced";
export type Category =
  | "red-team"
  | "blue-team"
  | "soc"
  | "dfir"
  | "pentest"
  | "appsec"
  | "cloud"
  | "network"
  | "grc"
  | "threat-hunting"
  | "malware"
  | "security-engineering";

export type ExamType = "multiple-choice" | "practical-exam" | "performance-based" | "open-book" | "project-based";
export type CostCategory = "free" | "free-course-paid-exam" | "paid";

export interface Certification {
  slug: string;
  name: string;
  provider: string;
  category: Category[];
  level: Level;
  costCategory: CostCategory;
  examType: ExamType;
  practical: "practical" | "theoretical" | "both";
  description: string;
  skills: string[];
  prerequisites: string[];
  whoShouldTake: string[];
  whoShouldNotTake: string[];
  prepRoadmap: string[];
  relatedCerts: string[];
  nextCerts: string[];
  officialUrl: string;
  trainingUrl?: string;
  /** Primary language(s) of instruction/materials, e.g. "English" or "Arabic". Optional — not all entries specify it. */
  language?: string;
}

export interface FreeResource {
  slug: string;
  name: string;
  provider: string;
  type: "free-cert" | "free-course" | "free-training" | "free-lab" | "free-badge" | "free-course-paid-exam";
  category: Category[];
  level: Level;
  description: string;
  url: string;
  /** Primary language(s) of instruction/materials, e.g. "English" or "Arabic". Optional — not all entries specify it. */
  language?: string;
}

export interface CareerPath {
  slug: string;
  name: string;
  summary: string;
  skills: string[];
  tools: string[];
  learningOrder: string[];
  labs: string[];
  certifications: string[]; // cert slugs
  progression: string[];
}

export interface RoadmapStep {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  why?: string;
  whyAr?: string;
  resources?: string[]; // certification slugs
}

// A "row" in the framework is either a single node (sequential) or an array of
// nodes rendered as parallel branches that later merge back into the trunk.
export type RoadmapRow = RoadmapStep | RoadmapStep[];

export interface Roadmap {
  slug: string;
  name: string;
  nameAr?: string;
  category: Category | "general";
  /** Legacy flat step list — still used for simple progress-tracking lookups. */
  steps: RoadmapStep[];
  /** New branching framework: an ordered list of rows, each single or parallel. */
  flow: RoadmapRow[];
}
