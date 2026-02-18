export type Article = {
  id: string;
  title: string;
  summary: string;
  sector: "Energy" | "Healthcare" | "Technology" | "Infrastructure" | "Finance";
  year: number;
  author: string;
  publishedAt: string;
  heroImage: string;
  tags: string[];
  body: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const articles: Article[] = [
  {
    id: "rural-solar-grid-2025",
    title: "How Rural Solar Grids Reduced Outages by 63%",
    summary:
      "A deep dive into distributed solar clusters and how district-level operators used predictive demand balancing.",
    sector: "Energy",
    year: 2025,
    author: "Jyothi Editorial Desk",
    publishedAt: "2025-03-15",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
    tags: ["solar", "rural", "policy", "grid"],
    body: [
      "Local utilities in three pilot districts adopted a cluster model where solar generation, battery storage, and demand smoothing are coordinated at the feeder level.",
      "The case team collected one-year telemetry from 112 villages and found that outage frequency fell significantly during peak afternoon loads.",
      "A notable factor was community-level demand planning. Operators sent weekly advisories and staggered irrigation loads, reducing stress on transformers.",
      "This report highlights implementation costs, subsidy structures, and practical recommendations for scaling to additional states.",
    ],
    seo: {
      title: "Rural Solar Grid Case Study (2025) | Jyothi News",
      description:
        "Read how rural solar micro-clusters cut outages by 63%, with data, implementation strategy, and policy insights.",
      keywords: ["rural solar", "grid modernization", "energy case study"],
    },
  },
  {
    id: "ai-triage-public-hospitals-2024",
    title: "AI Triage in Public Hospitals: 4-Month Rollout Results",
    summary:
      "Clinical workflow redesign with AI-assisted triage in high-volume outpatient departments.",
    sector: "Healthcare",
    year: 2024,
    author: "Meera S",
    publishedAt: "2024-11-04",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    tags: ["healthcare", "ai", "public sector", "triage"],
    body: [
      "Seven hospitals deployed an AI triage layer to prioritize emergency and chronic-care patients before physician consult.",
      "Queue time dropped by 22 minutes on average, while escalation quality improved due to structured symptom capture.",
      "Doctors reported higher confidence when the model output was paired with transparent confidence bands and override controls.",
      "The article covers governance design, bias checks, and staffing adaptations needed for long-term sustainability.",
    ],
    seo: {
      title: "AI Triage in Public Hospitals (2024) | Jyothi News",
      description:
        "See the outcomes of AI-assisted triage across seven public hospitals, including queue time and care quality improvements.",
      keywords: ["AI triage", "public hospitals", "healthcare transformation"],
    },
  },
  {
    id: "fintech-fraud-analytics-2023",
    title: "Fraud Analytics in Mid-Tier Fintechs: A Practical Blueprint",
    summary:
      "How layered anomaly detection and human review reduced chargeback risk in payment platforms.",
    sector: "Finance",
    year: 2023,
    author: "Arun Prakash",
    publishedAt: "2023-08-20",
    heroImage:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
    tags: ["fintech", "risk", "fraud", "analytics"],
    body: [
      "Payment startups face a difficult balance between conversion and fraud controls. Teams in this study introduced a two-stage detector architecture.",
      "Low-latency rules handled known patterns, while a nightly model retraining job captured evolving behaviors in account takeover attempts.",
      "The operations unit emphasized explainability dashboards so analysts could resolve disputes with traceable evidence.",
      "Chargeback ratio improved from 1.9% to 0.8% in six months without noticeable conversion loss.",
    ],
    seo: {
      title: "Fintech Fraud Analytics Blueprint (2023) | Jyothi News",
      description:
        "Explore a production fraud analytics strategy used by mid-tier fintechs to reduce chargebacks and risk exposure.",
      keywords: ["fintech fraud", "chargeback", "risk analytics"],
    },
  },
  {
    id: "smart-corridor-mobility-2025",
    title: "Smart Corridor Mobility: Traffic Delay Down 31%",
    summary:
      "A multi-city infrastructure initiative combining adaptive signals, bus-priority lanes, and incident response automation.",
    sector: "Infrastructure",
    year: 2025,
    author: "Naveen K",
    publishedAt: "2025-01-09",
    heroImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
    tags: ["mobility", "infrastructure", "transport", "smart city"],
    body: [
      "Traffic telemetry from three smart corridors shows that adaptive signal plans outperform fixed-cycle plans under volatile demand.",
      "Bus-priority windows were synchronized with depot dispatch, improving public transport reliability during peak hours.",
      "Automated incident routing lowered emergency response times by integrating CCTV events with city command centers.",
      "Stakeholders now evaluate expansion in peri-urban stretches where freight and commuter traffic overlap.",
    ],
    seo: {
      title: "Smart Corridor Mobility Case (2025) | Jyothi News",
      description:
        "Read the smart mobility case study showing 31% lower delays through adaptive traffic controls and bus-priority design.",
      keywords: ["smart corridor", "traffic optimization", "urban mobility"],
    },
  },
  {
    id: "cloud-native-core-banking-2024",
    title: "Cloud-Native Core Banking Migration: Lessons from Phase 1",
    summary:
      "Technology modernization playbook for banks moving from monolithic cores to modular event-driven platforms.",
    sector: "Technology",
    year: 2024,
    author: "Jyothi Tech Bureau",
    publishedAt: "2024-06-30",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    tags: ["banking", "cloud", "platform engineering", "technology"],
    body: [
      "A regional bank transitioned savings and payments workloads to a cloud-native backbone while keeping lending services on legacy systems.",
      "Event-driven boundaries reduced deployment risk and allowed teams to isolate high-change modules first.",
      "Observability standards were critical. Cross-team SLO dashboards made migration checkpoints auditable and actionable.",
      "The article details governance cadence, vendor strategy, and migration anti-patterns to avoid.",
    ],
    seo: {
      title: "Cloud-Native Core Banking Migration (2024) | Jyothi News",
      description:
        "Practical migration lessons for banks adopting cloud-native core systems with phased rollouts and resilient operations.",
      keywords: ["core banking", "cloud native", "banking modernization"],
    },
  },
];

export const allYears = Array.from(new Set(articles.map((article) => article.year))).sort(
  (a, b) => b - a,
);

export const allSectors = Array.from(new Set(articles.map((article) => article.sector))).sort();

export function getArticleById(id: string) {
  return articles.find((article) => article.id === id);
}

export function filterArticles(filters: {
  query?: string;
  year?: number;
  sector?: string;
}) {
  return articles.filter((article) => {
    const matchesYear = filters.year ? article.year === filters.year : true;
    const matchesSector = filters.sector ? article.sector === filters.sector : true;
    const normalizedQuery = filters.query?.trim().toLowerCase() ?? "";
    const matchesQuery = normalizedQuery
      ? [article.title, article.summary, article.author, article.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      : true;

    return matchesYear && matchesSector && matchesQuery;
  });
}
