export function Logo({ className = 'text-ink' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M20 25 L50 75 L80 25 L68 25 L50 55 L32 25 Z" fill="currentColor" />
    </svg>
  )
}
