import { useEffect, useState, type FormEvent, type ReactNode } from "react";

const resumeUrl =
  "https://docs.google.com/document/d/1phC0BntfuolIgV7cvgSrdtsuVY3oh763/export?format=pdf";
const githubUrl = "https://github.com/bhargavibayar02";
const linkedInUrl = "https://www.linkedin.com/in/b-s-bhargavi-2410bb293";
const profilePhotoUrl = "https://avatars.githubusercontent.com/u/168254235?v=4";
const navigation = [
  { href: "#home", label: "Overview" },
  { href: "#work", label: "Selected work" },
  { href: "#terminal", label: "Terminal" },
  { href: "#path", label: "Learning path" },
  { href: "#about", label: "About me" },
  { href: "#contact", label: "Get in touch" },
];

const projects = [
  {
    number: "01 / SECURITY",
    name: "Sri-Guard",
    description:
      "Explainable insider-threat detection with behavioral analytics, risk-adaptive access controls, and SOC-ready incident reporting.",
    tags: ["Isolation Forest", "MITRE ATT&CK", "FastAPI"],
    href: `${githubUrl}/sri-guard`,
    art: "sri",
  },
  {
    number: "02 / APPSEC",
    name: "WebScan",
    description:
      "A web vulnerability scanner built around OWASP ZAP, with scan progress, risk-ranked findings, and downloadable reports.",
    tags: ["OWASP ZAP", "FastAPI", "Python"],
    href: `${githubUrl}/web-scan`,
    art: "scan",
  },
  {
    number: "03 / AI RESEARCH",
    name: "QFDet × RGB-Thermal",
    description:
      "Enhanced pedestrian detection with CBAM attention and gated fusion—improving best-run test mAP from 0.299 to 0.326.",
    tags: ["PyTorch", "Computer vision", "CBAM"],
    href: `${githubUrl}/RGB-Thermal-Pedestrian-Detection`,
    art: "thermal",
  },
  {
    number: "04 / NETWORK DEFENSE",
    name: "Windows Firewall Automation",
    description:
      "A Python utility for validating IP addresses and managing Windows Defender Firewall block rules through PowerShell.",
    tags: ["Python", "PowerShell", "Windows security"],
    href: `${githubUrl}/firewall`,
    art: "firewall",
  },
  {
    number: "05 / COMPUTER VISION",
    name: "Vehicle Counting & Flow Analysis",
    description:
      "YOLOv8 detection and ByteTrack tracking turn traffic video into direction-aware vehicle counts, annotated clips, and structured event logs.",
    tags: ["YOLOv8", "ByteTrack", "OpenCV", "Streamlit"],
    href: `${githubUrl}/vehicle-counting`,
    art: "traffic",
  },
  {
    number: "06 / CLIENT WEBSITE",
    name: "MRA Interiors",
    description:
      "Developed and deployed a website for an interiors client in Udupi, applying secure development practices to a real client project.",
    tags: ["Client project", "Web development", "JavaScript"],
    href: `${githubUrl}/mra-interiors`,
    art: "interiors",
  },
] as const;

const roadmap = [
  {
    duration: "START HERE",
    title: "Foundations",
    description: "Linux · TCP/IP · DNS · HTTP",
    tools: "Linux · Wireshark",
    icon: "terminal",
  },
  {
    duration: "BUILD CONTEXT",
    title: "Networking",
    description: "Ports · protocols · routing",
    tools: "Nmap · Wireshark",
    icon: "radar",
  },
  {
    duration: "PRACTISE SAFELY",
    title: "Web security",
    description: "OWASP Top 10 · VAPT",
    tools: "Burp Suite · OWASP ZAP",
    icon: "shield",
  },
  {
    duration: "FIND THE SIGNAL",
    title: "Detection",
    description: "Logs · alerts · MITRE ATT&CK",
    tools: "SIEM · Python",
    icon: "search",
  },
  {
    duration: "PRESERVE EVIDENCE",
    title: "Forensics",
    description: "Evidence · timelines · reporting",
    tools: "Autopsy · Volatility",
    icon: "file",
  },
  {
    duration: "KEEP GOING",
  title: "AI security",
  description: "Threat modeling · red teaming · evaluation",
  tools: "MITRE ATLAS · PyRIT",
  icon: "ai",
  },
] as const;

const certifications = [
  ["Cisco", "Network Security · Ethical Hacking · Cybersecurity · CCST"],
  ["Infosys Springboard", "Cybersecurity & Applied Ethical Hacking"],
  ["NPTEL", "Cryptography & Network Security"],
  ["Udemy", "Web Application Security"],
  ["IBM", "Cloud · NoSQL · RDBMS · Big Data"],
  ["TCS iON", "Generative AI Essentials"],
] as const;

const milestones = [
  {
    label: "RECOGNITION",
    title: "IET scholarship presentation",
    detail: "Selected for the regional-level presentation in Hyderabad — among the top 150 of 48,562 applicants.",
    color: "amber",
  },
  {
    label: "HACKATHONS",
    title: "Learning with a team",
    detail: "Participant in FINSPARK’26, YUGMA TechFest 2.0, and the Flinders University AI Hackathon.",
    color: "cyan",
  },
  {
    label: "COMMUNITY",
    title: "Sharing security awareness",
    detail: "Conducted a cybersecurity awareness session at CSI Boarding School, Mulki; Vice President of SATARC.",
    color: "rose",
  },
] as const;

const internships = [
  {
    period: "SEP 2026 — PRESENT",
    role: "AI Engineer Intern",
    organisation: "Aiotrix Pvt Limited · Mangaluru",
    detail: "Developing serverless functions for red-team simulations and contributing to security automation workflows with autonomous agents.",
    color: "cyan",
  },
  {
    period: "JUN 2026",
    role: "Cyber Security Intern",
    organisation: "CEN Police Station · Mangaluru",
    detail: "Supported cybercrime investigation work at CEN Police Station, with exposure to digital evidence handling and incident reporting.",
    color: "amber",
  },
  {
    period: "MAY 2026",
    role: "Cloud Computing Intern",
    organisation: "Abhimo Technologies Private Limited",
    detail: "Gained practical exposure to cloud deployment, monitoring, and logging, alongside foundational cloud security practices.",
    color: "rose",
  },
] as const;

type TerminalEntry = {
  command: string;
  output: string;
};

const terminalHelp = [
  "Available commands:",
  "  help, --help   Show this command list",
  "  whoami         A short introduction",
  "  projects       View selected projects",
  "  skills         View areas and tools",
  "  experience     View experience",
  "  education      View education",
  "  contact        Show contact links",
  "  clear          Clear the terminal",
].join("\n");

function TooltipTerm({
  children,
  tip,
  className = "",
}: {
  children: ReactNode;
  tip: string;
  className?: string;
}) {
  return (
    <span className={className} tabIndex={0} data-tip={tip} title={tip}>
      {children}
    </span>
  );
}

function KaliMark() {
  return (
    <img
      src="/kali-dragon.svg"
      alt="Kali Linux dragon"
    />
  );
}

function RoadmapIcon({ name }: { name: (typeof roadmap)[number]["icon"] }) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "terminal":
      return (
        <svg {...shared}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="m7 9 3 3-3 3m6 0h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "radar":
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
          <path d="M12 12 18 6M12 3.5v2M3.5 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...shared}>
          <path d="M12 3 20 6v5.2c0 5.2-3.4 8.4-8 10.8-4.6-2.4-8-5.6-8-10.8V6l8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 12h6m-3-3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg {...shared}>
          <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="m16 16 4.5 4.5M8 10.8h5.6m-2.8-2.8v5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "file":
      return (
        <svg {...shared}>
          <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3.5v5h4m-9 5h6m-6 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "ai":
      return (
        <svg {...shared}>
          <path d="M12 4.2a3.2 3.2 0 0 0-6.1 1.4 3.2 3.2 0 0 0-1 6.1 3.2 3.2 0 0 0 4.7 5.5 3.2 3.2 0 0 0 5 0 3.2 3.2 0 0 0 4.7-5.5 3.2 3.2 0 0 0-1-6.1A3.2 3.2 0 0 0 12 4.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 4v16m-5.2-12 3 2m7.4-2-3 2m-7 5 3.2-1m8 1-3.2-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
  }
}

function ProjectArtwork({ type }: { type: (typeof projects)[number]["art"] }) {
  if (type === "sri") {
    return (
      <div className="project-art art-sri" aria-hidden="true">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit-core">S<span>G</span></span>
        <span className="orbit-node node-one" />
        <span className="orbit-node node-two" />
        <span className="orbit-node node-three" />
        <span className="art-caption">BEHAVIORAL INTELLIGENCE</span>
      </div>
    );
  }

  if (type === "scan") {
    return (
      <div className="project-art art-scan" aria-hidden="true">
        <span className="scan-window"><span className="scan-top"><i /><i /><i /></span><span className="scan-url">https://target.local</span><span className="scan-bar" /><span className="scan-line" /><span className="scan-line short" /><span className="scan-alert"><b>✓</b> SCAN REPORT</span></span>
        <span className="scan-crosshair">+</span>
      </div>
    );
  }

  if (type === "thermal") {
    return (
      <div className="project-art art-thermal" aria-hidden="true">
        <span className="thermal-grid" />
        <span className="thermal-figure" />
        <span className="thermal-cross cross-a" />
        <span className="thermal-cross cross-b" />
        <span className="thermal-legend"><i /> RGB <i /> THERMAL <i /> FUSION</span>
      </div>
    );
  }

  if (type === "firewall") {
    return (
      <div className="project-art art-firewall" aria-hidden="true">
        <span className="firewall-shield">
          <svg viewBox="0 0 64 72" fill="none">
            <path d="M32 4 56 14v18c0 17-10 28-24 36C18 60 8 49 8 32V14L32 4Z" stroke="currentColor" strokeWidth="2" />
            <path d="M18 23h11v8H18zm17 0h11v8H35zm-17 14h11v8H18zm17 0h11v8H35z" fill="currentColor" opacity=".8" />
          </svg>
        </span>
        <span className="firewall-status"><i /> WINDOWS DEFENDER</span>
      </div>
    );
  }

  if (type === "interiors") {
    return (
      <div className="project-art art-interiors" aria-hidden="true">
        <span className="interior-room">
          <span className="interior-window"><i /><i /><i /></span>
          <span className="interior-shelf" />
          <span className="interior-sofa" />
          <span className="interior-plant"><i /><i /><i /></span>
        </span>
        <span className="interior-caption">MRA · INTERIORS</span>
      </div>
    );
  }

  return (
    <div className="project-art art-traffic" aria-hidden="true">
      <span className="traffic-lane" />
      <span className="traffic-lane lane-two" />
      <span className="traffic-car car-one"><b>01</b></span>
      <span className="traffic-car car-two"><b>02</b></span>
      <span className="traffic-crossing" />
      <span className="traffic-counter"><i /> OBJECT TRACKING <strong>YOLOv8</strong></span>
    </div>
  );
}

function PortfolioProject({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className={`project-card${"wide" in project ? " project-wide" : ""}`}>
      <div className="project-topline">
        <span className="project-number">{project.number}</span>
        <span className="project-external" aria-hidden="true">↗</span>
      </div>
      <ProjectArtwork type={project.art} />
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <a className="card-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}>
        EXPLORE PROJECT <span>↗</span>
      </a>
    </article>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [laptopOn, setLaptopOn] = useState(true);
  const [terminalReady, setTerminalReady] = useState(false);
  const [portfolioCommand, setPortfolioCommand] = useState("");
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 120 : 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!laptopOn) {
      setTerminalReady(false);
      return;
    }

    setTerminalReady(false);
    const timer = window.setTimeout(() => setTerminalReady(true), 1800);
    return () => window.clearTimeout(timer);
  }, [laptopOn]);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".section-anchor")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.3] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reducedMotion) {
      cards.forEach((card) => card.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const activeLabel = navigation.find((item) => item.href === `#${activeSection}`)?.label ?? "Overview";

  function runPortfolioCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = portfolioCommand.trim();
    if (!command) return;

    setPortfolioCommand("");
    const normalized = command.toLowerCase();
    if (normalized === "clear") {
      setTerminalEntries([]);
      return;
    }

    const outputs: Record<string, string> = {
      help: terminalHelp,
      "--help": terminalHelp,
      whoami: "B. S. Bhargavi — cybersecurity and cyber forensics student at Srinivas University.",
      about: "Interested in cybersecurity, digital forensics, software development, cloud, and AI security.",
      projects: projects.map((project) => `• ${project.name}`).join("\n"),
      skills: "Security: web testing, networking, digital forensics, MITRE ATT&CK, MITRE ATLAS, PyRIT\nBuild: Python, JavaScript, React, AWS, GCP, Docker, machine learning",
      experience: internships.map((role) => `${role.role} — ${role.organisation} (${role.period})`).join("\n"),
      education: "B.Tech, Cyber Security & Cyber Forensics\nSrinivas University · 2023–2027",
      contact: "Email: bhargavibayar@gmail.com\nLinkedIn: linkedin.com/in/b-s-bhargavi-2410bb293\nGitHub: github.com/bhargavibayar02",
    };

    setTerminalEntries((entries) => [
      ...entries,
      {
        command,
        output: outputs[normalized] ?? `Command not found: ${command}\nType --help to see available commands.`,
      },
    ]);
  }

  return (
    <>
      {loading && (
        <div className="boot-loader" role="status" aria-label="Loading portfolio">
          <span className="loader-kali"><KaliMark /></span>
          <span className="loader-brand">BHARGAVI<span>.</span></span>
          <span className="loader-label">INITIALIZING WORKSPACE</span>
          <span className="loader-track"><i /></span>
          <button className="loader-skip" type="button" onClick={() => setLoading(false)}>SKIP INTRO <span>↗</span></button>
        </div>
      )}
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-shell">
        <aside className={`sidebar${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Bhargavi — home">
            <span className="brand-mark" aria-hidden="true">B</span>
            <span className="brand-name">bhargavi<span className="brand-dot">.</span><small>SECURITY PORTFOLIO</small></span>
          </a>

          <div className="sidebar-caption">NAVIGATE</div>
          <nav className="side-nav">
            {navigation.map((item) => (
              <a
                key={item.href}
                className={`nav-link${activeSection === item.href.slice(1) ? " active" : ""}`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="availability-card">
              <span className="online-indicator" />
              <span><strong>Open to work</strong><small>Available for the right role.</small></span>
            </div>
            <div className="sidebar-socials">
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile">GH <span>↗</span></a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">IN <span>↗</span></a>
              <span className="sidebar-year">© 2026</span>
            </div>
          </div>
        </aside>

        <main id="main" className="main-content">
          <header className="topbar">
            <div className="breadcrumb"><span>PORTFOLIO</span><span className="crumb-slash">/</span><span>{activeLabel.toUpperCase()}</span></div>
            <a className="topbar-status" href="#contact"><span className="online-indicator" /> AVAILABLE FOR THE RIGHT THING</a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span />
            </button>
          </header>

          <section id="home" className="hero section-anchor">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> CYBERSECURITY STUDENT · CLASS OF 2027</p>
              <h1>Cybersecurity<br /><span className="serif-accent">student.</span></h1>
              <p className="hero-description">I’m <strong>Bhargavi Bayar</strong>, a Cyber Security and Cyber Forensics student at Srinivas University. Alongside security, I’m interested in software development, cloud computing, and building practical AI applications.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
                <a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-meta">
                <span><span className="online-indicator" /> MANGALURU, INDIA</span>
                <span>B.TECH · 2023—2027</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="laptop">
                <div className={`laptop-screen${terminalReady ? "" : " laptop-intro"}${laptopOn ? "" : " laptop-powered-off"}`}>
                  <div className="screen-topbar">
                    <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
                    <span className="screen-title"><KaliMark /> KALI LINUX <span className="screen-separator">/</span> TERMINAL</span>
                    <button
                      className={`laptop-power${laptopOn ? " is-on" : ""}`}
                      type="button"
                      aria-label={laptopOn ? "Power off laptop" : "Power on laptop"}
                      onClick={() => setLaptopOn((powered) => !powered)}
                    >
                      <span className="power-icon" aria-hidden="true">⏻</span>
                      {laptopOn ? "POWER OFF" : "POWER ON"}
                    </button>
                  </div>
                  <div className={`screen-content${terminalReady ? " terminal-ready" : " terminal-booting"}`}>
                    {!laptopOn ? (
                      <div className="power-off-screen">
                        <span className="power-off-indicator" />
                        <span>System powered off</span>
                        <button type="button" onClick={() => setLaptopOn(true)}>Turn on</button>
                      </div>
                    ) : !terminalReady ? (
                      <div className="kali-intro">
                        <KaliMark />
                      </div>
                    ) : (
                      <>
                        <div className="terminal-panel">
                          <div className="terminal-welcome"><span className="terminal-status-dot" /> Welcome to Bhargavi&apos;s workspace <span className="terminal-date">[ IST ]</span></div>
                          <div className="terminal-command"><span>bhargavi@kali</span>:<b>~</b>$ whoami</div>
                          <div className="terminal-output">Bhargavi Bayar · Cybersecurity student</div>
                          <div className="terminal-command"><span>bhargavi@kali</span>:<b>~</b>$ cat education.txt</div>
                          <div className="terminal-output">B.Tech · Cyber Security &amp; Cyber Forensics<br />Srinivas University · 2023–2027</div>
                          <div className="terminal-command"><span>bhargavi@kali</span>:<b>~</b>$ cat interests.txt</div>
                          <div className="terminal-output terminal-interests">security · development · cloud · AI security</div>
                          <div className="terminal-command terminal-last"><span>bhargavi@kali</span>:<b>~</b>$ <i /></div>
                        </div>
                        <div className="terminal-profile">
                          <div className="terminal-dragon"><KaliMark /></div>
                          <div className="terminal-photo-frame">
                            <img
                              className="terminal-photo"
                              src={profilePhotoUrl}
                              alt="Bhargavi"
                              onError={(event) => {
                                event.currentTarget.hidden = true;
                                event.currentTarget.parentElement?.classList.add("photo-fallback");
                              }}
                            />
                            <span className="terminal-photo-initial" aria-hidden="true">B</span>
                          </div>
                          <span className="terminal-profile-name">B. S. Bhargavi</span>
                          <span className="terminal-profile-note">MANGALURU, INDIA</span>
                        </div>
                      </>
                    )}
                  </div>
                  {laptopOn && terminalReady && <div className="screen-footer"><span>SESSION ACTIVE</span><span>CYBERSECURITY · DEVELOPMENT · CLOUD · AI SECURITY</span></div>}
                </div>
                <div className="laptop-base"><span /></div>
              </div>
            </div>

            <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div>
          </section>

          <section className="signal-strip" aria-label="Areas of interest">
            <span className="signal-label">CURRENT INTERESTS</span>
            <TooltipTerm className="signal-item" tip="Learning to identify and document security issues in authorised labs and applications.">Cybersecurity</TooltipTerm>
            <span className="signal-divider">/</span>
            <TooltipTerm className="signal-item" tip="Building applications and software through code, design, and testing.">Software development</TooltipTerm>
            <span className="signal-divider">/</span>
            <TooltipTerm className="signal-item" tip="Cloud infrastructure, platforms, deployment, and security fundamentals.">Cloud computing</TooltipTerm>
            <span className="signal-divider">/</span>
            <TooltipTerm className="signal-item" tip="Machine learning, language models, and practical AI applications.">AI &amp; machine learning</TooltipTerm>
            <span className="signal-divider">/</span>
            <TooltipTerm className="signal-item" tip="Exploring threats to AI systems and safe, authorized testing with MITRE ATLAS and PyRIT.">AI security · MITRE ATLAS · PyRIT</TooltipTerm>
            <span className="signal-divider">/</span>
            <TooltipTerm className="signal-item" tip="Preserving and analyzing digital evidence to understand what happened.">Digital forensics</TooltipTerm>
            <span className="signal-tail" aria-hidden="true">✳</span>
          </section>

          <section id="work" className="content-section section-anchor">
            <span className="binary-detail binary-work" aria-hidden="true">01010100 01010010 01000001 01000011 01000101</span>
            <div className="section-heading">
              <div><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> PROOF OF CURIOSITY</p><h2>Selected <span className="serif-accent">work.</span></h2></div>
              <p className="section-intro">A few projects I’ve worked on during my studies and hackathons. The code and technical details live in the linked repositories.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => <PortfolioProject key={project.name} project={project} />)}
            </div>
            <a className="all-work-link" href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">MORE EXPERIMENTS ON GITHUB <span>↗</span></a>
          </section>

          <section id="terminal" className="content-section terminal-section section-anchor">
            <span className="binary-detail binary-terminal" aria-hidden="true">01001000 01000101 01001100 01010000</span>
            <div className="section-heading">
              <div><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> A SMALL INTERACTIVE TOUR</p><h2>Portfolio <span className="serif-accent">terminal.</span></h2></div>
              <p className="section-intro">Try a command to explore the portfolio. This is a safe, simulated interface—commands only return portfolio information.</p>
            </div>
            <div className="portfolio-terminal">
              <div className="portfolio-terminal-bar">
                <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
                <span>bhargavi@portfolio: ~</span>
                <span className="terminal-state"><i /> READY</span>
              </div>
              <div className="portfolio-terminal-body" aria-live="polite" aria-relevant="additions text">
                <p className="terminal-hint">Welcome. Type <code>--help</code> to see what you can explore.</p>
                {terminalEntries.map((entry, index) => (
                  <div className="portfolio-terminal-entry" key={`${index}-${entry.command}`}>
                    <div className="portfolio-terminal-command"><span>bhargavi@portfolio</span>:<b>~</b>$ {entry.command}</div>
                    <pre>{entry.output}</pre>
                  </div>
                ))}
                <form className="portfolio-terminal-form" onSubmit={runPortfolioCommand}>
                  <label className="terminal-prompt" htmlFor="portfolio-command"><span>bhargavi@portfolio</span>:<b>~</b>$</label>
                  <input
                    id="portfolio-command"
                    name="command"
                    value={portfolioCommand}
                    onChange={(event) => setPortfolioCommand(event.currentTarget.value)}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Enter a portfolio terminal command"
                  />
                  <span className="terminal-caret" aria-hidden="true" />
                </form>
              </div>
            </div>
          </section>

          <section id="path" className="content-section roadmap-section section-anchor">
            <span className="binary-detail binary-path" aria-hidden="true">01001100 01000101 01000001 01010010 01001110</span>
            <div className="section-heading roadmap-heading">
              <div><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> THE NEXT RIGHT STEP</p><h2>A security learning <span className="serif-accent">path.</span></h2></div>
              <p className="section-intro">A study outline, not a claim of expertise. Each step builds on the last and should be practised only with permission.</p>
            </div>
            <div className="roadmap-shell">
              <div className="roadmap-overline"><span>YOUR ETHICAL SECURITY ROADMAP</span><span><i /> LEARN IN SEQUENCE</span></div>
              <div className="roadmap">
                {roadmap.map((step, index) => (
                  <article className="roadmap-node" key={step.title}>
                    <div className="roadmap-connector">
                      <span className="node-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className={`node-icon icon-${step.icon}`}><RoadmapIcon name={step.icon} /></span>
                    </div>
                    <span className="node-duration">{step.duration}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <span className="node-tool">
                      {step.title === "AI security" ? (
                        <>
                          <a href="https://atlas.mitre.org/" target="_blank" rel="noreferrer">MITRE ATLAS</a>
                          {" · "}
                          <a href="https://github.com/Azure/PyRIT" target="_blank" rel="noreferrer">PyRIT</a>
                        </>
                      ) : step.tools}
                    </span>
                  </article>
                ))}
              </div>
              <div className="roadmap-note"><span className="roadmap-note-mark">✳</span><span><strong>A good rule for every stage:</strong> practise only in a lab or on systems you have explicit permission to test.</span><a href="https://tryhackme.com/" target="_blank" rel="noreferrer">TRY A LEGAL LAB ↗</a></div>
            </div>
          </section>

          <section id="about" className="content-section about-section section-anchor">
            <span className="binary-detail binary-about" aria-hidden="true">01000010 01010101 01001001 01001100 01000100</span>
            <div className="about-left">
              <p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> THE PERSON BEHIND THE TERMINAL</p>
              <h2>Curious about how<br />things <span className="serif-accent">really work.</span></h2>
              <p className="about-description">I’m a B.Tech student in Cyber Security and Cyber Forensics at Srinivas University Institute of Engineering and Technology in Mangaluru. My interests span security testing and digital investigations, as well as software development, cloud technologies, and AI/ML.</p>
              <p className="about-description">Through coursework, hackathons, and personal projects, I’ve explored everything from web vulnerability scanning and firewall automation to AI-powered threat detection and computer vision. I enjoy learning across disciplines and turning that learning into practical work.</p>
              <a className="text-link about-link" href={linkedInUrl} target="_blank" rel="noreferrer">A little more on LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
            <div className="about-right">
              <div className="fact-row"><span className="fact-label">01 / CURRENT CHAPTER</span><span className="fact-value">B.Tech · Cyber Security &amp; Cyber Forensics<br /><span className="fact-sub">Srinivas University · 2023–2027</span></span></div>
              <div className="fact-row">
                <span className="fact-label">02 / SECURITY TOOLKIT</span>
                <span className="fact-value skill-cloud">
                  <TooltipTerm className="skill-term" tip="Web proxy for inspecting and testing application traffic.">Burp Suite</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Open-source platform for finding vulnerabilities in web apps.">OWASP ZAP</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Network scanner and service discovery tool.">Nmap</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Network protocol analyzer for inspecting traffic captures.">Wireshark</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Framework and knowledge base for adversary tactics and techniques.">MITRE ATT&amp;CK</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="MITRE’s knowledge base of adversary tactics and techniques targeting AI-enabled systems.">MITRE ATLAS</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Microsoft’s open-source framework for assessing generative AI systems through authorized red teaming.">PyRIT</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Linux distribution designed for penetration testing and security research.">Kali Linux</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Password recovery and hash auditing tools used in authorised labs.">Hashcat · John the Ripper</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Recon-ng is a modular framework for authorised reconnaissance.">Recon-ng</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Web and LLM application security risks, vulnerability assessment, and reporting.">OWASP Top 10 · VAPT</TooltipTerm>
                </span>
              </div>
              <div className="fact-row">
                <span className="fact-label">03 / ALSO BUILD WITH</span>
                <span className="fact-value skill-cloud">
                  <TooltipTerm className="skill-term" tip="General-purpose language used for automation, APIs, and data work.">Python</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Programming language used in application development and coursework.">Java</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Programming language used for software and application development.">C#</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="JavaScript for interactive web applications and front-end development.">JavaScript</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="React library for building user interfaces.">React</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Amazon Web Services cloud infrastructure and managed services.">AWS</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Google Cloud Platform services and cloud infrastructure.">GCP</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Containers package applications and dependencies for consistent environments.">Docker</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Machine-learning projects built with scikit-learn and data tools.">Scikit-learn · Pandas · NumPy</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Large language models, language processing, retrieval-augmented generation, and AI agents.">LLMs · NLP · RAG · AI agents</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Learning to assess AI application risks using threat modeling and authorized testing frameworks.">AI security</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="MongoDB and MySQL database systems.">MongoDB · MySQL</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Version control and collaborative development with Git and GitHub.">Git · GitHub</TooltipTerm>
                  <TooltipTerm className="skill-term" tip="Security fundamentals including TCP/IP, DNS, HTTP/HTTPS, authentication, cryptography, and firewalls.">Networking · cryptography</TooltipTerm>
                </span>
              </div>
              <div className="fact-row"><span className="fact-label">04 / COURSEWORK</span><span className="fact-value">B.Tech · CGPA 9.5<br /><span className="fact-sub">Cyber Security &amp; Cyber Forensics · 2023–2027</span></span></div>
              <div className="fact-row"><span className="fact-label">05 / PRE-UNIVERSITY</span><span className="fact-value">Science · PCMB · 97.5%<br /><span className="fact-sub">Vivekananda PU College · 2021–2023</span></span></div>
              <div className="fact-row"><span className="fact-label">06 / ACTIVITIES</span><span className="fact-value">Vice President · SATARC<br /><span className="fact-sub">Cybersecurity Student Association · SUIET</span></span></div>
            </div>
          </section>

          <section className="internship-section">
            <div className="experience-heading"><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> LEARNING ON THE JOB</p><span>INTERNSHIP EXPERIENCE</span></div>
            <div className="internship-list">
              {internships.map((internship) => (
                <article className={`internship-item internship-${internship.color}`} key={internship.role} data-reveal>
                  <span className="internship-period">{internship.period}</span>
                  <div className="internship-role"><h3>{internship.role}</h3><span>{internship.organisation}</span></div>
                  <p>{internship.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="milestones-section">
            <div className="experience-heading"><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> CAMPUS, TEAMS &amp; COMMUNITY</p><span>STUDENT MILESTONES</span></div>
            <div className="milestones-grid">
              {milestones.map((milestone) => (
                <article className={`milestone-card milestone-${milestone.color}`} key={milestone.title} data-reveal>
                  <span className="milestone-label"><i /> {milestone.label}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="credentials-section">
            <span className="binary-detail binary-credentials" aria-hidden="true">01000011 01000101 01010010 01010100 01010011</span>
            <div className="credentials-heading"><p className="eyebrow section-eyebrow"><span className="eyebrow-line" /> ALWAYS LEARNING</p><span>SELECTED CERTIFICATIONS</span></div>
            <div className="credential-list">
              {certifications.map(([name, detail]) => (
                <span key={name} data-reveal><strong>{name}</strong><small>{detail}</small></span>
              ))}
            </div>
          </section>

          <footer id="contact" className="contact-section section-anchor">
            <div className="contact-orbit" aria-hidden="true"><span /><span /><span /><i>✳</i></div>
            <div className="contact-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> HAVE A GOOD CHALLENGE?</p>
              <h2>Let’s make the<br /><span className="serif-accent">digital world</span> a little safer.</h2>
              <p>Interested in cybersecurity, AI security, software development, and opportunities to contribute to practical projects.</p>
              <a className="button button-primary contact-button" href="mailto:bhargavibayar@gmail.com">Say hello <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-details">
              <span className="contact-label">PREFER A DIRECT LINE?</span>
              <a href="mailto:bhargavibayar@gmail.com">bhargavibayar@gmail.com <span>↗</span></a>
              <a href="tel:+917338030387">+91 73380 30387 <span>↗</span></a>
              <div className="contact-socials"><a href={githubUrl} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={linkedInUrl} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
            </div>
            <div className="footer-line"><span>© 2026 B. S. BHARGAVI</span><span>CYBER SECURITY · MANGALURU</span><a href="#home">BACK TO TOP ↑</a></div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
