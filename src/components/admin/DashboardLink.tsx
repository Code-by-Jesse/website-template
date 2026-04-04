'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

const DashboardLink: React.FC = () => {
  const pathname = usePathname()
  const isActive = pathname === '/admin'

  return (
    <div style={{ padding: '0 var(--nav-group--padding-h)', marginBottom: '0.5rem' }}>
      <a
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.875rem',
          fontWeight: 500,
          background: isActive ? 'var(--theme-elevation-100)' : 'transparent',
          transition: 'background 0.15s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.6 }}>
          <path d="M1 6L8 1L15 6V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 15V8H10V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Dashboard
      </a>
    </div>
  )
}

export default DashboardLink
