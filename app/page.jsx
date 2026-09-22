'use client'

import { useEffect, useState, useRef } from 'react'
import {
  UserRound,
  Send,
  FolderGit2,
  Code2,
  CalendarDays,
  BriefcaseBusiness,
  ArrowUpRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  Music
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
  
  // State & Ref untuk BGM
  const [isStarted, setIsStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

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

  // Fungsi Start BGM & Buka Portofolio
  const handleStart = () => {
    const audio = new Audio('/assets/bgm.mp3')
    audio.loop = true
    audio.volume = 0.15
    audioRef.current = audio

    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {})

    setIsStarted(true)
  }

  // Fungsi Toggle Play/Pause BGM di Header
  const toggleBgm = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

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

          {/* Tombol Control BGM di Nav Header */}
          {isStarted && (
            <button
              onClick={toggleBgm}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: '20px',
                padding: '6px 12px',
                color: '#c084fc',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isPlaying ? 'BGM' : 'Mute'}</span>
            </button>
          )}
        </nav>
      </header>

      {/* BANNER */}
      <section id="home" className="hero shell">
        <img src="/assets/anime-banner.png" alt="Anime banner" />
        <div className="hero-overlay" />
        <div className="hero-copy"></div>
      </section>

      {/* TOMBOL PRESS START DI BAWAH BANNER */}
      {!isStarted && (
        <div className="shell" style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            onClick={handleStart}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'rgba(147, 51, 234, 0.2)',
              border: '1px solid rgba(192, 132, 252, 0.6)',
              borderRadius: '16px',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
              letterSpacing: '2px',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(147, 51, 234, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: 'inherit'
            }}
          >
            <Music size={18} /> PRESS START TO UNLOCK EXPERIENCE
          </button>
        </div>
      )}

      {/* SELURUH INFO PORTOFOLIO (Baru Muncul Setelah Diklik) */}
      {isStarted && (
        <>
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
                <a href={project.href} key={project.name} aria-label={`Lihat ${project.name}`} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noreferrer' : undefined}>
                  <article className="project">
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
        </>
      )}
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
