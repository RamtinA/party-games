import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isRevealed?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className, onClick, isRevealed = false, style }: CardProps) {
  return (
    <div
      className={cn(
        'gaming-card w-full cursor-pointer group backdrop-blur-md',
        className
      )}
      onClick={onClick}
      style={style}
    >
      <div 
        className={cn(
          'w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out',
          isRevealed ? 'opacity-100 scale-100' : 'opacity-100 scale-100'
        )}
      >
        {children}
      </div>
    </div>
  );
}
