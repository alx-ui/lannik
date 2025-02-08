import { ReactNode } from 'react';

interface SocialButtonProps {
  href: string;
  children: ReactNode;
  isLive?: boolean;
  bgColor?: string;
  icon?: ReactNode;
}

export default function SocialButton({ href, children, isLive, bgColor = '#171817', icon }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: isLive ? '#aa34b2' : bgColor }}
      className={`w-full max-w-sm px-6 py-3 mb-4 text-center rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-white hover:opacity-90 border border-white/10
        ${isLive ? 'animate-pulse' : ''}`}
    >
      {icon}
      {children}
    </a>
  );
}
