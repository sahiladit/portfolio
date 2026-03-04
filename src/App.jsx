import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Font + Global CSS ─── */
const FontInjector = () => {
  useEffect(() => {
    if (document.getElementById("pf-fonts")) return;
    const l = document.createElement("link");
    l.id = "pf-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

const GlobalStyles = () => {
  useEffect(() => {
    if (document.getElementById("pf-global")) return;
    const style = document.createElement("style");
    style.id = "pf-global";
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #0a0a0a;
        color: #e8e8e8;
        font-family: 'Syne', sans-serif;
        overflow-x: hidden;
      }
      a { text-decoration: none; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0a0a0a; }
      ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 2px; }

      /* ── NAV LINKS responsive ── */
      .nav-links {
        display: flex;
        gap: 32px;
        list-style: none;
      }
      .hamburger { display: none; }

      @media (max-width: 640px) {
        .nav-links {
          display: none;
          position: fixed;
          top: 61px;
          left: 0; right: 0;
          background: rgba(10,10,10,0.97);
          flex-direction: column;
          gap: 0;
          border-bottom: 1px solid #1e1e1e;
          backdrop-filter: blur(12px);
          z-index: 99;
        }
        .nav-links.open { display: flex !important; }
        .nav-links li a {
          display: block;
          padding: 16px 5%;
          border-bottom: 1px solid #1e1e1e;
          font-size: 14px;
        }
        .hamburger { display: flex !important; }
        .hero-stats { gap: 24px !important; }
        .projects-grid { grid-template-columns: 1fr !important; }
        .exp-grid { grid-template-columns: 1fr !important; }
        .exp-period { text-align: left !important; }
        .contact-links { flex-direction: column; align-items: center; }
      }

      /* ── hover link ── */
      .nav-link { color: #555; transition: color 0.2s; }
      .nav-link:hover { color: #00ff88; }

      .contact-link {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #888;
        padding: 12px 24px;
        border: 1px solid #1e1e1e;
        border-radius: 3px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .contact-link:hover {
        color: #00ff88;
        border-color: #00ff88;
        background: rgba(0,255,136,0.04);
        transform: translateY(-3px);
      }

      .project-github {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #555;
        padding: 4px 10px;
        border: 1px solid #1e1e1e;
        border-radius: 3px;
        transition: all 0.2s;
      }
      .project-github:hover { color: #00ff88; border-color: #00ff88; }

      .skill-chip {
        background: #111;
        border: 1px solid #1e1e1e;
        border-radius: 4px;
        padding: 14px 16px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #888;
        cursor: default;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
      }
      .skill-chip:hover {
        border-color: #00ff88;
        color: #00ff88;
        background: rgba(0,255,136,0.04);
        transform: translateY(-2px);
      }
      .skill-chip .dot-ind {
        width: 6px; height: 6px; border-radius: 50%;
        background: #00ff88; opacity: 0.4; flex-shrink: 0;
        transition: opacity 0.2s;
      }
      .skill-chip:hover .dot-ind { opacity: 1; }

      .ach-badge-hover { transition: transform 0.2s; }
      .ach-badge-hover:hover { transform: scale(1.05); }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

/* ─── Scroll Reveal ─── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Section label + title ─── */
const SectionHead = ({ num, label, title }) => (
  <>
    <Reveal>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#00ff88",
        letterSpacing: "0.2em", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {num} / {label}
        <div style={{ flex: 1, height: 1, background: "#1e1e1e", maxWidth: 200 }} />
      </div>
    </Reveal>
    <Reveal delay={0.05}>
      <h2 style={{
        fontFamily: "'Syne',sans-serif",
        fontSize: "clamp(2rem,4vw,3rem)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        marginBottom: 48,
        color: "#e8e8e8",
      }}>
        {title}
      </h2>
    </Reveal>
  </>
);

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
const LINES = [
  { delay: 0.3,  segs: [{ c: "#00ff88", t: "sahil@portfolio:~$ " }, { c: "#ccc", t: "node portfolio.js" }] },
  { delay: 0.8,  segs: [{ c: "#888",    t: "→ Initializing modules..." }] },
  { delay: 1.2,  segs: [{ c: "#00ff88", t: "✓ " }, { c: "#888", t: "Loaded: skills.json" }] },
  { delay: 1.5,  segs: [{ c: "#00ff88", t: "✓ " }, { c: "#888", t: "Loaded: projects.json" }] },
  { delay: 1.8,  segs: [{ c: "#00ff88", t: "✓ " }, { c: "#888", t: "Loaded: achievements.json" }] },
  { delay: 2.1,  segs: [{ c: "#0af",    t: "⚡ Building components..." }] },
  { delay: 2.5,  segs: [{ c: "#00ff88", t: "✓ " }, { c: "#888", t: "Compiled successfully in 312ms" }] },
  { delay: 2.85, segs: [{ c: "#0af",    t: "🚀 Launching portfolio..." }] },
];

const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    LINES.forEach((l, i) => {
      setTimeout(() => setProgress(Math.round(((i + 1) / LINES.length) * 100)), l.delay * 1000);
    });
    setTimeout(onDone, 3500);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      style={{
        position: "fixed", inset: 0, background: "#000", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        width: "min(580px, 92vw)",
        border: "1px solid #222", borderRadius: 8, overflow: "hidden",
        boxShadow: "0 0 60px rgba(0,255,136,0.08)",
      }}>
        {/* title bar */}
        <div style={{
          background: "#1a1a1a", padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {["#ff5f57","#ffbd2e","#28c840"].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555", marginLeft: "auto" }}>
            zsh — portfolio — 80×24
          </span>
        </div>
        {/* body */}
        <div style={{
          background: "#0d0d0d", padding: 24,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, minHeight: 220,
        }}>
          {LINES.map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: line.delay, duration: 0.2 }}
              style={{ display: "flex", gap: 4, marginBottom: 6 }}
            >
              {line.segs.map((s, j) => (
                <span key={j} style={{ color: s.c }}>{s.t}</span>
              ))}
            </motion.div>
          ))}
          {/* cursor */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ color: "#00ff88" }}>sahil@portfolio:~$&nbsp;</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ display: "inline-block", width: 8, height: 14, background: "#00ff88" }}
            />
          </div>
          {/* progress */}
          <div style={{ marginTop: 20, height: 2, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ height: "100%", background: "linear-gradient(90deg,#00ff88,#0af)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════
   NAV
══════════════════════════════════════ */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["skills","projects","achievements","experience","contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 5%",
        borderBottom: scrolled ? "1px solid #1e1e1e" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#00ff88" }}>
        <span style={{ color: "#555" }}>~/</span>sahil_adit
      </div>

      {/* desktop */}
      <ul className="nav-links">
        {links.map((l, i) => (
          <motion.li key={l}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
          >
            <a href={`#${l}`} className="nav-link"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.08em" }}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* hamburger */}
      <button
        className="hamburger"
        onClick={() => setOpen(o => !o)}
        style={{
          flexDirection: "column", gap: 5, cursor: "pointer", padding: 4,
          background: "none", border: "none",
        }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{ display: "block", width: 22, height: 2, background: "#888" }} />
        ))}
      </button>

      {/* mobile menu */}
      <ul className={`nav-links${open ? " open" : ""}`}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} className="nav-link"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, letterSpacing: "0.08em" }}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -60]);

  const stats = [
    { num: "8.92", suffix: "/10", label: "CGPA" },
    { num: "1255", suffix: "+",   label: "CF RATING" },
    { num: "5",    suffix: "★",   label: "HACKERRANK C++" },
    { num: "4",    suffix: "+",   label: "PROJECTS" },
  ];

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "120px 5% 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* bg glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,255,136,0.03) 0%, transparent 70%),
          radial-gradient(ellipse 40% 60% at 90% 80%, rgba(0,170,255,0.03) 0%, transparent 60%)
        `,
      }} />
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <motion.div style={{ y, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#00ff88",
            letterSpacing: "0.15em", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <span style={{ display: "inline-block", width: 32, height: 1, background: "#00ff88" }} />
          COMPUTER ENGINEERING · PUNE
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: "-0.02em", marginBottom: 8,
            }}
          >
            <span style={{ color: "#555" }}>SAHIL</span><br />
            <span style={{ color: "#00ff88" }}>ADIT</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#888", marginTop: 24, maxWidth: 500, lineHeight: 1.75,
          }}
        >
          Building intelligent systems — from{" "}
          <span style={{ color: "#0af" }}>RAG-based AI</span> to{" "}
          <span style={{ color: "#0af" }}>graph-based fraud detection</span>.<br />
          C++ · React · Python · IoT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}
        >
          <a href="#projects" style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.1em",
            padding: "12px 28px", borderRadius: 3, cursor: "pointer",
            background: "#00ff88", color: "#000", border: "1px solid #00ff88",
            transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.background="transparent"; e.target.style.color="#00ff88"; }}
            onMouseLeave={e => { e.target.style.background="#00ff88"; e.target.style.color="#000"; }}
          >
            VIEW PROJECTS
          </a>
          <a href="mailto:spadit01@gmail.com" style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.1em",
            padding: "12px 28px", borderRadius: 3, cursor: "pointer",
            background: "transparent", color: "#555", border: "1px solid #1e1e1e",
            transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.borderColor="#00ff88"; e.target.style.color="#00ff88"; }}
            onMouseLeave={e => { e.target.style.borderColor="#1e1e1e"; e.target.style.color="#555"; }}
          >
            GET IN TOUCH
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-stats"
          style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap" }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.08 }}
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, color: "#e8e8e8" }}>
                {s.num}<span style={{ color: "#00ff88" }}>{s.suffix}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#555", letterSpacing: "0.1em" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
const SKILL_DATA = {
  "// LANGUAGES":  ["C++","Python","JavaScript","HTML","CSS","SQL"],
  "// FRAMEWORKS & TOOLS": ["React.js","Node.js","FastAPI","RESTAPI"],
  "// CONCEPTS":   ["Data Structures","Algorithms","OOP","DBMS","Linux","GenAI","IoT"],
};

const Skills = () => (
  <section id="skills" style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
    <SectionHead num="01" label="SKILLS" title="Tech Stack" />
    {Object.entries(SKILL_DATA).map(([cat, items], ci) => (
      <Reveal key={cat} delay={ci * 0.06}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#555",
            letterSpacing: "0.15em", marginBottom: 16,
          }}>{cat}</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 10,
          }}>
            {items.map(name => (
              <div key={name} className="skill-chip">
                <span className="dot-ind" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    ))}
  </section>
);

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
const PROJECTS = [
  {
    icon: "⚖️", name: "Lawgic AI",
    desc: "RAG-based legal chatbot over IPC sections using embeddings and semantic search. Provides accurate, context-aware legal information instantly.",
    tags: ["Python","OpenAI API","Vector Embeddings","Chainlit","RAG"],
  },
  {
    icon: "🏥", name: "NEXSUS AI",
    desc: "Agent-based platform for continuous healthcare provider data validation. Async pipeline with Celery + Redis, PostgreSQL as canonical store.",
    tags: ["FastAPI","LangGraph","PostgreSQL","Redis","Celery","Docker"],
  },
  {
    icon: "🏠", name: "Sustainable Home Automation",
    desc: "ESP32-based IoT system reducing simulated energy usage by 25% through smart automation and real-time Firebase monitoring.",
    tags: ["ESP32","C++","Firebase","IoT"],
  },
  {
    icon: "🔍", name: "Financial Forensics Engine",
    desc: "Graph-based money mule detection: cycles (3–5 hops), smurfing & shell networks with deterministic risk scoring and WebGL visualization.",
    tags: ["Next.js","TypeScript","Graphology","WebGL"],
  },
];

const ProjectCard = ({ project, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
      style={{
        background: "#111", border: "1px solid #1e1e1e", borderRadius: 6,
        padding: 28, display: "flex", flexDirection: "column", gap: 16,
        position: "relative", overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,#00ff88,#0af)",
          transformOrigin: "left",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 22 }}>{project.icon}</span>
        <a href="#" className="project-github">↗ github</a>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#e8e8e8" }}>
        {project.name}
      </div>
      <div style={{ fontSize: 14, color: "#888", lineHeight: 1.65, flex: 1 }}>
        {project.desc}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#0af",
            background: "rgba(0,170,255,0.07)", padding: "3px 8px", borderRadius: 3,
            letterSpacing: "0.05em",
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
    <SectionHead num="02" label="PROJECTS" title="What I've Built" />
    <div
      className="projects-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
      }}
    >
      {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} i={i} />)}
    </div>
  </section>
);

/* ══════════════════════════════════════
   ACHIEVEMENTS
══════════════════════════════════════ */
const ACHIEVEMENTS = [
  { icon: "🏆", title: "IIT Madras Shastra 2024", sub: "Finalist in the national-level programming contest", badge: "FINALIST" },
  { icon: "💡", title: "COEP i2i 2025", sub: "Finalist in the national innovation challenge for sustainable home automation", badge: "FINALIST" },
  { icon: "🌍", title: "MIT2 Coding Contest 2024", sub: "Rank 43 among international participants", badge: "RANK 43" },
  { icon: "⚡", title: "Codeforces Pupil", sub: "Peak rating 1255 (handle: CompileMeNot)", badge: "RATING 1255" },
  { icon: "⭐", title: "HackerRank", sub: "5-star badge in C++", badge: "5 STARS" },
  { icon: "🌿", title: "GirlScript Summer of Code ext. 2024", sub: "Selected as open-source contributor", badge: "CONTRIBUTOR" },
  { icon: "🎃", title: "Hacktoberfest 2024", sub: "Successfully contributed to open-source projects", badge: "CONTRIBUTOR" },
];

const Achievements = () => (
  <section id="achievements" style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
    <SectionHead num="03" label="ACHIEVEMENTS" title="Recognition" />
    <div style={{ border: "1px solid #1e1e1e", borderRadius: 6, overflow: "hidden" }}>
      {ACHIEVEMENTS.map((a, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <motion.div
            whileHover={{ background: "#111111" }}
            style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "18px 24px",
              borderBottom: i < ACHIEVEMENTS.length - 1 ? "1px solid #1a1a1a" : "none",
              flexWrap: "wrap", transition: "background 0.2s",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#444", minWidth: 24 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{a.icon}</span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 14, color: "#d4d4d4", fontWeight: 600, marginBottom: 2 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{a.sub}</div>
            </div>
            <span className="ach-badge-hover" style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#00ff88",
              background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)",
              padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap",
            }}>
              {a.badge}
            </span>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════ */
const EXPERIENCE = [
  {
    role: "Co-Head, Competitive Programming Dept",
    period: "Oct 2024 – Sep 2025",
    org: "GDSC · AISSMS COE",
    desc: "Mentored juniors in Data Structures & Algorithms and organized coding contests to foster a peer-driven learning culture within the department.",
  },
  {
    role: "Member, Technical Department",
    period: "Aug 2024 – May 2025",
    org: "CIPHERS · AISSMS COE",
    desc: "Supported the technical department in website development and digital marketing initiatives for the college's tech society.",
  },
];

const EDUCATION = [
  { degree: "B.E. in Computer Engineering", school: "AISSMS College of Engineering, Pune", score: "8.92", suffix: "/10", year: "2023 – 2027" },
  { degree: "Higher Secondary (12th)", school: "Mangaon Junior College, Mangaon", score: "83.5%", suffix: "", year: "2021 – 2023" },
];

const Experience = () => (
  <section id="experience" style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto" }}>
    <SectionHead num="04" label="EXPERIENCE" title="Where I've Worked" />
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 80 }}>
      {EXPERIENCE.map((e, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <motion.div
            whileHover={{ borderColor: "#2a2a2a" }}
            className="exp-grid"
            style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: 28,
              display: "grid", gridTemplateColumns: "1fr auto", gap: "8px 20px",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700 }}>{e.role}</div>
            <div className="exp-period" style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
              color: "#00ff88", textAlign: "right", whiteSpace: "nowrap",
            }}>{e.period}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#0af" }}>{e.org}</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.65, gridColumn: "1/-1", marginTop: 4 }}>{e.desc}</div>
          </motion.div>
        </Reveal>
      ))}
    </div>

    {/* Education */}
    <SectionHead num="05" label="EDUCATION" title="Background" />
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {EDUCATION.map((e, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <motion.div
            whileHover={{ borderColor: "#2a2a2a" }}
            style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: 28,
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              gap: 20, flexWrap: "wrap", transition: "border-color 0.2s",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{e.degree}</div>
              <div style={{ fontSize: 13, color: "#888" }}>{e.school}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#00ff88" }}>
                {e.score}{e.suffix}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555", marginTop: 4 }}>{e.year}</div>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
const CONTACTS = [
  { label: "✉ spadit01@gmail.com",  href: "mailto:spadit01@gmail.com" },
  { label: "in LinkedIn",            href: "https://linkedin.com/in/sahiladit" },
  { label: "⌥ GitHub",              href: "https://github.com/sahiladit" },
  { label: "⚙ LeetCode",            href: "https://leetcode.com/sahiladit" },
  { label: "{ } Codeforces",         href: "https://codeforces.com/profile/CompileMeNot" },
];

const Contact = () => (
  <section id="contact" style={{ padding: "100px 5%", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
    <SectionHead num="06" label="CONTACT" title="Let's Connect" />
    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#888", marginBottom: 40, marginTop: -32 }}>
      Open to opportunities, collaborations, and interesting projects.
    </p>
    <div className="contact-links" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      {CONTACTS.map(c => (
        <a key={c.label} href={c.href} target="_blank" className="contact-link">{c.label}</a>
      ))}
    </div>
  </section>
);

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
    style={{
      borderTop: "1px solid #1e1e1e", padding: "24px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 12,
    }}
  >
    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555" }}>
      © 2025 <span style={{ color: "#00ff88" }}>Sahil Adit</span>
    </p>
    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#555" }}>
      Designed & built with <span style={{ color: "#00ff88" }}>♥</span> · Pune, Maharashtra
    </p>
  </motion.footer>
);

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <FontInjector />
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Nav />
            <Hero />
            <Skills />
            <Projects />
            <Achievements />
            <Experience />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}