interface Props {
  emoji?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ emoji, title, subtitle, className = "", children }: Props) {
  return (
    <div className={`page-container py-10 ${className}`}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {emoji && <span className="text-5xl">{emoji}</span>}
          <div>
            <h1 className="font-display font-extrabold text-3xl text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
}
