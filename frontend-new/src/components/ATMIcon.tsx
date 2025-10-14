import React from 'react';

interface ATMIconProps {
  className?: string;
  size?: number;
}

export function ATMIcon({ className = "", size = 24 }: ATMIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* ATM Machine Body */}
      <rect x="3" y="2" width="18" height="20" rx="2" />
      
      {/* Screen */}
      <rect x="6" y="5" width="12" height="8" rx="1" />
      
      {/* Cash dispenser slot */}
      <rect x="6" y="16" width="12" height="2" rx="1" />
    </svg>
  );
}