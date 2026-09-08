export function toAbsoluteHref(href) {
  if (typeof href !== 'string') return href
  const value = href.trim()
  if (!value) return value
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value
  if (value.startsWith('//')) return `https:${value}`
  if (value.startsWith('/') || value.startsWith('#')) return value
  return `https://${value}`
}

export function ExternalLink({ href, className = '', children, ...rest }) {
  return (
    <a
      href={toAbsoluteHref(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
      <span className="sr-only"> Opens in a new tab</span>
    </a>
  )
}
