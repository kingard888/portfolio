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
  Music,
  Lock,
  Sun,
  Moon
} from 'lucide-react'

import THEME_CONFIG from './theme.config'

const GITHUB_USERNAME = 'kingard888'

const skills = [
  { name: 'JavaScript', icon: 'javascript_icon.png' },
  { name: 'TypeScript', icon: 'typescript_icon.png' },
  { name: 'Go', icon: 'golang_icon.png' }
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
    href: 'https://github.com/Lenwyy/lenwy-whatsmeow'
  }
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [github, setGithub] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTheme, setActiveTheme] = useState(THEME_CONFIG.activeTheme)

  const audioRef = useRef(null)
  const currentTrackRef = useRef(-1)

  const bgmTracks = [
    '/assets/bgm_0.mp3',
    '/assets/bgm_1.mp3',
    '/assets/bgm_2.mp3',
    '/assets/bgm_3.mp3'
  ]

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme
  }, [activeTheme])

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then((data) => {
        setGithub(data)

        if (data?.avatar_url) {
          const head = document.head
          const rels = ['icon', 'shortcut icon', 'apple-touch-icon']

          rels.forEach((rel) => {
            let link = document.querySelector(`link[rel="${rel}"]`)

            if (!link) {
              link = document.createElement('link')
              link.rel = rel
              head.appendChild(link)
            }

            link.href = data.avatar_url
          })
        }
      })
      .catch(() => setGithub(null))
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const avatar = github?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png?size=256`

  const playRandomBgm = () => {
    let nextTrack

    do {
      nextTrack = Math.floor(Math.random() * bgmTracks.length)
    } while (bgmTracks.length > 1 && nextTrack === currentTrackRef.current)

    currentTrackRef.current = nextTrack

    const audio = audioRef.current
    if (!audio) return

    audio.src = bgmTracks[nextTrack]
    audio.load()

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }

  const handleStart = () => {
    if (!isStarted) {
      const audio = new Audio()
      audio.loop = false
      audio.volume = 0.15

      audio.addEventListener('ended', playRandomBgm)

      audioRef.current = audio

      setIsStarted(true)
      playRandomBgm()
    }
  }

  const handleNavClick = () => {
    closeMenu()

    if (!isStarted) {
      handleStart()
    }
  }

  const toggleBgm = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const toggleTheme = () => {
    setActiveTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <header className="site-header">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-star">Рюд</span>
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
            <a href="#about" onClick={handleNavClick}><UserRound size={17} /> About</a>
            <a href="#contact" onClick={handleNavClick}><Send size={17} /> Contact</a>
            <a href="#projects" onClick={handleNavClick}><FolderGit2 size={17} /> Projects</a>

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Ganti tema">
              {activeTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{activeTheme === 'light' ? 'Silver Mist' : 'Dark Fantasy'}</span>
            </button>

            {isStarted && (
              <button className="bgm-toggle" onClick={toggleBgm}>
                {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{isPlaying ? 'BGM' : 'Mute'}</span>
              </button>
            )}
          </nav>
        </header>

        <section id="home" className="hero shell">
          <img
            src={activeTheme === 'light'
              ? '/assets/anime-banner-light.jpg'
              : '/assets/anime-banner.png'}
            alt="Anime banner"
          />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <span className="eyebrow">WELCOME TO MY PORTFOLIO</span>
            <h1>Veryard <span>Рюд</span></h1>
            <p className="hero-subtitle">Lead Developer <b>Рђб</b> EmiliaCompany</p>
            <span className="hero-line" />
            <p className="hero-quote">РђюKeep Learning, Keep Building.РђЮ</p>
          </div>
        </section>

        <div className="content-wrapper">
          {!isStarted && (
            <div
              className="start-overlay"
              onClick={handleStart}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') handleStart()
              }}
            >
              <div className="start-card">
                <div className="start-icon"><Lock size={22} /></div>
                <h3>Interactive Experience</h3>
                <p>Klik di mana saja atau tekan tombol di bawah untuk membuka penuh portofolio & memutar BGM.</p>
                <button className="start-button" onClick={handleStart}>
                  <Music size={16} /> PRESS START TO UNLOCK
                </button>
              </div>
            </div>
          )}

          <div className={!isStarted ? 'portfolio-content locked' : 'portfolio-content'}>
            <section className="profile-card shell">
              <div className="profile-main">
                <img className="avatar" src={avatar} alt="Veryard GitHub profile" />
                <div>
                  <h2>Veryard <span>Рюд</span></h2>
                  <p>Lead Developer <b>Рђб</b> EmiliaCompany</p>
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
                  <span className="brand-contact-icon whatsapp-icon"><img src="/assets/whatsapp_icon.png" alt="" /></span>
                  <div><strong>WhatsApp</strong><span>Chat langsung melalui WhatsApp</span><b>@veryard</b></div>
                  <ArrowUpRight />
                </a>

                <a className="contact-card instagram" href="https://www.instagram.com/arda8888_?stkn=MTF3M2sxczV2ZWtjag==" target="_blank" rel="noreferrer">
                  <span className="brand-contact-icon instagram-icon"><img src="/assets/instagram_icon.png" alt="" /></span>
                  <div><strong>Instagram</strong><span>Follow untuk update terbaru</span><b>@arda8888_</b></div>
                  <ArrowUpRight />
                </a>

                <a className="contact-card github" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">
                  <span className="brand-contact-icon github-icon"><img src="/assets/github_icon.png" alt="" /></span>
                  <div><strong>GitHub</strong><span>Source code & open-source projects</span><b>@{GITHUB_USERNAME}</b></div>
                  <ArrowUpRight />
                </a>
              </div>
            </section>

            <section id="projects" className="section-card shell">
              <SectionTitle icon={<FolderGit2 />} title="Projects" />
              <div className="projects">
                {projects.map((project) => (
                  <a
                    href={project.href}
                    key={project.name}
                    aria-label={`Lihat ${project.name}`}
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <article className="project">
                      <div className="project-icon"><Code2 /></div>
                      <div className="project-body">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className="tags">
                          <span>JavaScript</span>
                          <span>Golang</span>
                          <span>Whatsmeow</span>
                          <span>WhatsApp</span>
                        </div>
                      </div>
                      <ArrowUpRight />
                    </article>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer>
        <span>Рюд</span><i></i><p>┬Е 2026 Veryard</p><i></i><span>Рюд</span>
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
