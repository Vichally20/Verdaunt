export function homeHref(hash = ''): string {
  const path = window.location.pathname
  const onHome = path === '/' || path.endsWith('/index.html')
  if (onHome) return hash || '#top'
  return `index.html${hash}`
}

export function naira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}
