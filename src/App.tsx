/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ProjectCategory, RoutePath } from './data/portfolioData';
import { TechAmbiance } from './components/TechAmbiance';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';

function normalizeRoute(pathname: string): RoutePath {
  const clean = pathname.toLowerCase().replace(/\/+$/, '');
  if (clean === '/portfolio') return '/portfolio';
  if (clean === '/resume') return '/resume';
  if (clean === '/contact') return '/contact';
  return '/home';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() =>
    normalizeRoute(window.location.pathname)
  );
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All (7)');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: RoutePath) => {
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToPortfolio = (category: ProjectCategory, search = '') => {
    setActiveCategory(category);
    setSearchQuery(search);
    navigate('/portfolio');
  };

  return (
    <div className="relative flex min-h-screen flex-col text-[#E8EFF8]">
      <TechAmbiance />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1">
          {currentRoute === '/home' && (
            <HomePage onNavigate={navigate} onJumpToPortfolio={handleJumpToPortfolio} />
          )}
          {currentRoute === '/portfolio' && (
            <PortfolioPage
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          {currentRoute === '/resume' && <ResumePage />}
          {currentRoute === '/contact' && <ContactPage />}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}
