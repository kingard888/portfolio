'use client'

import { useEffect, useState } from 'react'
import {
  UserRound,
  Send,
  FolderGit2,
  Code2,
  CalendarDays,
  BriefcaseBusiness,
  ArrowUpRight,
  Github,
  Instagram,
  Menu,
  X
} from 'lucide-react'

const GITHUB_USERNAME = 'kingard888'
const skills = [ 
  {
    name: 'JavaScript',
    icon: '/assets/javascript_icon.png'
  },
  {
    name: 'TypeScript',
    icon: '/assets/typescript_icon.png'
  },
  {
    name: 'Go',
    icon: '/assets/golang_icon.png'
]

const projects = [
  {
    name: 'EmiliaBot',
    description: 'WhatsApp bot dengan berbagai fitur menarik dan lengkap.',
    href: 'https://chat.whatsapp.com/Hq88t1MzvkyEWCHjjQ7b13'
  },
  {
    name: 'lenwy-whatsmeow',
    description: 'Library untuk membuat WhatsApp Bot JavaScript menggunakan Whatsmeow.',
    href: `https://github.com/Lenwyy/lenwy-whatsmeow`
  }
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.51 2 2 6.47 2 11.97c0 1.75.46 3.46 1.34 4.96L2.06 22l5.19-1.35a10.03 10.03 0 0 0 4.79 1.22h.01c5.53 0 9.95-4.47 9.95-9.97C22 6.47 17.57 2 12.04 2Zm0 18.14h-.01a8.32 8.32 0 0 1-4.23-1.16l-.3-.18-3.08.8.82-3-.2-.31a8.28 8.28 0 0 1-1.27-4.32c0-4.58 3.73-8.3 8.31-8.3 2.22 0 4.3.86 5.86 2.42a8.23 8.23 0 0 1 2.43 5.87c0 4.58-3.73 8.18-8.33 8.18Zm4.56-6.2c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.21-.73-.65-1.22-1.44-1.36-1.69-.14-.25-.01-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.02 2.61.13.17 1.76 2.68 4.27 3.76.6.26 1.07.42 1.44.54.61.19 1.16.16 1.59.1.49-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [github, setGithub] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then(setGithub)
      .catch(() => setGithub(null))
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const avatar = github?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png?size=256`

  return (
    <main>
      <header className="site-header">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-star">✦</span>
          <span>Veryard</span>
        </a>

        <button
          className="menu-button"
          aria-label="Buka menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#about" onClick={closeMenu}><UserRound size={17} /> About</a>
          <a href="#contact" onClick={closeMenu}><Send size={17} /> Contact</a>
          <a href="#projects" onClick={closeMenu}><FolderGit2 size={17} /> Projects</a>
        </nav>
      </header>

      <section id="home" className="hero shell">
        <img src="/assets/anime-banner.png" alt="Anime banner" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">DEVELOPER • CREATOR</p>
        </div>
      </section>

      <section className="profile-card shell">
        <div className="profile-main">
          <img className="avatar" src={avatar} alt="Veryard GitHub profile" />
          <div>
            <h2>Veryard <span>✦</span></h2>
            <p>Lead Developer <b>•</b> EmiliaCompany</p>
          </div>
        </div>
        <div className="profile-info">
          <div><UserRound /><span>Nickname</span><strong>Veryard</strong></div>
          <div><UserRound /><span>Original Name</span><strong>Verdyan Arda</strong></div>
          <div><CalendarDays /><span>Date of Birth</span><strong>Sept, 21</strong></div>
          <div><BriefcaseBusiness /><span>Lead Developer</span><strong>EmiliaCompany</strong></div>
        </div>
      </section>

      <section id="about" className="section-card shell about-card">
        <SectionTitle icon={<UserRound />} title="About" />
        <div className="about-content">
          <div>
            <p>Saya adalah seorang developer pemula yang masih belajar. Saya memiliki project utama yaitu EmiliaBot, sebuah bot WhatsApp dengan banyak fitur menarik.</p>
            <p>Dan sedang mengembangkan project lenwy-whatsmeow, library untuk WhatsApp Bot JavaScript menggunakan Whatsmeow.</p>
            <blockquote>Keep Learning, Keep Building</blockquote>
          </div>
          <div className="about-art">
            <img src="/assets/about-banner.png" alt="Fantasy artwork" />
          </div>
        </div>
      </section>

      <section className="section-card shell">
        <SectionTitle icon={<Code2 />} title="Skills" />
        <div className="skills">
          {skills.map((skill) => (
            <div className="skill" key={skill.name}>
              <img className="skill-icon" src={`/assets/${skill.icon}`} alt={skill.name} />
              <div>
                <strong>{skill.name}</strong>
                <small>Programming Language</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-card shell">
        <SectionTitle icon={<Send />} title="Contact" />
        <div className="contact-grid">
          <a className="contact-card whatsapp" href="https://wa.me/6283153994043" target="_blank" rel="noreferrer">
            <span className="brand-contact-icon whatsapp-icon"><img src="/assets/whatsapp_icon.png" /></span>
            <div><strong>WhatsApp</strong><span>Chat langsung melalui WhatsApp</span><b>+62 831-5399-4043</b></div>
            <ArrowUpRight />
          </a>
          <a className="contact-card instagram" href="https://www.instagram.com/arda8888_?stkn=MTF3M2sxczV2ZWtjag==" target="_blank" rel="noreferrer">
            <span className="brand-contact-icon instagram-icon"><img src="/assets/instagram_icon.png" /></span>
            <div><strong>Instagram</strong><span>Follow untuk update terbaru</span><b>@arda8888_</b></div>
            <ArrowUpRight />
          </a>
          <a className="contact-card github" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">
            <span className="brand-contact-icon github-icon"><img src="/assets/github_icon.png" /></span>
            <div><strong>GitHub</strong><span>Source code & open-source projects</span><b>@{GITHUB_USERNAME}</b></div>
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section id="projects" className="section-card shell">
        <SectionTitle icon={<FolderGit2 />} title="Projects" />
        <div className="projects">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <div className="project-icon"><Code2 /></div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tags"><span>JavaScript</span><span>WhatsApp</span></div>
              </div>
              <a href={project.href} aria-label={`Lihat ${project.name}`} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noreferrer' : undefined}><ArrowUpRight /></a>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>✦</span><i></i><p>© 2026 Veryard</p><i></i><span>✦</span>
      </footer>
    </main>
  )
}

function SectionTitle({ icon, title }) {
  return (
    <div className="section-title">
      <div className="title-name">{icon}<h2>{title}</h2></div>
      <span className="title-line" />
    </div>
  )
}
