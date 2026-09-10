/* ================================================================
   SITE CONTENT MODEL — broadarks.com

   Single source of truth for entity facts, navigation and the
   division register. Pages import from here so a change to a phone
   number or a division name lands everywhere at once.

   SOURCE OF TRUTH: "BroadArks Technology Pvt Ltd.pdf" (institutional
   profile, latest) — cross-checked against the July copy doc. Where
   the two disagree (division names, address), the PDF wins.

   ENTITY BOUNDARY (non-negotiable, from the revamp brief):
     · broadarks.com uses info@broadarks.com only.
     · BroadArks Foundation registration numbers (12A, 80G, CSR-1)
       and info@broadarksfoundation.org must NEVER appear on this
       site. Link to broadarksfoundation.org instead.
     · Commercial/service copy belongs on yandnow.com, not here.
       This is the parent site: it explains and routes, it does not
       sell programmes.
   ================================================================ */

export const ORG = {
  legalName: "BroadArks Technology Pvt. Ltd.",
  shortName: "BroadArks",
  tagline: "Innovation & Beyond",
  founded: "2020",
  email: "info@broadarks.com",
  phone: "+91 75535 53372",
  phoneHref: "tel:+917553553372",
  iso: "ISO 9001:2015",
  /** [INSERT — Legal/Compliance] */
  isoCertificate: null as string | null,
  /** [INSERT — Legal/Compliance] */
  cin: null as string | null,
  address: {
    line1: "CP-02, 7th Floor, Block C-1, Sagar Premium Towers",
    line2: "J.K. Hospital Road, Kolar Road",
    city: "Bhopal",
    postalCode: "462042",
    state: "Madhya Pradesh",
    country: "India",
  },
  addressOneLine:
    "CP-02, 7th Floor, Block C-1, Sagar Premium Towers, J.K. Hospital Road, Kolar Road, Bhopal – 462042, Madhya Pradesh, India",
} as const;

/* ----------------------------------------------------------------
   PURPOSE · MISSION · VISION — verbatim from the institutional
   profile. Purpose is new; do not collapse it into mission.
   ---------------------------------------------------------------- */
export const PMV = {
  purpose:
    "To create measurable, lasting improvements in quality of life by advancing education, health, employability and livelihood opportunities.",
  mission:
    "To close skill and opportunity gaps through accountable, inclusive and technology-enabled programmes that move people from learning to sustainable livelihoods.",
  vision:
    "An India where every individual can access the skills, support and opportunities needed for a productive, dignified livelihood — and where institutions and enterprises have the capabilities to grow responsibly.",
} as const;

/* One line the profile leads with. Used as a refrain, not a slogan. */
export const ONE_LINE =
  "One organisation. Four specialist capabilities. One accountable delivery framework.";

/* ----------------------------------------------------------------
   NAVIGATION — five items, all top-level. Nothing nests deeper
   than /segment; former child pages are anchored sections.
   ---------------------------------------------------------------- */
export const NAV: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Our Divisions", href: "/divisions" },
  { label: "Our Approach", href: "/approach" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/* ----------------------------------------------------------------
   DIVISIONS
   ---------------------------------------------------------------- */
export interface Division {
  slug: string;
  index: string;
  name: string;
  /** Institutional-profile mandate, e.g. "Workforce & Employability". */
  mandate: string;
  domain: string | null;
  url: string | null;
  tagline: string;
  summary: string;
  /** Longer copy for the division section on /divisions. */
  detail: string[];
  /** What the division actually covers, from the profile. */
  scope: string[];
  audience: string[];
  proof?: string[];
  image: string;
  /** "live" = has its own site. "emerging" = operating capability, site to come. */
  status: "live" | "emerging";
}

export const DIVISIONS: Division[] = [
  {
    slug: "yandnow",
    index: "01",
    name: "Y&Now",
    mandate: "Workforce & Employability",
    domain: "yandnow.com",
    url: "https://yandnow.com",
    tagline: "Skills training for companies, CSR, defence and schools",
    summary:
      "Job-aligned training programmes, plus a platform that handles the learning, the testing and the performance tracking in one place.",
    detail: [
      "Y&Now builds human capability across the group. It runs skills training for companies, CSR sponsors, government bodies, defence establishments and schools.",
      "It also runs its own platform, which combines the courses, the assessments and the performance tracking — so training is tied to how people actually do the job.",
    ],
    scope: [
      "Skill-gap analysis",
      "Curriculum and content",
      "Classroom and blended learning",
      "Assessment and job-readiness",
      "Hire-Train-Deploy and placements",
      "Upskilling and microenterprise enablement",
    ],
    audience: ["Company L&D and HR heads", "CSR managers", "Defence welfare bodies", "Schools"],
    proof: [
      "Tata Group",
      "JSW",
      "Castrol India",
      "BPCL",
      "Jaquar",
      "Indian Army",
      "Indian Oil",
      "Boeing",
      "NSDC",
    ],
    image: "/images/divisions/yandnow.jpg",
    status: "live",
  },
  {
    slug: "foundation",
    index: "02",
    name: "BroadArks Foundation",
    mandate: "Social Impact",
    domain: "broadarksfoundation.org",
    url: "https://broadarksfoundation.org",
    tagline: "A CSR partner for communities and institutions",
    summary:
      "A separately registered nonprofit, established in 2014, running education, healthcare and livelihood programmes — with monitoring and reporting a sponsor can check.",
    detail: [
      "BroadArks Foundation anchors community access and CSR delivery for the group. It is a separately registered nonprofit society, established in 2014, running education, healthcare and livelihood programmes for communities across India.",
      "It delivers CSR programmes end to end, in line with Schedule VII of the Companies Act, and reports on them independently so sponsors can see what their money did.",
    ],
    scope: [
      "Need assessment and mobilisation",
      "Education and healthcare programmes",
      "Livelihood programmes",
      "Institutional coordination",
      "Inclusion",
      "Impact reporting",
    ],
    audience: ["CSR heads", "Donors", "Government bodies", "Volunteers"],
    image: "/images/divisions/foundation.jpg",
    status: "live",
  },
  {
    slug: "kari-green",
    index: "03",
    name: "Kari Green",
    mandate: "Sustainability & Circularity",
    domain: null,
    url: null,
    tagline: "Green skills, circular economy and climate-responsive livelihoods",
    summary:
      "The group's sustainability arm — it turns environmental priorities into programmes that can actually be implemented.",
    detail: [
      "Kari Green embeds sustainability and green-economy relevance across the group's work.",
      "It covers green skills, renewable energy, resource efficiency, circular-economy pathways and climate-responsive livelihoods — translating environmental priorities into implementable programmes.",
    ],
    scope: [
      "Green skills",
      "Renewable energy",
      "Resource efficiency",
      "Circular-economy pathways",
      "Climate-responsive livelihoods",
    ],
    audience: [],
    image: "/images/divisions/karigreen.jpg",
    status: "emerging",
  },
  {
    slug: "vihaanga-ai",
    index: "04",
    name: "Vihaanga AI",
    mandate: "Intelligence & Technology",
    domain: null,
    url: null,
    tagline: "The digital intelligence layer behind every programme",
    summary:
      "The group's AI arm — profiling, analytics, dashboards and evidence generation that make every programme measurable.",
    detail: [
      "Vihaanga AI provides the digital intelligence layer for the whole group.",
      "It covers AI-enabled profiling, digital learning support, analytics, dashboards, workflow automation, monitoring, evidence generation and decision support across programmes.",
    ],
    scope: [
      "AI-enabled profiling",
      "Digital learning support",
      "Analytics and dashboards",
      "Workflow automation",
      "Monitoring and evidence generation",
      "Decision support",
    ],
    audience: [],
    image: "/images/divisions/vihanga.jpg",
    status: "emerging",
  },
];

export const LIVE_DIVISIONS = DIVISIONS.filter((d) => d.status === "live");
export const EMERGING_DIVISIONS = DIVISIONS.filter((d) => d.status === "emerging");

/** Anchor on /divisions for a division — the only canonical link now. */
export const divisionHref = (d: Pick<Division, "slug">) => `/divisions#${d.slug}`;

/* ----------------------------------------------------------------
   THE LINKAGE — how the four fit together, from the profile.

   Kept as one sentence for anywhere a sentence is wanted, and split
   clause by clause (same words, same order) for the panel on
   /divisions, where 60 words set large were a wall.
   ---------------------------------------------------------------- */
export const LINKAGE_ROLES: { name: string; role: string }[] = [
  { name: "Y&Now", role: "builds human capability" },
  { name: "BroadArks Foundation", role: "anchors community access and CSR delivery" },
  { name: "Kari Green", role: "embeds sustainability and green-economy relevance" },
  { name: "Vihaanga AI", role: "provides the digital intelligence layer" },
];

export const LINKAGE_CLOSE =
  "Each division can lead alone. BroadArks integrates all four for the complex, multi-year work.";

export const LINKAGE =
  "Y&Now builds human capability; BroadArks Foundation anchors community access and CSR delivery; Kari Green embeds sustainability and green-economy relevance; and Vihaanga AI provides the digital intelligence layer. Each can lead a specialist mandate, while BroadArks Technology integrates them for complex, multi-year assignments.";

/* ----------------------------------------------------------------
   INTEGRATION MODEL — the five-step delivery pathway.
   ---------------------------------------------------------------- */
export const INTEGRATION_MODEL = [
  {
    step: "01",
    title: "Understand & diagnose",
    body: "The Foundation maps communities; Y&Now assesses skill gaps; Kari Green identifies sustainability levers; Vihaanga AI structures data and baselines.",
    image: "/images/story/employability.jpg",
  },
  {
    step: "02",
    title: "Design the solution",
    body: "A shared team converts the diagnosis into outcomes, curricula, infrastructure, technology, inclusion measures, budgets, KPIs and an implementation roadmap.",
    image: "/images/story/program-planning.png",
  },
  {
    step: "03",
    title: "Mobilise & deliver",
    body: "The Foundation leads field engagement; Y&Now delivers training; Kari Green integrates green practices; Vihaanga AI supports digital learning and visibility.",
    image: "/images/story/classroom.jpg",
  },
  {
    step: "04",
    title: "Connect to opportunity",
    body: "Industry exposure, on-the-job training, placement, self-employment, enterprise incubation, market linkages and green-economy opportunities are activated.",
    image: "/images/story/livelihoods.jpg",
  },
  {
    step: "05",
    title: "Measure, improve & scale",
    body: "Dashboards and analytics connect learning, employment, social and environmental indicators to partner reporting and continuous improvement.",
    image: "/images/story/team-collaboration.png",
  },
] as const;

/* ----------------------------------------------------------------
   INTEGRATED VALUE TO PARTNERS
   ---------------------------------------------------------------- */
export const PARTNER_VALUE = [
  {
    title: "Single-point accountability",
    body: "One lead relationship, one consolidated workplan, one review and reporting rhythm.",
  },
  {
    title: "Modular engagement",
    body: "Use one division or combine capabilities — without juggling multiple disconnected vendors.",
  },
  {
    title: "Industry–community bridge",
    body: "Enterprise needs converted into accessible skills, livelihoods and local opportunities.",
  },
  {
    title: "Evidence-led scale",
    body: "Digital monitoring and feedback used to improve, replicate and scale responsibly.",
  },
] as const;

/* ----------------------------------------------------------------
   PARTNERSHIP MODEL — what an engagement may include.
   ---------------------------------------------------------------- */
export const PARTNERSHIP_MODEL = [
  { title: "Project design", body: "Needs-led concepts, theory of change, outcomes and implementation plans." },
  { title: "Infrastructure planning", body: "Centres of Excellence, laboratories, tools, technology and learning environments." },
  { title: "Beneficiary mobilisation", body: "Community outreach, counselling, profiling, screening and enrolment." },
  { title: "Training delivery", body: "Technical, practical and soft-skills learning through classroom and blended modes." },
  { title: "Assessment & certification", body: "Knowledge checks, practical evaluation, evidence and certification coordination." },
  { title: "Opportunity linkages", body: "Industry exposure, OJT, placements, self-employment and enterprise development." },
  { title: "Monitoring", body: "Attendance, progress, milestone, financial and operational tracking." },
  { title: "Impact reporting", body: "Outcome measurement, dashboards, learning reviews and partner reports." },
] as const;

/* ----------------------------------------------------------------
   SELECTED EXPERIENCE & READINESS — from the profile.
   ---------------------------------------------------------------- */
export const EXPERIENCE = [
  {
    title: "EV Centre of Excellence, Pune",
    body: "Implementation partner for the Envalior-supported Centre of Excellence in EV Technology at Marathwada Mitra Mandal's Polytechnic — modern laboratory infrastructure with structured Level 4 and Level 5 learning pathways and practical assessment.",
  },
  {
    title: "Women-focused garment & livelihood skilling",
    body: "Advanced dress designing and tailoring for rural women — technical skills, soft skills, leadership, beneficiary documentation and post-training livelihood tracking.",
  },
  {
    title: "Green & technical-skills programme design",
    body: "Centres of Excellence and short-term programmes in solar installation and maintenance, two-wheeler BS VI diagnostics, and CNG safety and service practices — with classroom, hands-on and assessment components.",
  },
  {
    title: "Community-led implementation",
    body: "Programmes designed around local need assessment, inclusive mobilisation, institutional partnerships, practical delivery, livelihood transition and measurable reporting.",
  },
] as const;

/* ----------------------------------------------------------------
   LEADERSHIP
   ---------------------------------------------------------------- */
export interface Person {
  name: string;
  role: string;
  group: "Founders" | "Senior Team" | "Advisory Board";
  /** One line for card views. The full bio appears on /about#leadership. */
  blurb: string;
  bio: string[];
  credential?: string;
  initials: string;
  /** Portrait, 3:4. Falls back to an initials plate when absent. */
  image?: string;
  linkedin?: string;
}

export const PEOPLE: Person[] = [
  {
    name: "Pankaj Dutta",
    role: "Founder & Chief Executive Officer",
    group: "Founders",
    blurb:
      "17+ years in strategy and business development at Sony Pictures, Paramount, Tata and Globe Telecom.",
    initials: "PD",
    credential: "Alumnus, IIM Rohtak",
    image: "/images/team/pankaj.jpg",
    bio: [
      "Pankaj Dutta is the Founder and CEO of BroadArks Technology. He has over 17 years of experience in strategy, business development and project management, having held senior roles at Sony Pictures, Paramount Pictures, Globe Telecom and Tata across Europe, the UAE, South East Asia and the US. He leads group strategy, partnerships and growth.",
      "He is an alumnus of IIM Rohtak. Pankaj believes that formal education alone cannot meet employability requirements, and that structured skilling is essential if India's workforce is to realise its potential.",
    ],
  },
  {
    name: "Dr. Kaveri Dutta",
    role: "Co-Founder & Chief Learning Officer",
    group: "Founders",
    blurb:
      "15+ years in learning design and vocational education. Visiting faculty at NIFT.",
    initials: "KD",
    credential: "Visiting faculty, NIFT",
    image: "/images/team/kaveri.jpg",
    bio: [
      "Dr. Kaveri Dutta is Co-Founder and Chief Learning Officer of BroadArks Technology, bringing over 15 years in learning and development, curriculum design and vocational education. She leads learning architecture, programme quality and industry–academia engagement. She holds a post-graduate degree from SNDT Mumbai in Textiles and a post-graduate Diploma in Hospitality and Administration Management.",
      "She is visiting faculty at the National Institute of Fashion Technology and holds board memberships at the Paris Institute of Fashion Technology and the Beijing Institute of Fashion Technology. She writes regularly for leading journals on fashion, handlooms, handicrafts and sustainable design.",
    ],
  },
  {
    name: "Tarun Abbhani",
    role: "Chief Financial Officer",
    group: "Senior Team",
    blurb:
      "Chartered Accountant with 14+ years leading finance at Vodafone, Tata Teleservices and Airtel.",
    initials: "TA",
    credential: "Chartered Accountant · DISA, DIRM, FAFD, Ind AS",
    image: "/images/team/tarun.jpg",
    bio: [
      "Tarun Abbhani is BroadArks Technology's Chief Financial Officer. A qualified Chartered Accountant with post-qualification certifications in DISA, DIRM, FAFD and Ind AS, he brings 14+ years of financial leadership across Vodafone, Tata Teleservices and Airtel.",
      "He leads BroadArks's financial strategy, operational KPIs and financial governance.",
    ],
  },
  {
    name: "Souri Mukherjee",
    role: "Head — FP&A and IT & Cloud Solutions",
    group: "Senior Team",
    blurb:
      "24 years across Markem-Imaje, United Biscuits and Wrigley’s India. Leads planning and IT.",
    initials: "SM",
    credential: "B.Com (Hons), St. Xavier's College, Kolkata",
    image: "/images/team/souri.jpg",
    bio: [
      "Souri Mukherjee leads financial planning and analysis alongside IT and cloud strategy at BroadArks. He brings 24 years of experience from Markem-Imaje, United Biscuits (McVitie's) and Wrigley's India.",
      "He believes that access to education, skills and the right attitude enables every person to thrive.",
    ],
  },
  {
    name: "Pradeep Narayanan",
    role: "Adviser",
    group: "Advisory Board",
    blurb:
      "26 years in the development sector with UN agencies and international NGOs across eight countries.",
    initials: "PN",
    credential: "MSc Development Studies, University of Bristol",
    image: "/images/team/pradeep.jpg",
    bio: [
      "Pradeep Narayanan brings over 26 years in the development sector, having worked with UN agencies, bilateral organisations and international NGOs across India, Cambodia, Jordan, Bhutan, Bangladesh, Nepal and Serbia.",
      "His expertise spans monitoring and evaluation systems, thematic planning and funding strategy for social impact programmes.",
    ],
  },
  {
    name: "Brajendra Gupta",
    role: "Adviser",
    group: "Advisory Board",
    blurb:
      "Entrepreneur running a skilled-labour manufacturing business. Advises on industry partnerships.",
    initials: "BG",
    credential: "Founder — advanced printing & fabrication",
    image: "/images/team/brajendra.jpg",
    bio: [
      "Brajendra Gupta is a serial entrepreneur and founder of a state-of-the-art printing and fabricating unit. He brings a practitioner's view of vocational and technical workforce development, built on running a skilled-labour-intensive business on advanced manufacturing technology.",
      "He advises BroadArks on sector connectivity and enterprise partnerships.",
    ],
  },
];

/* ----------------------------------------------------------------
   ENQUIRY ROUTING — used by the contact form and the contact page.
   ---------------------------------------------------------------- */
export const ENQUIRY_TYPES = [
  "Enterprise Partnership",
  "CSR Programme",
  "Y&Now",
  "BroadArks Foundation",
  "Kari Green",
  "Vihaanga AI",
  "Investment / Investor Relations",
  "Media / Press",
  "Careers",
  "Other",
] as const;
