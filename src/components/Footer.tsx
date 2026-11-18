import { ExternalLink } from 'lucide-react';
import { CANONICAL_URLS, RoutePath } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B]/85 backdrop-blur-md py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-medium text-slate-100">
            © 2026 Efa Godspower | Powered by Data | Designed for Insight &amp; Impact
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Machine Learning Engineer · Data Scientist · AI/ML Performance Evaluation &amp; Business Intelligence
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
          {(['/home', '/portfolio', '/resume', '/contact'] as RoutePath[]).map((route) => (
            <a
              key={route}
              href={route}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(route);
              }}
              className="capitalize transition-colors hover:text-white whitespace-nowrap shrink-0"
            >
              {route.replace('/', '')}
            </a>
          ))}
          <span className="text-slate-700" aria-hidden="true">
            |
          </span>
          <a
            href={CANONICAL_URLS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap shrink-0"
          >
            LinkedIn
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={CANONICAL_URLS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap shrink-0"
          >
            GitHub
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={CANONICAL_URLS.tableauSalary}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap shrink-0"
          >
            Tableau Public
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={CANONICAL_URLS.root}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white whitespace-nowrap shrink-0"
          >
            Google Sites
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
