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
        bg-white/10 backdrop-blur-md rounded-xl border border-white/20 
        shadow-xl transform transition-all duration-300 
        ${hover ? 'hover:scale-105 hover:shadow-2xl hover:bg-white/15' : ''}
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      {children}
    </div>
  );
}