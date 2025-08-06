import { ReactNode } from 'react';

interface SocialButtonProps {
  href: string;
  children: ReactNode;
  isLive?: boolean;
  bgColor?: string;
  textColor?: string;
  icon?: ReactNode;
  className?: string; // Nova prop
}

export default function SocialButton({
  href,
  children,
  isLive,
  bgColor = '#171817',
  textColor = '#ffffff',
  icon,
  className,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: isLive ? '#aa34b2' : bgColor }}
      className={`w-full max-w-sm px-6 py-3 mb-4 text-center rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-white hover:brightness-110 hover:shadow-lg hover:shadow-white/10 border border-white/10
        ${isLive ? 'animate-pulse' : ''} ${className}`}
    >
      {icon}
      <span className="text-center flex-1" style={{ color: textColor }}>
        {children}
      </span>
    </a>
  );
}
