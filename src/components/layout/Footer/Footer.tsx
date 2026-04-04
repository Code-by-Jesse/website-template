import Link from 'next/link'
import styles from './Footer.module.scss'

interface FooterProps {
  copyrightName?: string | null
  navItems?: Array<{ label: string; href: string }>
  legalItems?: Array<{ label: string; href: string }>
}

export default function Footer({ copyrightName, navItems, legalItems }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const name = copyrightName || 'Klantnaam'

  const defaultNavItems = [
    { label: 'Cases', href: '/cases' },
    { label: 'Over ons', href: '/over-ons' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  const defaultLegalItems = [
    { label: 'Privacybeleid', href: '/legal/privacy-policy' },
  ]

  const nav = navItems?.length ? navItems : defaultNavItems
  const legal = legalItems?.length ? legalItems : defaultLegalItems

  return (
    <footer className={styles.footer} data-header-theme="light">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{name}</span>
          </div>

          <nav className={styles.nav}>
            <ul>
              {nav.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} {name}. Alle rechten voorbehouden.</p>
          {legal.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
