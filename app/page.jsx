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
  Menu,
  X
} from 'lucide-react'

const GITHUB_USERNAME = 'kingard888'
const skills = [ 
  {
    name: 'JavaScript',
    icon: 'javascript_icon.png'
  },
  {
    name: 'TypeScript',
    icon: 'typescript_icon.png'
  },
  {
    name: 'Go',
    icon: 'golang_icon.png'
  }
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
            <div><strong>WhatsApp</strong><span>Chat langsung melalui WhatsApp</span><b>@veryard</b></div>
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
            <a href={project.href} aria-label={`Lihat ${project.name}`} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noreferrer' : undefined}>
            <article className="project" key={project.name}>
              <div className="project-icon"><Code2 /></div>
                <div className="project-body">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags"><span>JavaScript</span><span>WhatsApp</span></div>
                 </div>
                 <ArrowUpRight />
                </article>
            </a>
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
