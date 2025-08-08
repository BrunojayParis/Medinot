import React from 'react';
import { cn } from '@/utils/cn';
import { CardProps } from '@/types';

export function Card({
  title,
  children,
  className,
  padding = 'md',
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border rounded-xl shadow-sm',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
} 