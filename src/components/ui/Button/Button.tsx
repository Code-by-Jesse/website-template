import Link from 'next/link'
import styles from './Button.module.scss'

export interface ButtonProps {
  label: string
  href: string
  style?: 'primary' | 'secondary' | 'link'
  newTab?: boolean
}

export default function Button({ label, href, style = 'primary', newTab }: ButtonProps) {
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      className={`${styles.button} ${styles[style]}`}
      {...(newTab || isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.label} data-button-animate-chars>
        {label.split('').map((char, i) => (
          <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </span>
    </Link>
  )
}

export function ButtonGroup({ buttons }: { buttons?: ButtonProps[] }) {
  if (!buttons?.length) return null

  return (
    <div className={styles.group}>
      {buttons.map((btn, i) => (
        <Button key={i} {...btn} />
      ))}
    </div>
  )
}
