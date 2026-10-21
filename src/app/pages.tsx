import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router"

type Category = "Video" | "Fotografie" | "Gestaltung" | "Web"
type Project = {
  id: number
  slug: string
  category: Category
  tone: string
  example: string
}
const projects: Project[] = [
  {
    id: 1,
    slug: "projekt-01",
    category: "Video",
    tone: "coral",
    example: "Kamera · Schnitt",
  },
  {
    id: 2,
    slug: "projekt-02",
    category: "Fotografie",
    tone: "lilac",
    example: "Fotografie · Bildauswahl",
  },
  {
    id: 3,
    slug: "projekt-03",
    category: "Gestaltung",
    tone: "rose",
    example: "Konzept · Gestaltung",
  },
  {
    id: 4,
    slug: "projekt-04",
    category: "Web",
    tone: "blue",
    example: "Layout · Umsetzung",
  },
  {
    id: 5,
    slug: "projekt-05",
    category: "Video",
    tone: "peach",
    example: "Schnitt · Postproduktion",
  },
  {
    id: 6,
    slug: "projekt-06",
    category: "Fotografie",
    tone: "plum",
    example: "Kamera · Bildbearbeitung",
  },
]
const projectUrl = (project: Project) => `/projekte/${project.slug}`
const number = (id: number) => String(id).padStart(2, "0")
const introduction =
  "Ich bin Mediamatikerin in Ausbildung im Technikteam von Blick. Mich interessieren Kameras und die Geschichten dahinter."
let introductionShown = false

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  )
}
function Marker({
  children,
  animate = false,
}: {
  children: ReactNode
  animate?: boolean
}) {
  return (
    <span className={`marker${animate ? " marker--intro marker--caret" : ""}`}>
      {children}
    </span>
  )
}
function MediaPlaceholder({
  label,
  tone = "portrait",
  className = "",
}: {
  label: string
  tone?: string
  className?: string
}) {
  return (
    <div
      className={`media-placeholder media-placeholder--${tone} ${className}`}
    >
      <span className="media-placeholder__label">
        Platzhalter
        <br />
        {label}
      </span>
    </div>
  )
}
function PageHeading({
  label,
  children,
  intro,
}: {
  label: string
  children: ReactNode
  intro?: string
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{label}</p>
      <h1>{children}</h1>
      {intro && <p className="page-heading__intro">{intro}</p>}
    </header>
  )
}

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const main = useRef<HTMLElement>(null)
  const initialLocation = useRef(location.key)
  useEffect(() => {
    setMenuOpen(false)
    document.documentElement.lang = "de-CH"
    const section = location.pathname.startsWith("/projekte")
      ? "Projekte"
      : location.pathname === "/ueber-mich"
        ? "Über mich"
        : location.pathname === "/kontakt"
          ? "Kontakt"
          : location.pathname === "/"
            ? "Portfolio"
            : "Yara"
    document.title = `${section} · Yara`
    if (initialLocation.current !== location.key)
      main.current?.focus({ preventScroll: true })
  }, [location])
  return (
    <div className="app-shell">
      <a href="#seiteninhalt" className="skip-link">
        Zum Inhalt
      </a>
      <header className="site-header">
        <NavLink to="/" end className="wordmark" aria-label="Yara – Startseite">
          Yara<span className="wordmark__dot">.</span>
        </NavLink>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          aria-label="Hauptnavigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false)
              menuButton.current?.focus()
            }
          }}
        >
          <NavLink to="/" end>
            Start
          </NavLink>
          <NavLink to="/projekte">Projekte</NavLink>
          <NavLink to="/ueber-mich">Über mich</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </nav>
      </header>
      <main id="seiteninhalt" ref={main} tabIndex={-1}>
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <footer className="site-footer">
        <Link to="/">Yara · Portfolio</Link>
        <nav aria-label="Fussnavigation">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Nach oben <span aria-hidden="true">↑</span>
          </button>
          <NavLink to="/impressum">Impressum</NavLink>
          <NavLink to="/datenschutz">Datenschutz</NavLink>
        </nav>
      </footer>
      <ScrollRestoration />
    </div>
  )
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  return (
    <article
      className={`project-card${featured ? " project-card--featured" : ""}`}
    >
      <Link
        className="project-card__media"
        to={projectUrl(project)}
        aria-label={`Projekt ${number(project.id)} – ${project.category} ansehen`}
      >
        <MediaPlaceholder
          label={`Projektbild ${number(project.id)}`}
          tone={project.tone}
        />
      </Link>
      <div className="project-card__meta">
        <div>
          <p className="eyebrow">
            {featured ? "Hauptprojekt · " : ""}
            {project.category} · Platzhalter {number(project.id)}
          </p>
          <h2>
            <Link to={projectUrl(project)}>Projektname ergänzen</Link>
          </h2>
        </div>
        <Link
          to={projectUrl(project)}
          className="icon-button"
          aria-label={`Projekt ${number(project.id)} öffnen`}
        >
          <Arrow />
        </Link>
      </div>
      <p className="project-contribution">
        <strong>Mein Beitrag</strong>
        <span>{project.example}</span>
        <small>Beispiel · Platzhalter – tatsächlichen Beitrag ergänzen</small>
      </p>
    </article>
  )
}

export function HomePage() {
  const [animate] = useState(() => !introductionShown)
  useEffect(() => {
    introductionShown = true
  }, [])
  return (
    <>
      <section className="hero hero--personal" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Portfolio · Medien, Gestaltung & Technik</p>
          <h1 id="hero-title">
            <span className="hero__greeting">Hoi, ich bin</span>
            <Marker animate={animate}>Yara.</Marker>
          </h1>
          <p className="hero__intro">{introduction}</p>
          <div className="button-group">
            <Link className="button button--primary" to="/projekte">
              Alle Projekte <Arrow />
            </Link>
            <Link className="button button--secondary" to="/ueber-mich">
              Über mich <Arrow />
            </Link>
          </div>
        </div>
        <figure className="hero__visual">
          <MediaPlaceholder label="Yara bei einer Produktion" tone="hero" />
          <figcaption>
            Ein Blick hinter die Kamera.{" "}
            <span>Produktionsbild oder Showreel ergänzen.</span>
          </figcaption>
        </figure>
      </section>
      <section
        className="projects section home-selection"
        aria-labelledby="selection-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Einblicke in meine Arbeit</p>
            <h2 id="selection-title">
              Drei <Marker>Einblicke.</Marker>
            </h2>
          </div>
          <Link to="/projekte" className="text-link">
            Alle Projekte <Arrow />
          </Link>
        </div>
        <p className="placeholder-notice">
          Hier ist Platz für drei ausgewählte Arbeiten. Projektnamen, Medien und
          Beiträge sind noch Platzhalter.
        </p>
        <div className="project-grid project-grid--editorial">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
      <section className="home-about section">
        <p className="eyebrow">Mehr als das fertige Bild</p>
        <h2>
          Mich interessiert auch,
          <br />
          was dahintersteckt.
        </h2>
        <Link className="button button--secondary" to="/ueber-mich">
          Lerne mich kennen <Arrow />
        </Link>
      </section>
    </>
  )
}

export function ProjectsPage() {
  const filters = ["Alle", "Video", "Fotografie", "Gestaltung", "Web"] as const
  const [filter, setFilter] = useState<typeof filters[number]>("Alle")
  const visible = projects.filter(
    (project) => filter === "Alle" || project.category === filter,
  )
  return (
    <div className="projects-page">
      <PageHeading
        label="Meine Arbeiten"
        intro="Video, Fotografie, Gestaltung und Web. Hier bekommen die Projekte ihren Platz – und mein Beitrag wird sichtbar."
      >
        Meine <Marker>Projekte.</Marker>
      </PageHeading>
      <section className="section projects-list" aria-label="Projektübersicht">
        <div className="filters" aria-label="Projekte filtern">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter${filter === item ? " filter--active" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="placeholder-notice">
          Alle sechs Einträge sind Projektplatzhalter. Die Beitragsangaben sind
          ausdrücklich Beispiele, keine bestätigten Tätigkeiten.
        </p>
        <p className="result-count" role="status">
          {visible.length}{" "}
          {visible.length === 1 ? "Projektplatzhalter" : "Projektplatzhalter"} ·{" "}
          {filter}
        </p>
        <div className="project-grid project-grid--editorial">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage />
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <div className="project-detail">
      <section className="project-intro">
        <Link className="text-link text-link--back" to="/projekte">
          <span aria-hidden="true">←</span> Zur Projektübersicht
        </Link>
        <p className="eyebrow">
          {project.category} · Projektplatzhalter {number(project.id)}
        </p>
        <h1>Projektname ergänzen</h1>
        <p className="project-intro__dek">
          Platzhalter: Hier in ein bis zwei Sätzen erklären, worum es geht, für
          wen das Projekt entstand und welches Ziel es hatte.
        </p>
      </section>
      <MediaPlaceholder
        label="Grosse Medienvorschau ergänzen"
        tone={project.tone}
        className="project-hero-media"
      />
      <section
        className="project-story section"
        aria-label="Projektbeschreibung"
      >
        <aside className="project-facts">
          <div>
            <p className="eyebrow">Kategorie</p>
            <p>{project.category}</p>
          </div>
          <div>
            <p className="eyebrow">Tools</p>
            <p>Platzhalter · Tools ergänzen</p>
          </div>
          <div>
            <p className="eyebrow">Zeitraum</p>
            <p>Platzhalter · Zeitraum ergänzen</p>
          </div>
        </aside>
        <div className="project-copy">
          {[
            [
              "Auftrag",
              "Platzhalter: Ausgangslage, Auftrag und Zielgruppe verständlich beschreiben.",
            ],
            [
              "Mein Beitrag",
              `Beispiel · Platzhalter: ${project.example}. Hier den tatsächlichen eigenen Beitrag, die Verantwortung und selbst ausgeführte Arbeitsschritte ergänzen.`,
            ],
            [
              "Vorgehen",
              "Platzhalter: Prozess, Zusammenarbeit und wichtige gestalterische oder technische Entscheidungen ergänzen.",
            ],
            [
              "Ergebnis",
              "Platzhalter: Resultat und Erkenntnisse ergänzen. Aussagen zur Wirkung nur mit nachvollziehbaren Angaben aufnehmen.",
            ],
          ].map(([title, text], index) => (
            <article
              key={title}
              className={index === 1 ? "project-copy__highlight" : ""}
            >
              <p className="project-copy__number">{number(index + 1)}</p>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="gallery section" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Prozess & Ergebnis</p>
            <h2 id="gallery-title">Galerie</h2>
          </div>
        </div>
        <div className="gallery__grid">
          {[1, 2, 3].map((id) => (
            <MediaPlaceholder
              key={id}
              label={`Galeriebild ${number(id)} ergänzen`}
              tone={project.tone}
            />
          ))}
        </div>
      </section>
      <section className="next-project">
        <p className="eyebrow">
          Weiter zu Platzhalter {number(next.id)} · {next.category}
        </p>
        <Link className="next-project__link" to={projectUrl(next)}>
          <span>Nächstes Projekt</span>
          <Arrow />
        </Link>
        <Link className="text-link" to="/projekte">
          Zur Projektübersicht <Arrow />
        </Link>
      </section>
    </div>
  )
}

export function AboutPage() {
  return (
    <>
      <section className="about-intro section">
        <div>
          <PageHeading label="Über mich">
            Ich bin <Marker>Yara.</Marker>
          </PageHeading>
          <p className="about__lead">{introduction}</p>
          <p className="placeholder-notice">
            Ausbildungsjahr, Zeitraum und weitere persönliche Angaben: noch
            ergänzen.
          </p>
        </div>
        <MediaPlaceholder label="Porträt von Yara" />
      </section>
      <section className="work-life section" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Meine Ausbildung</p>
            <h2 id="work-title">
              Was ich bei
              <br />
              <Marker>Blick</Marker> mache
            </h2>
          </div>
        </div>
        <div className="work-life__grid">
          <MediaPlaceholder label="Bild aus meinem Arbeitsalltag" tone="hero" />
          <div className="work-tasks">
            {[
              [
                "Eine konkrete Tätigkeit",
                "Welche Aufgabe übernehme ich im Technikteam? Hier eine echte Tätigkeit und meinen Verantwortungsbereich ergänzen.",
              ],
              [
                "So arbeite ich im Team",
                "Mit wem arbeite ich zusammen? Hier einen konkreten Ablauf aus meinem Arbeitsalltag beschreiben.",
              ],
              [
                "Was ich gerade lerne",
                "Hier einen aktuellen Ausbildungsinhalt und eine konkrete Lernaufgabe ergänzen.",
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <p className="eyebrow">{number(index + 1)} · Platzhalter</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="interests section" aria-labelledby="interests-title">
        <p className="eyebrow">Persönlich</p>
        <h2 id="interests-title">Was mich interessiert</h2>
        <div className="interests__list">
          {[
            [
              "Kameras",
              "Mich interessieren Kameras und die Geschichten dahinter.",
            ],
            ["Technik", "Technik gehört zu meinen persönlichen Interessen."],
            ["Sportjournalismus", "Auch Sportjournalismus interessiert mich."],
          ].map(([title, text], index) => (
            <article key={title}>
              <span>{number(index + 1)}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/kontakt">
          Schreib mir <Arrow />
        </Link>
      </section>
    </>
  )
}

export function ContactPage() {
  return (
    <section className="contact-page section">
      <PageHeading
        label="Kontakt"
        intro="Du möchtest mich kennenlernen oder mehr über ein Projekt erfahren? Ich freue mich auf deine Nachricht."
      >
        Sagen wir <Marker>Hoi.</Marker>
      </PageHeading>
      <div className="contact-details">
        <div className="contact-email">
          <p className="eyebrow">Per E-Mail</p>
          <a href="mailto:email@example.com">
            email@example.com <Arrow />
          </a>
          <p className="placeholder-notice">
            Platzhalter · durch meine echte E-Mail-Adresse ersetzen.
          </p>
        </div>
        <div className="social-placeholders">
          <p className="eyebrow">Social Media</p>
          <p>Hier finden meine Profile ihren Platz.</p>
          <div className="social-placeholder" aria-disabled="true">
            <span>Profil-Link 01</span>
            <small>Platzhalter · URL fehlt</small>
          </div>
          <div className="social-placeholder" aria-disabled="true">
            <span>Profil-Link 02</span>
            <small>Platzhalter · URL fehlt</small>
          </div>
          <p className="placeholder-notice">
            Die Links werden aktiviert, sobald die tatsächlichen Profile
            vorliegen.
          </p>
        </div>
      </div>
    </section>
  )
}

export function LegalPage({ title }: { title: string }) {
  return (
    <section className="section legal-page">
      <PageHeading label="Rechtliches">{title}</PageHeading>
      <p>Platzhalter · Die rechtlichen Angaben sind noch zu ergänzen.</p>
      <p>
        Diese Seite enthält noch keine vollständigen rechtlichen Informationen.
      </p>
      <Link className="text-link" to="/kontakt">
        Zum Kontakt <Arrow />
      </Link>
    </section>
  )
}
export function NotFoundPage() {
  return (
    <section className="section">
      <PageHeading
        label="404 · Seite nicht gefunden"
        intro="Diese Seite gibt es nicht. Vielleicht findest du unter meinen Projekten, was du suchst."
      >
        Hier geht’s nicht weiter.
      </PageHeading>
      <Link className="button button--primary" to="/projekte">
        Zur Projektübersicht <Arrow />
      </Link>
    </section>
  )
}
