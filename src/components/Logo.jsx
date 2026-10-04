export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <path d="M12 32 L14 8 L29 21 Z" fill="currentColor" />
      <path d="M52 32 L50 8 L35 21 Z" fill="currentColor" />
      <ellipse cx="32" cy="38" rx="22" ry="19" fill="currentColor" />
      <circle cx="24" cy="36" r="3" fill="var(--paper)" />
      <circle cx="40" cy="36" r="3" fill="var(--paper)" />
      <path d="M29 43 L35 43 L32 46.5 Z" fill="var(--paper)" />
    </svg>
  )
}
