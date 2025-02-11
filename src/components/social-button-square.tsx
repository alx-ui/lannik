import { ReactNode } from 'react';

interface SocialButtonSquareProps {
  href: string;
  children: ReactNode;
  bgColor?: string;
  icon?: ReactNode;
  className?: string;
}

export default function SocialButtonSquare({
  href,
  children,
  bgColor = '#171817',
  icon,
  className,
}: SocialButtonSquareProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: bgColor }}
      className={`aspect-square p-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 text-white hover:brightness-110 hover:shadow-lg hover:shadow-white/10 border border-white/10 text-sm ${className}`}
    >
      {icon}
      <span className="text-center w-full break-words">{children}</span>
    </a>
  );
}
