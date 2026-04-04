'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

// Scherpe iconen — harde lijnen, dunne stroke
const s = { strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><path d="M1 6L8 1L15 6V15H10V9H6V15H1V6Z" stroke="currentColor" strokeWidth="1.2"/></svg>
)
const PageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="2" y="1" width="12" height="14" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5H11M5 8H11M5 11H8" stroke="currentColor" strokeWidth="1"/></svg>
)
const ProjectIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="1" y="3" width="14" height="10" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6H15" stroke="currentColor" strokeWidth="1.2"/></svg>
)
const ContentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5H15" stroke="currentColor" strokeWidth="1"/><path d="M5 5V15" stroke="currentColor" strokeWidth="1"/></svg>
)
const MediaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="1" y="2" width="14" height="12" stroke="currentColor" strokeWidth="1.2"/><rect x="4" y="5" width="3" height="3" stroke="currentColor" strokeWidth="1"/><path d="M1 12L5 8L8 11L11 8L15 12" stroke="currentColor" strokeWidth="1"/></svg>
)
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.2"/><path d="M1 8H15M8 1V15" stroke="currentColor" strokeWidth="1"/></svg>
)
const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="5" y="5" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 1H9V4H7V1ZM7 12H9V15H7V12ZM1 7H4V9H1V7ZM12 7H15V9H12V7Z" stroke="currentColor" strokeWidth="0.8"/><path d="M3 3L5 5M11 11L13 13M3 13L5 11M11 5L13 3" stroke="currentColor" strokeWidth="0.8"/></svg>
)
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...s}><rect x="5" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/><path d="M1 15V12C1 10.5 3 9 8 9C13 9 15 10.5 15 12V15" stroke="currentColor" strokeWidth="1.2"/></svg>
)
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
)

interface NavItemDef {
  label: string
  href: string
  icon: React.ReactNode
}

interface DropdownDef {
  type: 'dropdown'
  label: string
  icon: React.ReactNode
  items: NavItemDef[]
}

type NavEntry = NavItemDef | DropdownDef

interface SectionDef {
  label: string
  entries: NavEntry[]
}

const sections: SectionDef[] = [
  {
    label: 'Algemeen',
    entries: [
      { label: 'Dashboard', href: '/admin', icon: <HomeIcon /> },
      { label: 'Pagina\'s', href: '/admin/collections/pages', icon: <PageIcon /> },
      { label: 'Projecten', href: '/admin/collections/projects', icon: <ProjectIcon /> },
      {
        type: 'dropdown',
        label: 'Content',
        icon: <ContentIcon />,
        items: [
          { label: 'Blogartikelen', href: '/admin/collections/blog-posts', icon: <PageIcon /> },
          { label: 'Categorieën', href: '/admin/collections/categories', icon: <PageIcon /> },
        ],
      },
      {
        type: 'dropdown',
        label: 'Globals',
        icon: <GlobeIcon />,
        items: [
          { label: 'Header', href: '/admin/globals/header', icon: <GlobeIcon /> },
          { label: 'Footer', href: '/admin/globals/footer', icon: <GlobeIcon /> },
        ],
      },
      { label: 'Media', href: '/admin/collections/media', icon: <MediaIcon /> },
    ],
  },
  {
    label: 'Beheer',
    entries: [
      { label: 'Site instellingen', href: '/admin/globals/site-settings', icon: <GearIcon /> },
      { label: 'Gebruikers', href: '/admin/collections/users', icon: <UserIcon /> },
    ],
  },
]

function isDropdown(entry: NavEntry): entry is DropdownDef {
  return 'type' in entry && entry.type === 'dropdown'
}

export default function CustomNav() {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const toggle = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const isDropdownActive = (items: NavItemDef[]) => items.some(i => isActive(i.href))

  const linkStyle = (active: boolean, indent?: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    padding: indent ? '0.4375rem 0.75rem 0.4375rem 2.75rem' : '0.4375rem 0.75rem',
    margin: '0 0.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.9)',
    opacity: active ? 1 : 0.6,
    fontSize: '1rem',
    fontWeight: active ? 500 : 400,
    transition: 'opacity 0.15s ease, background 0.15s ease',
    background: active ? 'var(--theme-elevation-100)' : 'transparent',
  })

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem 0', width: '100%' }}>
      {sections.map((section) => (
        <div key={section.label}>
          {/* Section header */}
          <div style={{
            padding: '0.375rem 1rem',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0.35,
          }}>
            {section.label}
          </div>

          {/* Entries */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {section.entries.map((entry) => {
              if (isDropdown(entry)) {
                const open = openDropdowns[entry.label] ?? false
                const hasActive = isDropdownActive(entry.items)

                return (
                  <div key={entry.label}>
                    <button
                      onClick={() => toggle(entry.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        width: 'calc(100% - 1rem)',
                        margin: '0 0.5rem',
                        padding: '0.4375rem 0.75rem',
                        borderRadius: '4px',
                        background: hasActive ? 'var(--theme-elevation-50)' : 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.9)',
                        opacity: hasActive || open ? 1 : 0.6,
                        fontSize: '1rem',
                        fontWeight: hasActive ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s ease, background 0.15s ease',
                      }}
                    >
                      <span style={{ display: 'flex', opacity: 0.7, flexShrink: 0 }}>{entry.icon}</span>
                      <span style={{ flex: 1, textAlign: 'left' }}>{entry.label}</span>
                      <ChevronIcon open={open} />
                    </button>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: open ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          opacity: open ? 1 : 0,
                          transform: open ? 'translateY(0)' : 'translateY(-4px)',
                          transition: 'opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s',
                        }}>
                          {entry.items.map((sub) => (
                            <a key={sub.href} href={sub.href} style={linkStyle(isActive(sub.href), true)}>
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <a key={entry.href} href={entry.href} style={linkStyle(isActive(entry.href))}>
                  <span style={{ display: 'flex', opacity: 0.7, flexShrink: 0 }}>{entry.icon}</span>
                  {entry.label}
                </a>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
