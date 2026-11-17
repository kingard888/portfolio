'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
  Lock
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

const BGM_TRACKS = [
  '/assets/bgm_0.mp3',
  '/assets/bgm_1.mp3',
  '/assets/bgm_2.mp3',
  '/assets/bgm_3.mp3'
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [github, setGithub] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)
  const currentTrackRef = useRef(-1)
  const isStartedRef = useRef(false)

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

  // Gunakan satu elemen <audio> yang dirender React.
  // Tidak membuat instance Audio baru setiap kali tombol ditekan.
  const playRandomBgm = useCallback(() => {
    const audio = audioRef.current
    if (!audio || BGM_TRACKS.length === 0) return

    let nextTrack = 0

    if (BGM_TRACKS.length > 1) {
      do {
        nextTrack = Math.floor(Math.random() * BGM_TRACKS.length)
      } while (nextTrack === currentTrackRef.current)
    }

    currentTrackRef.current = nextTrack
    audio.pause()
    audio.currentTime = 0
    audio.src = BGM_TRACKS[nextTrack]
    audio.load()

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }, [])

  const handleStart = () => {
    if (isStartedRef.current) return

    const audio = audioRef.current
    if (!audio) return

    // Kunci diset secara sinkron sebelum memulai playback.
    isStartedRef.current = true
    audio.volume = 0.15
    setIsStarted(true)
    playRandomBgm()
  }

  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = () => {
    closeMenu()
    handleStart()
  }

  const toggleBgm = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }

  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
      }
      audioRef.current = null
      isStartedRef.current = false
    }
  }, [])

  const avatar = github?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png?size=256`

  return (
    <main data-theme={THEME_CONFIG.activeTheme} translate="no" className="notranslate">
      <audio ref={audioRef} preload="none" onEnded={playRandomBgm} onPause={() => setIsPlaying(false)} onPlay={() => setIsPlaying(true)} />
      <div className="page-content">
        <header className="site-header">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-star" aria-hidden="true">*</span>
            <span>Veryard</span>
          </a>

          <button
            className="menu-button"
            aria-label="Buka menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav className={menuOpen ? 'nav open' : 'nav'}>
            <a href="#about" onClick={handleNavClick}><UserRound size={16} /> About</a>
            <a href="#contact" onClick={handleNavClick}><Send size={16} /> Contact</a>
            <a href="#projects" onClick={handleNavClick}><FolderGit2 size={16} /> Projects</a>

            {isStarted && (
              <button className="nav-pill audio-toggle" onClick={toggleBgm} type="button">
                {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
                {isPlaying ? 'BGM' : 'Muted'}
              </button>
            )}
          </nav>
        </header>

        <section id="home" className="hero shell">
          <img src=activeTheme === "dark" ? "/assets/anime-banner.png" : "/assets/anime-banner-light.jpg" alt="Monochrome anime banner" />
        </section>

        <div className="content-wrap">
          {!isStarted && (
            <div className="start-overlay" onClick={handleStart} role="button" tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') handleStart()
              }}
              aria-label="Mulai pengalaman portfolio">
              <div className="start-card">
                <div className="start-icon"><Lock size={21} /></div>
                <h3>Interactive Experience</h3>
                <p>Klik untuk membuka portfolio dan mulai memutar musik latar.</p>
                <button type="button" className="start-button">
                  <Music size={16} /> PRESS START TO UNLOCK
                </button>
              </div>
            </div>
          )}

          <div className={`portfolio-content ${!isStarted ? 'is-locked' : ''}`}>
            <section className="profile-card shell">
              <div className="profile-main">
                <img className="avatar" src={avatar} alt="Veryard GitHub profile" />
                <div>
                  <h2>Veryard</h2>
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

            <section id="about" className="section-card shell">
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
                  <div><strong>GitHub</strong><span>Source code &amp; open-source projects</span><b>@{GITHUB_USERNAME}</b></div>
                  <ArrowUpRight />
                </a>
              </div>
            </section>

            <section id="projects" className="section-card shell">
              <SectionTitle icon={<FolderGit2 />} title="Projects" />
              <div className="projects">
                {projects.map((project) => (
                  <a href={project.href} key={project.name} aria-label={`Lihat ${project.name}`}
                    target="_blank" rel="noreferrer">
                    <article className="project">
                      <div className="project-icon"><Code2 /></div>
                      <div className="project-body">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className="tags">
                          <span>JavaScript</span><span>Golang</span><span>Whatsmeow</span><span>WhatsApp</span>
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
        <i /><p>© 2026 Veryard</p><i />
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
