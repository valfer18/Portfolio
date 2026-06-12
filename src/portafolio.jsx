import { useEffect, useRef } from "react";

function useRevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}


export default function Portfolio() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const aboutRef = useRevealOnScroll();
  const projectsRef = useRevealOnScroll();
  const contactRef = useRevealOnScroll();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#ffffff", color: "#1e293b", overflowX: "hidden" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .nav-link { font-size: 16px; font-weight: 500; color: #ffffff; letter-spacing: 0.3px; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #2a6ef5; }

        .btn-fill {
          background: #2a6ef5; color: #fff; border: none;
          padding: 14px 30px; border-radius: 12px; font-size: 20px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: all 0.25s; box-shadow: 0 4px 20px rgba(42,110,245,0.3);
          font-family: 'Inter', sans-serif;
        }
        .btn-fill:hover { background: #1d5ce0; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(42,110,245,0.35); }

        .btn-ghost {
          background: #ffffff; color: #0d1b2a; border: 1.5px solid #130144;
          padding: 14px 30px; border-radius: 12px; font-size: 20px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: all 0.25s; font-family: 'Inter', sans-serif;
        }
        .btn-ghost:hover { border-color: #a5b4fc; background: #f5f3ff; transform: translateY(-1px); }

        .project-card {
          background: #fff; border: 1px solid #e8eaf6; border-radius: 20px;
          overflow: hidden; transition: all 0.3s;
        }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.09); border-color: #c7d2fe; }

        .contact-card {
          display: flex; align-items: center; gap: 16px;
          background: #f8faff; border: 1px solid #e8eaf6; border-radius: 14px;
          padding: 16px 20px; transition: all 0.2s; text-decoration: none;
        }
        .contact-card:hover { border-color: #a5b4fc; background: #f5f3ff; transform: translateX(4px); }

        .proj-link { font-size: 13px; font-weight: 600; color: #2a6ef5; display: flex; align-items: center; gap: 5px; transition: gap 0.2s; }
        .proj-link:hover { gap: 8px; }

        .skill-fill { height: 8px; border-radius: 8px; background: linear-gradient(90deg, #2a6ef5, #7c5cbf); }

        input, textarea {
          background: #f8faff; border: 1.5px solid #e8eaf6; border-radius: 10px;
          padding: 12px 16px; font-size: 14px; color: #0d1b2a; font-family: 'Inter', sans-serif;
          transition: border-color 0.2s, background 0.2s; resize: none; width: 100%;
        }
        input:focus, textarea:focus { outline: none; border-color: #2a6ef5; background: #ffffff; }
        input::placeholder, textarea::placeholder { color: #b0b8cc; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%", height: 64,
        background: "#2a6ef5", backdropFilter: "blur(16px)",
        bordershadow: "0 4px 12px rgba(40, 102, 226, 0.3)",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#ffffff", letterSpacing: "-0.5px" }}>
          Valeria Fernández Jiménez<span style={{ color: "#2a6ef5" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 36  , color: "#ffffff" }}>
          {["about", "projects", "contact"].map((id, i) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {["About me", "Projects", "Contact me"][i]}
            </span>
          ))}
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
   


      <section id="about" ref={aboutRef} className="reveal" style={{
  minHeight: "100vh", display: "flex", alignItems: "center",
  padding: "10% 10% 10%", background: "#f8faff",
  position: "relative", overflow: "hidden",
}}>
  {/* Círculos decorativos */}
  <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", right: -120, top: -120, background: "radial-gradient(circle, rgba(124,92,191,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
  <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", left: -60, bottom: -60, background: "radial-gradient(circle, rgba(42,110,245,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

  {/* Layout de dos columnas */}
  <div style={{
    position: "relative", zIndex: 1, width: "100%",
    display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 10,
  }}>

    {/* ── Columna izquierda: texto ── */}
    <div style={{ flex: 1, maxWidth: 600 }}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(42px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05,
        color: "#0d1b2a", letterSpacing: -2, marginBottom: 8,
      }}>
        Hello, I am<br />
        <span style={{
          background: "linear-gradient(135deg, #2a6ef5, #7c5cbf)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Valeria Fernández
        </span>
      </h1>

      <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#64748b", fontWeight: 400, marginBottom: 24, letterSpacing: -0.3 }}>
        Frontend Developer &amp; UI/UX Designer
      </p>
      <p style={{ fontSize: 16, color: "#000000", lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}>
        I am a senior studying Computer Science and Multimedia Technology at the University of Costa Rica.
        I am interested in front-end development, UX/UI design, and software quality. I combine design and 
        programming to create visual and functional solutions, working collaboratively in both technical and
        creative environments.
      </p> 
      
      <div>
        <h1 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#64748b", fontWeight: 400, marginBottom: 10, letterSpacing: -0.3 }}>Main Skills</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        
        {["React", "Tailwind CSS", "Figma", "UI/UX", "HTML & CSS" ].map((s) => (
          <span key={s} style={{
            background: "#ffffff", border: "1px solid #000b47", borderRadius: 100, marginBottom: 40,
            padding: "14px 14px", fontSize: 15, fontWeight: 500, color: "#000000",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>{s}</span>
        ))}
      </div>

      </div>
   

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
        <a
          href="public/CV_Valeria_Fernandez_Jimenez.pdf"
          download="CV_Valeria_Fernandez_Jimenez.pdf"
          className="btn-fill"
          style={{ textDecoration: "none" }}
        >
          <i className="ti ti-download" aria-hidden="true" /> Download CV
        </a>
        <button className="btn-ghost" onClick={() => scrollTo("contact")}>
          <i className="ti ti-mail" aria-hidden="true" /> Contact me
        </button>
      </div>

     
    </div>

    {/* ── Columna derecha: foto ── */}
    <div className="reveal-right" style={{
      flexShrink: 0, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      marginRight: 50,
    }}>
      {/* Blob decorativo detrás de la foto */}
      <div style={{
        position: "absolute", width: 340, height: 380,
        background: "linear-gradient(135deg, rgba(42,110,245,0.12), rgba(124,92,191,0.15))",
        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
        zIndex: 0,
      }} />

      <img
        src="/Foto Vale CV.jpg"
        alt="Valeria Fernández Jiménez"
        style={{
          position: "relative", zIndex: 1,
          width: 500, height: 500,
          objectFit: "cover", objectPosition: "center",
          borderRadius: "20% 20% 20% 20%",
          boxShadow: "0 24px 64px rgba(61, 61, 61, 0.2), 0 8px 24px rgba(0,0,0,0.08)",
          border: "4px solid #ffffff",
        }}
      />
    </div>

  </div>
</section>


      {/* ── PROYECTOS ─────────────────────────────────────────── */}
      <section id="projects" ref={projectsRef} className="reveal" style={{ padding: "96px 6%", background: "#f8faff", height: "h-screen" }}>
        <SectionHeader title="Projects" />
        <p style={{ fontSize: 20, color: "#000000", lineHeight: 1.8, marginBottom: 40 }}>
         These projects were developed during my studies, using user-centered design and modern front-end development.
        </p>
        <div clasn style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* ── CONTACTO ──────────────────────────────────────────── */}
      <section id="contact" ref={contactRef} className="reveal" style={{ padding: "96px 6%", background: "#ffffff", height: "h-screen" }}>
        <SectionHeader tag="Contact me" title="Let's talk!" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 28 }}>
             Do you have an internship opening? I'd really like to learn more about your company and how I can contribute!
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "ti-mail", label: "Correo electrónico", val: "vmfj1811@gmail.com", href: "mailto:vmfj1811@gmail.com" },
                { icon: "ti-brand-linkedin", label: "LinkedIn", val: "linkedin.com/in/valeria-fernandez-jimenez", href: "https://www.linkedin.com/in/valeria-fernandez-jimenez-b4383a2b7/" },
                { icon: "ti-phone", label: "Teléfono", val: "+506 7102 3228", href: "https://wa.me/+50671023228" },
               
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

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: "#2a6ef5", color: "#9da8b8", textAlign: "center", padding: "32px 6%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", letterSpacing: -0.5 }}>
          Valeria Fernández Jiménez<span style={{ color: "#a9dfff" }}>.</span>
        </div>
      </footer>

    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function SectionHeader({ tag, title }) {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#2a6ef5", marginBottom: 10 }}>{tag}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 900, color: "#0d1b2a", letterSpacing: -1, marginBottom: 14 }}>{title}</div>
      <div style={{ width: 40, height: 3, background: "linear-gradient(90deg, #2a6ef5, #7c5cbf)", borderRadius: 4, marginBottom: 40 }} />
    </>
  );
}

function FormField({ label, type, placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#0d1b2a" }}>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

function ProjectCard({ img, tags, title, desc, links }) {
  return (
    <div className="project-card">
      <div style={{ height: 170, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52}}>
        <img 
        src={img} 
        alt={title} 
        style={{ 
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
            }} 
            />
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {tags.map(({ label, color }) => (
            <span key={label} style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 100,
              background: color === "purple" ? "#f3e8ff" : color === "green" ? "#dcfce7" : "#dbeafe",
              color: color === "purple" ? "#7c3aed" : color === "green" ? "#16a34a" : "#1d4ed8",
            }}>{label}</span>
          ))}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0d1b2a", marginBottom: 8, letterSpacing: -0.3 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 18 }}>{desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 14, borderTop: "1px solid #e8eaf6" }}>
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

/* ── Data ───────────────────────────────────────────────── */

const projects = [
  {
    img: "/Femsafe.png",
    tags: [{ label: "React", color: "purple" }, { label: "Tailwind", color: "purple" }, {label: "TypeScript", color: "purple"}],
    title: "FemSafe",
    desc: "FemSafe is a mobile app designed to help keep women safe; you can search for safe places, support centers, and dangerous areas.",
    links: [{ icon: "ti-brand-github", label: "Github", href: "https://github.com/tamib0ke/FemSafe.git" }, { icon: "ti-video", label: "App Video", href: "https://6f33fa7f78ea46e2aaca-my.sharepoint.com/:v:/g/personal/valeria_fernandezjimenez_ucr_ac_cr/IQDNaV_CTfWyTKHZW42GE34TAQJ7z4Xg-VFmkaLX91QeJos?e=2mDz7H" }],
  },
  {
    img: "/SweetHoney.png",
    tags: [{ label: "PHP", color: "blue" }, { label: "JavaScript", color: "blue" }, { label: "SCSS", color: "blue" }, {label: "HTML", color: "blue"}],
    title: "Sweet Honey",
    desc: "Sweet Honey is a platformer game designed for children, where they can join Izzy the little bee on her adventure.",
    links: [{ icon: "ti-brand-github", label: "GitHub", href: "https://github.com/valfer18/Sweet-Honey.git" }, { icon: "ti-brand-figma", label: "Figma prototype", href: "https://www.figma.com/proto/twlUjci9Sq05JirphKIX67/Prototipo-Sweet-Honey?node-id=1-2&p=f&t=WpgHAbtEo1WcGKkf-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1" }, { icon: "ti-video", label: "Game Video", href: "https://6f33fa7f78ea46e2aaca-my.sharepoint.com/:v:/g/personal/valeria_fernandezjimenez_ucr_ac_cr/IQB4xS0b55JGQJY4QH1QmdDDAfGsx0Tnsa301ZxVVFeUAdA?e=ELyOtn" }],
  },

  {
    img: "/Puramente.png",
    tags: [{ label: "React", color: "green" }, { label: "PHP", color: "green" }, { label: "Blade", color: "green" }],
    title: "Puramente",
    desc: "Puramente is an educational app designed to enhance the learning process for school-age children through games. " +
    "Login credentials: Teacher: valeprofe@gmail.com | Puramente2026* - Student: valeriaf@gmail.com | Puramente2025",
    links: [{ icon: "ti-brand-github", label: "GitHub", href: "https://github.com/tallermulti2025-PM/PuraMente---Desarrollo.git"}, { icon: "ti-external-link", label: "App Demo", href: "https://puramente.vercel.app" ,  }],
  },
];