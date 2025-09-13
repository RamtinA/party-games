import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group';
  
  const variants = {
    primary: 'gaming-button bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:ring-pink-300 text-white shadow-lg hover:shadow-xl',
    secondary: 'gaming-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-300 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-white/30 bg-white/10 backdrop-blur-sm text-gray-700 hover:bg-white/20 hover:border-white/50 focus:ring-white/30 shadow-lg hover:shadow-xl rounded-2xl',
    ghost: 'text-gray-700 hover:text-gray-700 hover:bg-white/10 focus:ring-white/30 rounded-2xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-3xl',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
