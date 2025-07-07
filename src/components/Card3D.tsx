import { ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card3D({ children, className = '', hover = true }: Card3DProps) {
  return (
    <div
      className={`
        bg-white/20 backdrop-blur-md rounded-xl border border-white/30 
        shadow-xl transform transition-all duration-300 
        ${hover ? 'hover:scale-105 hover:shadow-2xl hover:bg-white/25' : ''}
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {children}
    </div>
  );
}