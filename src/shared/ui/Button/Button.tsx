import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib';
import styles from './Button.module.css';

const cnButton = cn('Button', styles);

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', icon = false, className, children, ...props }, ref) => {
    const buttonClass = [
      cnButton({ variant, size, icon }),
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
