'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'main' | 'sub';
type ButtonColor = 'primary' | 'white';
type ButtonShape = 'round' | 'square';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  colorType?: ButtonColor;
  shape?: ButtonShape;
  fullWidth?: boolean;
  fixedSize?: boolean;
  paddingClassName?: string;
}

export default function Button({
  children,
  variant = 'main',
  colorType = 'primary',
  shape = 'square',
  fullWidth = false,
  fixedSize = false,
  paddingClassName,
  className,
  ...props
}: ButtonProps) {
  const variantStyles = {
    main: 'font-noto font-medium text-24 tracking-wide',
    sub: 'font-noto font-medium text-20 tracking-normal',
  };

  const paddingStyles = {
    main: 'px-8 py-4',
    sub: 'px-4 py-4',
  };

  const colorStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    white: 'bg-white text-text-secondary hover:bg-white/90',
  };

  const shapeStyles = {
    round: 'rounded-full',
    square: 'rounded-button-square',
  };

  const widthStyle = fullWidth
    ? 'w-full'
    : fixedSize
      ? variant === 'main'
        ? 'w-[500px]'
        : 'w-[200px]'
      : 'w-auto';

  return (
    <button
      className={cn(
        'transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-center shrink-0 shadow-soft',

        variantStyles[variant],
        colorStyles[colorType],
        shapeStyles[shape],
        widthStyle,

        // 패딩 기본값 설정
        paddingClassName ? paddingClassName : paddingStyles[variant],

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
