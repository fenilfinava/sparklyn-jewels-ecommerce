import React from "react";

export const DiamondIcons = {
  Round: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="12,2 19,7 12,12 5,7" />
      <polygon points="12,22 19,17 12,12 5,17" />
      <line x1="5" y1="7" x2="5" y2="17" />
      <line x1="19" y1="7" x2="19" y2="17" />
    </svg>
  ),
  Emerald: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <polygon points="6,2 18,2 22,6 22,18 18,22 6,22 2,18 2,6" />
      <rect x="7" y="5" width="10" height="14" />
      <line x1="2" y1="6" x2="7" y2="5" />
      <line x1="22" y1="6" x2="17" y2="5" />
      <line x1="2" y1="18" x2="7" y2="19" />
      <line x1="22" y1="18" x2="17" y2="19" />
    </svg>
  ),
  Princess: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <rect x="3" y="3" width="18" height="18" />
      <rect x="6" y="6" width="12" height="12" />
      <line x1="3" y1="3" x2="12" y2="12" />
      <line x1="21" y1="3" x2="12" y2="12" />
      <line x1="3" y1="21" x2="12" y2="12" />
      <line x1="21" y1="21" x2="12" y2="12" />
    </svg>
  ),
  Cushion: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="21" y1="12" x2="17" y2="12" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="21" x2="12" y2="17" />
    </svg>
  ),
  Oval: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <ellipse cx="12" cy="12" rx="8" ry="11" />
      <ellipse cx="12" cy="12" rx="4" ry="7" />
      <line x1="12" y1="1" x2="12" y2="5" />
      <line x1="12" y1="23" x2="12" y2="19" />
      <line x1="4" y1="12" x2="8" y2="12" />
      <line x1="20" y1="12" x2="16" y2="12" />
    </svg>
  ),
  Pear: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <path d="M12 2 C8 8 4 13 4 17 A8 8 0 0 0 20 17 C20 13 16 8 12 2 Z" />
      <path d="M12 6 C9.5 10.5 7.5 14 7.5 16.5 A4.5 4.5 0 0 0 16.5 16.5 C16.5 14 14.5 10.5 12 6 Z" />
    </svg>
  ),
  Marquise: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <path d="M12 2 C5 8 5 16 12 22 C19 16 19 8 12 2 Z" />
      <path d="M12 5 C8 9.5 8 14.5 12 19 C16 14.5 16 9.5 12 5 Z" />
    </svg>
  ),
  Asscher: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <polygon points="7,3 17,3 21,7 21,17 17,21 7,21 3,17 3,7" />
      <polygon points="9,6 15,6 18,9 18,15 15,18 9,18 6,15 6,9" />
      <line x1="3" y1="7" x2="9" y2="9" />
      <line x1="21" y1="7" x2="15" y2="9" />
      <line x1="3" y1="17" x2="9" y2="15" />
      <line x1="21" y1="17" x2="15" y2="15" />
    </svg>
  ),
  Heart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M12 18l-1-1C6.5 12.5 4 10.5 4 8c0-2 .5-3.5 3.5-3.5 1.5 0 2.5 1 4.5 3 2-2 3-3 4.5-3 3 0 3.5 1.5 3.5 3.5 0 2.5-2.5 4.5-7 9l-1 1z" />
    </svg>
  )
};
