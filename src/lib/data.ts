// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  cat: string;
  /** 1 = learning · 2 = familiar · 3 = comfortable · 4 = proficient · 5 = expert */
  level: 1 | 2 | 3 | 4 | 5;
  years: number;
}

export interface WorkEntry {
  company: string;
  role: string;
  /** e.g. "2018 — 2020" or "2023 — Present" */
  period: string;
  summary: string;
  points: string[];
  tags: string[];
}

export interface Project {
  name: string;
  tagline: string;
  stack: string[];
  year: number;
  category: string;
  url: string;
  status: 'Active' | 'Maintained' | 'Archived';
}

export interface Certification {
  name: string;
  issuer: string;
  /** Omit for in-progress certs */
  year?: number;
  /** Defaults to 'active' when omitted */
  status?: 'active' | 'expired' | 'in-progress';
}

export interface VolunteerEntry {
  org: string;
  role: string;
  period: string;
  blurb: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  read: number;
  excerpt: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  /** Years of experience shown in sidebar, e.g. "14y" */
  exp: string;
  /** Timezone shown in sidebar, e.g. "UTC-5" */
  tz: string;
  /** Controls the open/closed availability indicator in the sidebar */
  available: boolean;
  email: string;
  github: string;
  linkedin: string;
  pitch: string;
  longPitch: string;
  skills: Skill[];
  work: WorkEntry[];
  projects: Project[];
  certifications: Certification[];
  volunteer: VolunteerEntry[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAREER_START = 2011;
const yearsExp = new Date().getFullYear() - CAREER_START;

export const data: ResumeData = {
  name: 'Jeremy Reed',
  title: 'Specialist, Solution Architect',
  location: 'United States',
  exp: `${yearsExp}y`,
  tz: 'America/New_York',
  available: false,
  email: 'contact@jreed.me',
  github: 'jr33d',
  linkedin: 'jr33d',
  pitch:
    'I am a passionate senior engineer with over 14 years of experience across front-end, back-end, and full-stack development. Known for the ability to wear multiple hats — from hands-on implementation to requirements gathering and cross-team collaboration.',
  longPitch:
    'From early consulting work with Fortune 500 clients to long-form platform engineering at Pearson, I have contributed at every layer of the development lifecycle. I specialize in Angular and TypeScript front-end systems, C# back-end services, and modern DevOps practices using Azure DevOps.',

  // ── Skills ──────────────────────────────────────────────────────────────────
  // Level mapping from skills.json percentages:
  //   90–100% → 5 (expert) · 70–89% → 4 (proficient)
  //   50–69% → 3 (comfortable) · 25–49% → 2 (familiar) · <25% → 1 (learning)
  // Years estimated from career start date of 2011 per experiences.json
  skills: [
    // Frontend ────────────────────────────────────────────────────────────────
    { name: 'HTML / CSS / SCSS', cat: 'Frontend',  level: 5, years: 14 },
    { name: 'Angular',           cat: 'Frontend',  level: 4, years: 11 },
    { name: 'React',             cat: 'Frontend',  level: 4, years: 8  },
    { name: 'storybook',         cat: 'Frontend',  level: 1, years: 2  },

    // Languages ───────────────────────────────────────────────────────────────
    { name: 'JavaScript',        cat: 'Languages', level: 5, years: 14 },
    { name: 'TypeScript',        cat: 'Languages', level: 4, years: 8  },
    { name: 'C#',                cat: 'Languages', level: 5, years: 13 },
    { name: 'SQL',               cat: 'Languages', level: 3, years: 13 },
    { name: 'Java',              cat: 'Languages', level: 2, years: 4  },

    // Backend / Platform ──────────────────────────────────────────────────────
    { name: '.NET / ASP.NET',    cat: 'Backend',   level: 4, years: 15 },
    { name: 'Node.js',           cat: 'Backend',   level: 3, years: 6  },
    // TODO: add other backend skills if applicable

    // DevOps / Cloud ──────────────────────────────────────────────────────────
    { name: 'AWS',               cat: 'Cloud',     level: 2, years: 3  },
    { name: 'Azure',             cat: 'Cloud',     level: 3, years: 5  },
    { name: 'Azure DevOps',      cat: 'DevOps',    level: 3, years: 5  },
    { name: 'Git / GitHub',      cat: 'DevOps',    level: 4, years: 12 },
    { name: 'Docker',            cat: 'DevOps',    level: 3, years: 5  },

    // AI / Data ───────────────────────────────────────────────────────────────
    { name: 'Claude',            cat: 'AI',        level: 2, years: 1  },
    { name: 'ChatGPT',           cat: 'AI',        level: 1, years: 1  },
    { name: 'Cursor',            cat: 'AI',        level: 1, years: 1  },
    { name: 'Copilot',           cat: 'AI',        level: 2, years: 1  },
  ],

  // ── Work history ────────────────────────────────────────────────────────────
  // Source: experiences.json — descriptions expanded; points are inferred from
  // the brief originals and typical scope for each role. REVIEW each entry.
  work: [
    {
      company: 'Pearson — PVS',
      role: 'Specialist, Solution Architect',
      period: '2026 — Present',
      summary:
        'Lead solution architect for a high-availability online K–12 learning platform. Drive technical strategy and implementation for data lifecycle management, platform modernization, and cross-team collaboration to ensure long-term stability and compliance.',
      points: [
        'Design high-level and low-level architecture design documents for various projects including Data Foundation, MDR automation, and other initiatives',
        'Lead cross-team collaboration on platform modernization efforts, including dependency upgrades, framework evolution, and DevOps improvements',
        'Serve as a technical advisor and mentor for engineering teams, fostering best practices in software design, development, and operations',
      ],
      tags: ['C4 Models', 'High-Level Architecture', 'Low-Level Architecture', 'AWS', 'Azure', 'DevOps', 'Data Lifecycle Management'],
    },
    {
      company: 'Pearson — PVS',
      role: 'Senior Software Engineer',
      period: '2023 — 2026',
      summary:
        'Lead engineer focused on data retention, platform stability, and framework modernization for an online K–12 learning platform. Own upgrade cycles for core application dependencies and collaborate with product and compliance teams on long-term data lifecycle requirements.',
      points: [
        // REVIEW: expand with specific metrics or initiatives if available
        'Designed and implemented data retention solutions for alumni student records, ensuring long-term compliance and data accessibility across school years',
        'Led dependency and framework upgrade initiative across production applications, reducing known CVEs and improving build performance',
        'Partnered with stakeholders to define data lifecycle policies balancing regulatory requirements with storage efficiency',
      ],
      tags: ['TypeScript', 'Angular', 'C#', '.NET', 'Azure DevOps'],
    },
    {
      company: 'Pearson — PVS',
      role: 'Software Engineer',
      period: '2020 — 2023',
      summary:
        'Championed a full DevOps modernization effort, migrating source control and build pipelines from Team Foundation Server to Azure DevOps. Improved engineering workflows and increased release frequency for a high-availability online learning platform.',
      points: [
        'Led end-to-end migration from TFS to Azure DevOps — including repositories, work items, and build/release pipelines — with zero downtime for the engineering team',
        'Redesigned release cycle processes, enabling more frequent and reliable deployments for a platform serving hundreds of thousands of students',
        'Standardized branching strategies and pull request policies, improving code review consistency and reducing integration conflicts',
      ],
      tags: ['TypeScript', 'Angular', 'C#', 'Azure DevOps', 'Azure'],
    },
    {
      company: 'FEi Systems',
      role: 'Senior Front-End Engineer',
      period: '2018 — 2020',
      summary:
        'Architected and built the front-end framework for a multi-state Medicaid and Medicare case management system. Established front-end engineering standards and led implementation across a cross-functional team working under strict government compliance requirements.',
      points: [
        'Designed scalable Angular component architecture to support complex, multi-state healthcare data workflows and dynamic form rendering',
        'Established front-end development standards, component libraries, and code review practices adopted by the full engineering team',
        // REVIEW: add specific states, client details, or accessibility/508 compliance work if applicable
        'Collaborated with UX designers and back-end engineers to deliver a compliant, accessible application for state-level government clients',
      ],
      tags: ['Angular', 'TypeScript', 'HTML/SCSS', 'Healthcare IT'],
    },
    {
      company: 'Residential Design Systems',
      role: 'Front-End Engineer',
      period: '2017',
      summary:
        'Short-term engagement to modernize internal web tooling and streamline development and communication workflows for a residential design firm.',
      points: [
        'Improved internal web tools to reduce friction in the design-to-development handoff process',
        // REVIEW: add more detail if available — this was a short contract role
        'Identified and resolved performance bottlenecks and legacy code issues in the existing front-end codebase',
      ],
      tags: ['Angular', 'JavaScript', 'CSS'],
    },
    {
      company: 'Pearson — PVS (Connections Education)',
      role: 'Software Engineer II',
      period: '2014 — 2017',
      summary:
        'Full-stack engineer on a high-traffic online K–12 schooling platform serving hundreds of thousands of students. Contributed across front-end, back-end, and database layers in an agile team environment.',
      points: [
        'Maintained and enhanced an online schooling platform supporting hundreds of thousands of concurrent student users across the U.S.',
        'Built new features across the full stack — from Angular UI components to C# API endpoints and SQL data layers',
        'Participated in sprint planning, code reviews, and cross-team collaboration to deliver reliable software on schedule',
      ],
      tags: ['JavaScript', 'Angular', 'C#', '.NET', 'SQL'],
    },
    {
      company: 'Catalyte (Catalyst IT Services)',
      role: 'Developer II',
      period: '2011 — 2014',
      summary:
        'Software consultant delivering custom solutions for a diverse client portfolio spanning Fortune 500 corporations and small businesses. Gained broad exposure to multiple industries, technology stacks, and the full software development lifecycle.',
      points: [
        'Delivered software solutions for clients across industries including retail, finance, and professional services — from requirements gathering through production deployment',
        'Worked directly with client stakeholders on solution design and technical scoping, translating business needs into working software',
        // REVIEW: add specific client names or project examples if shareable
        'Operated across the full SDLC on short-cycle engagements, building adaptability across stacks and problem domains',
      ],
      tags: ['JavaScript', 'C#', '.NET', 'SQL'],
    },
  ],

  // ── Projects ─────────────────────────────────────────────────────────────────
  // Source: projects.json. Both are live on GitHub Pages under jr33d.github.io.
  projects: [
    {
      name: 'secret-santa',
      tagline: 'Self-hosted Secret Santa organizer with wishlists, assignment matching, and email notifications',
      stack: ['Next.js', 'TypeScript', 'SQLite', 'NextAuth.js', 'Nodemailer', 'Docker'],
      year: 2025,
      category: 'Personal',
      url: 'https://github.com/JR33D/secret-santa',
      status: 'Active',
    },
    {
      name: 'jotty-mcp-server',
      tagline: 'MCP server bridging Claude Desktop to the Jotty API — checklists, notes, and admin tools',
      stack: ['Node.js', 'TypeScript', 'MCP', 'Docker'],
      year: 2025,
      category: 'Personal',
      url: 'https://github.com/JR33D/jotty-mcp-server',
      status: 'Active',
    },
    {
      name: 'ngx-chronology',
      tagline: 'Timeline display component for Angular',
      stack: ['Angular', 'TypeScript', 'SCSS'],
      year: 2019,       // TODO: verify actual year from git history
      category: 'OSS',
      url: 'https://jr33d.github.io/ngx-chronology/',
      status: 'Archived',
    },
    {
      name: 'ngx-codetabs',
      tagline: 'Tabbed code display component for Angular',
      stack: ['Angular', 'TypeScript', 'SCSS'],
      year: 2019,       // TODO: verify actual year from git history
      category: 'OSS',
      url: 'https://jr33d.github.io/ngx-codetab/',
      status: 'Archived',
    },
    // TODO: add any other side projects, tools, or open source contributions
  ],

  // ── Certifications (reverse chronological) ───────────────────────────────────
  certifications: [
    {
      name: 'AWS Solutions Architect — Associate',
      issuer: 'Amazon Web Services',
      status: 'in-progress',
    },
    {
      name: 'SAFe 4 Practitioner Certification',
      issuer: 'Scaled Agile, Inc.',
      year: 2019,
      status: 'expired',
    },
    {
      name: 'MCSA: Web Applications',
      issuer: 'Microsoft',
      year: 2016,
    },
    {
      name: 'Exam 487: Developing Microsoft Azure and Web Services',
      issuer: 'Microsoft',
      year: 2013,
    },
    {
      name: 'Exam 486: Developing ASP.NET MVC Web Applications',
      issuer: 'Microsoft',
      year: 2013,
    },
    {
      name: 'Exam 480: Programming in HTML5 with JavaScript and CSS3',
      issuer: 'Microsoft',
      year: 2013,
    },
  ],

  // ── Volunteer ────────────────────────────────────────────────────────────────
  // TODO: add any volunteer, mentorship, or community involvement
  volunteer: [
    { org: 'FIRST Robotics', role: 'Volunteer Mentor', period: '2020 — Present', blurb: 'Mentor for high school robotics teams, providing guidance on software development, engineering design, and competition strategy.' },
  ],
};
