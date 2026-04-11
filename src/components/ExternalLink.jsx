export function ExternalLink({ href, className = '', children, ...rest }) {
  return (
    <a
      href={href}
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
