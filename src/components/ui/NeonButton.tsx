import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  pulse?: boolean;
}

export function NeonButton({ children, variant = 'primary', pulse = false, className = '', ...props }: NeonButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-full overflow-hidden group";
  
  const variants = {
    primary: "bg-coral text-bg hover:bg-white hover:text-bg hover:shadow-[0_0_20px_rgba(255,122,89,0.4)]",
    secondary: "bg-surface-2 text-white border border-white/10 hover:border-white/30 hover:bg-surface",
    accent: "bg-lime text-bg hover:bg-white hover:text-bg hover:shadow-[0_0_20px_rgba(200,255,79,0.4)]"
  };

  const pulseAnimation = pulse ? "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${pulseAnimation} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-coral/0 via-white/20 to-coral/0 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] -translate-x-full" />
      )}
    </button>
  );
}
