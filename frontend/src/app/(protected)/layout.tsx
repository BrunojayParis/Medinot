export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl p-4">{children}</div>
    </div>
  );
}


