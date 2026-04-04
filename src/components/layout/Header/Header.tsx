'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Header.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface NavItem {
  label: string
  href: string
  highlight?: boolean
}

interface HeaderProps {
  logoText?: string | null
  logoUrl?: string | null
  navItems?: NavItem[]
}

export default function Header({ logoText, logoUrl, navItems }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const items: NavItem[] = navItems?.length
    ? navItems
    : [
        { href: '/', label: 'Home' },
        { href: '/over-ons', label: 'Over ons' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
      ]

  useGSAP(() => {
    const header = headerRef.current
    if (!header) return

    // --- Hide/show header on scroll ---
    let lastScroll = 0

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const scroll = self.scroll()
        const direction = scroll > lastScroll ? 'down' : 'up'
        lastScroll = scroll

        if (direction === 'down' && scroll > 100) {
          gsap.to(header, { yPercent: -100, duration: 0.4, ease: 'power2.out' })
        } else {
          gsap.to(header, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
        }
      },
    })

    // --- Dynamisch thema op basis van secties ---
    const sections = document.querySelectorAll('[data-header-theme]')

    // Bepaal initieel thema op basis van eerste sectie
    const firstSection = sections[0] as HTMLElement | undefined
    if (firstSection) {
      header.setAttribute('data-header-theme', firstSection.dataset.headerTheme || 'dark')
    }

    sections.forEach((section) => {
      const theme = (section as HTMLElement).dataset.headerTheme || 'dark'

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => header.setAttribute('data-header-theme', theme),
        onEnterBack: () => header.setAttribute('data-header-theme', theme),
      })
    })
  }, { scope: headerRef })

  return (
    <header ref={headerRef} className={styles.header} data-header-theme="light">
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          {logoUrl ? (
            <img src={logoUrl} alt={logoText || 'Logo'} className={styles.logoImg} />
          ) : (
            logoText || 'Logo'
          )}
        </Link>

        {/* Desktop nav */}
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${item.highlight ? styles.navHighlight : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className={`${styles.menuButton} ${mobileOpen ? styles.isOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={mobileOpen}
        >
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className={styles.mobileNav}>
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
