import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Welkom in het CMS
        </h2>
        <p style={{ opacity: 0.6 }}>
          Beheer de content van je website vanuit dit dashboard.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <a href="/admin/collections/pages" style={{ padding: '1.5rem', background: 'var(--theme-elevation-100)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <strong>Pagina&apos;s</strong>
          <p style={{ opacity: 0.6, fontSize: '0.875rem', marginTop: '0.25rem' }}>Beheer de pagina&apos;s van je website</p>
        </a>

        <a href="/admin/collections/projects" style={{ padding: '1.5rem', background: 'var(--theme-elevation-100)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
          <strong>Projects</strong>
          <p style={{ opacity: 0.6, fontSize: '0.875rem', marginTop: '0.25rem' }}>Portfolio en case studies</p>
        </a>

        <a href="/admin/collections/blog-posts" style={{ padding: '1.5rem', background: 'var(--theme-elevation-100)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
          <strong>Blog</strong>
          <p style={{ opacity: 0.6, fontSize: '0.875rem', marginTop: '0.25rem' }}>Schrijf en beheer blogartikelen</p>
        </a>

        <a href="/admin/collections/media" style={{ padding: '1.5rem', background: 'var(--theme-elevation-100)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
          <strong>Media</strong>
          <p style={{ opacity: 0.6, fontSize: '0.875rem', marginTop: '0.25rem' }}>Upload en beheer afbeeldingen en video&apos;s</p>
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <a href="/admin/globals/header" style={{ padding: '1rem', background: 'var(--theme-elevation-50)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ opacity: 0.5 }}>⚙️</span>
          <div>
            <strong style={{ fontSize: '0.875rem' }}>Header</strong>
            <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Navigatie en logo</p>
          </div>
        </a>

        <a href="/admin/globals/footer" style={{ padding: '1rem', background: 'var(--theme-elevation-50)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ opacity: 0.5 }}>⚙️</span>
          <div>
            <strong style={{ fontSize: '0.875rem' }}>Footer</strong>
            <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Footer links en tekst</p>
          </div>
        </a>

        <a href="/admin/globals/site-settings" style={{ padding: '1rem', background: 'var(--theme-elevation-50)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ opacity: 0.5 }}>⚙️</span>
          <div>
            <strong style={{ fontSize: '0.875rem' }}>Site instellingen</strong>
            <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Favicon, SEO en scripts</p>
          </div>
        </a>

        <a href="/" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: 'var(--theme-elevation-50)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ opacity: 0.5 }}>🌐</span>
          <div>
            <strong style={{ fontSize: '0.875rem' }}>Website bekijken</strong>
            <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Open de live website</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Dashboard
