import { useEffect, useRef, useState } from "react";

/* ── Hook: revelar al hacer scroll ── */
function useRevealOnScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("active");
        else el.classList.remove("active");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Nav con hamburger ── */
function Nav({ scrollTo }) {
  const [open, setOpen] = useState(false);
  const handle = (id) => { setOpen(false); setTimeout(() => scrollTo(id), 50); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%", height: 64, width: "100%",
        background: "#2a6ef5",
        boxShadow: "0 4px 12px rgba(40,102,226,0.25)",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff", fontWeight: 700, letterSpacing: "-0.3px" }}>
          Valeria Fernández Jiménez
        </div>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: 36 }}>
          {["about","projects","contact"].map((id, i) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {["About me","Projects","Contact me"][i]}
            </span>
          ))}
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {["about","projects","contact"].map((id, i) => (
          <span key={id} onClick={() => handle(id)}>
            {["About me","Projects","Contact me"][i]}
          </span>
        ))}
      </div>
    </>
  );
}

/* ── Portfolio principal ── */
export default function Portfolio() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const aboutRef    = useRevealOnScroll();
  const projectsRef = useRevealOnScroll();
  const contactRef  = useRevealOnScroll();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#ffffff", color: "#1e293b", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; margin: 0; padding: 0; overflow-x: hidden; scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }

        /* ── Reveal ── */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.active { opacity: 1; transform: translateY(0); }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Nav ── */
        .nav-link { font-size: 16px; font-weight: 500; color: #fff; letter-spacing: 0.3px; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #bfdbfe; }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; transition: all 0.3s; }

        .mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: #1d5ce0; flex-direction: column; z-index: 199; border-top: 1px solid rgba(255,255,255,0.15); animation: fadeDown 0.2s ease; }
        .mobile-menu.open { display: flex; }
        .mobile-menu span { padding: 16px 6%; font-size: 16px; font-weight: 500; color: #fff; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); transition: background 0.2s; }
        .mobile-menu span:hover { background: rgba(255,255,255,0.1); }

        /* ── Botones ── */
        .btn-fill {
          background: #2a6ef5; color: #fff; border: none;
          padding: 14px 28px; border-radius: 12px; font-size: 16px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s; box-shadow: 0 4px 20px rgba(42,110,245,0.3);
          font-family: 'Inter', sans-serif; text-decoration: none;
        }
        .btn-fill:hover { background: #1d5ce0; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(42,110,245,0.38); }

        .btn-ghost {
          background: #fff; color: #0d1b2a; border: 1.5px solid #130144;
          padding: 14px 28px; border-radius: 12px; font-size: 16px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s; font-family: 'Inter', sans-serif;
        }
        .btn-ghost:hover { border-color: #a5b4fc; background: #f5f3ff; transform: translateY(-2px); }

        /* ── Project cards ── */
        .project-card { background: #fff; border: 1px solid #e8eaf6; border-radius: 20px; overflow: hidden; transition: all 0.3s; }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.09); border-color: #c7d2fe; }

        /* ── Contact cards ── */
        .contact-card { display: flex; align-items: center; gap: 16px; background: #f8faff; border: 1px solid #e8eaf6; border-radius: 14px; padding: 16px 20px; transition: all 0.2s; text-decoration: none; }
        .contact-card:hover { border-color: #a5b4fc; background: #f5f3ff; transform: translateX(4px); }

        .proj-link { font-size: 13px; font-weight: 600; color: #2a6ef5; display: flex; align-items: center; gap: 5px; transition: gap 0.2s; }
        .proj-link:hover { gap: 8px; }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 900px) {
          .hero-grid  { flex-direction: column-reverse !important; align-items: center !important; }
          .hero-text  { max-width: 100% !important; text-align: center; }
          .hero-text .chips { justify-content: center; }
          .hero-text .cta   { justify-content: center; }
          .hero-photo { width: 260px !important; height: 260px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .hamburger   { display: flex !important; }
          .nav-desktop { display: none !important; }
          .hero-photo  { width: 200px !important; height: 200px !important; }
          .btn-fill, .btn-ghost { font-size: 14px !important; padding: 11px 18px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav scrollTo={scrollTo} />

      {/* ── HERO / ABOUT ── */}
      <section id="about" ref={aboutRef} className="reveal" style={{
        minHeight: "100vh", width: "100%",
        display: "flex", alignItems: "center",
        padding: "10% 10% 10%", background: "#f8faff",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", right: -120, top: -120, background: "radial-gradient(circle, rgba(124,92,191,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", left: -60, bottom: -60, background: "radial-gradient(circle, rgba(42,110,245,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>

          {/* Texto */}
          <div className="hero-text" style={{ flex: 1, maxWidth: 600 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05, color: "#0d1b2a", letterSpacing: -2, marginBottom: 8 }}>
              Hello, I am<br />
              <span style={{ background: "linear-gradient(135deg, #2a6ef5, #7c5cbf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Valeria Fernández
              </span>
            </h1>

            <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#64748b", fontWeight: 400, marginBottom: 20, letterSpacing: -0.3 }}>
              Frontend Developer &amp; UI/UX Designer
            </p>
            <p style={{ fontSize: 16, color: "#1e293b", lineHeight: 1.8, marginBottom: 28, maxWidth: 520 }}>
              I am a senior studying Computer Science and Multimedia Technology at the University of Costa Rica.
              I combine design and programming to create visual and functional solutions, working collaboratively
              in both technical and creative environments.
            </p>

            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 14, color: "#64748b", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Main Skills</p>
              <div className="chips" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["React", "Tailwind CSS", "Figma", "UI/UX", "HTML & CSS"].map((s) => (
                  <span key={s} style={{ background: "#fff", border: "1px solid #000b47", borderRadius: 100, padding: "8px 14px", fontSize: 14, fontWeight: 500, color: "#0d1b2a", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/CV_Valeria_Fernandez_Jimenez.pdf" download="CV_Valeria_Fernandez_Jimenez.pdf" className="btn-fill">
                <i className="ti ti-download" aria-hidden="true" /> Download CV
              </a>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>
                <i className="ti ti-mail" aria-hidden="true" /> Contact me
              </button>
            </div>
          </div>

          {/* Foto */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", width: 320, height: 360, background: "linear-gradient(135deg, rgba(42,110,245,0.12), rgba(124,92,191,0.15))", borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%", zIndex: 0 }} />
            <img
              src="/Foto Vale CV.jpg"
              alt="Valeria Fernández Jiménez"
              className="hero-photo"
              style={{ position: "relative", zIndex: 1, width: 400, height: 440, objectFit: "cover", objectPosition: "center", borderRadius: "20%", boxShadow: "0 24px 64px rgba(61,61,61,0.2)", border: "4px solid #fff" }}
            />
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="projects" ref={projectsRef} className="reveal" style={{ padding: "96px 6%", background: "#ffffff", width: "100%" }}>
        <SectionHeader title="Projects" />
        <p style={{ fontSize: 16, color: "#1e293b", lineHeight: 1.8, marginBottom: 40 }}>
          These projects were developed during my studies, using user-centered design and modern front-end development.
        </p>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contact" ref={contactRef} className="reveal" style={{ padding: "96px 6%", background: "#f8faff", width: "100%" }}>
        <SectionHeader title="Let's talk!" />
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 28 }}>
              Do you have an internship opening? I'd really like to learn more about your company and how I can contribute!
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "ti-mail",           label: "Email",    val: "vmfj1811@gmail.com",                        href: "mailto:vmfj1811@gmail.com" },
                { icon: "ti-brand-linkedin", label: "LinkedIn", val: "linkedin.com/in/valeria-fernandez-jimenez", href: "https://www.linkedin.com/in/valeria-fernandez-jimenez-b4383a2b7/" },
                { icon: "ti-phone",          label: "Phone",    val: "+506 7102 3228",                            href: "https://wa.me/+50671023228" },
              ].map(({ icon, label, val, href }) => (
                <a key={label} className="contact-card" href={href} target="_blank" rel="noreferrer">
                  <div style={{ width: 44, height: 44, background: "#dbeafe", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${icon}`} style={{ color: "#2a6ef5", fontSize: 20 }} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#0d1b2a" }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2a6ef5", textAlign: "center", padding: "32px 6%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", letterSpacing: -0.5 }}>
          Valeria Fernández Jiménez<span style={{ color: "#bfdbfe" }}>.</span>
        </div>
     
      </footer>
    </div>
  );
}

/* ── Sub-components ── */
function SectionHeader({ tag, title }) {
  return (
    <>
      {tag && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#2a6ef5", marginBottom: 10 }}>{tag}</div>}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#0d1b2a", letterSpacing: -1, marginBottom: 14 }}>{title}</div>
      <div style={{ width: 40, height: 3, background: "linear-gradient(90deg, #2a6ef5, #7c5cbf)", borderRadius: 4, marginBottom: 40 }} />
    </>
  );
}

function ProjectCard({ img, tags, title, desc, links }) {
  return (
    <div className="project-card">
      <div style={{ height: 180, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "20px 22px 24px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {tags.map(({ label, color }) => (
            <span key={label} style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 100,
              background: color === "purple" ? "#f3e8ff" : color === "green" ? "#dcfce7" : "#dbeafe",
              color:      color === "purple" ? "#7c3aed" : color === "green" ? "#16a34a" : "#1d4ed8",
            }}>{label}</span>
          ))}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, letterSpacing: -0.3 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 16 }}>{desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #e8eaf6" }}>
          {links.map(({ icon, label, href }) => (
            <a key={label} className="proj-link" href={href} target="_blank" rel="noreferrer">
              <i className={`ti ${icon}`} aria-hidden="true" /> {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Data ── */
const projects = [
  {
    img: "/Femsafe.png",
    tags: [{ label: "React", color: "purple" }, { label: "Tailwind", color: "purple" }, { label: "TypeScript", color: "purple" }],
    title: "FemSafe",
    desc: "FemSafe is a mobile app designed to help keep women safe; you can search for safe places, support centers, and dangerous areas.",
    links: [
      { icon: "ti-brand-github", label: "GitHub", href: "https://github.com/tamib0ke/FemSafe.git" },
      { icon: "ti-video", label: "App Video", href: "https://6f33fa7f78ea46e2aaca-my.sharepoint.com/:v:/g/personal/valeria_fernandezjimenez_ucr_ac_cr/IQDNaV_CTfWyTKHZW42GE34TAQJ7z4Xg-VFmkaLX91QeJos?e=2mDz7H" },
    ],
  },
  {
    img: "/SweetHoney.png",
    tags: [{ label: "PHP", color: "blue" }, { label: "JavaScript", color: "blue" }, { label: "SCSS", color: "blue" }, { label: "HTML", color: "blue" }],
    title: "Sweet Honey",
    desc: "Sweet Honey is a platformer game designed for children, where they can join Izzy the little bee on her adventure.",
    links: [
      { icon: "ti-brand-github", label: "GitHub", href: "https://github.com/valfer18/Sweet-Honey.git" },
      { icon: "ti-brand-figma", label: "Figma prototype", href: "https://www.figma.com/proto/twlUjci9Sq05JirphKIX67/Prototipo-Sweet-Honey?node-id=1-2&p=f&t=WpgHAbtEo1WcGKkf-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1" },
      { icon: "ti-video", label: "Game Video", href: "https://6f33fa7f78ea46e2aaca-my.sharepoint.com/:v:/g/personal/valeria_fernandezjimenez_ucr_ac_cr/IQB4xS0b55JGQJY4QH1QmdDDAfGsx0Tnsa301ZxVVFeUAdA?e=ELyOtn" },
    ],
  },
  {
    img: "/Puramente.png",
    tags: [{ label: "React", color: "green" }, { label: "PHP", color: "green" }, { label: "Blade", color: "green" }],
    title: "Puramente",
    desc: "Puramente is an educational app designed to enhance learning for school-age children through games. Login — Teacher: valeprofe@gmail.com | Puramente2026* · Student: valeriaf@gmail.com | Puramente2025",
    links: [
      { icon: "ti-brand-github", label: "GitHub", href: "https://github.com/tallermulti2025-PM/PuraMente---Desarrollo.git" },
      { icon: "ti-external-link", label: "App Demo", href: "https://puramente.vercel.app" },
    ],
  },
];