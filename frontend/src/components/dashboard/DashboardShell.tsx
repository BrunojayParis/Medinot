"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Menu, X, Home, Calendar, Users, FileText } from 'lucide-react';

export type DashboardNavItem = {
  label: string;
  href: string;
  icon?: 'home' | 'calendar' | 'users' | 'file';
};

function IconFor({ icon }: { icon?: DashboardNavItem['icon'] }) {
  if (icon === 'home') return <Home className="h-4 w-4" />;
  if (icon === 'calendar') return <Calendar className="h-4 w-4" />;
  if (icon === 'users') return <Users className="h-4 w-4" />;
  if (icon === 'file') return <FileText className="h-4 w-4" />;
  return null;
}

export function DashboardShell({
  nav,
  children,
  title,
}: {
  nav: DashboardNavItem[];
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] grid grid-cols-12 gap-0 lg:gap-6">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block col-span-2">
        <nav className="sticky top-24 space-y-1">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  active
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300'
                )}
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity"><IconFor icon={item.icon} /></span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Header + content */}
      <div className="col-span-12 lg:col-span-10">
        {/* Mobile/Tablet top bar */}
        <div className="sticky top-16 z-30 lg:hidden">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur px-3 py-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Menú
            </Button>
            {title && <div className="text-sm font-medium">{title}</div>}
          </div>

          {/* Slide-in drawer */}
          <div
            className={cn(
              'absolute left-0 right-0 origin-top overflow-hidden border-b border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface shadow-md transition-[max-height,opacity] duration-300',
              open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <nav className="p-2 space-y-1">
              {nav.map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      active
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                        : 'text-neutral-700 dark:text-neutral-300'
                    )}
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity"><IconFor icon={item.icon} /></span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <main className="p-3 lg:p-0 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardShell;


