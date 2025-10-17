import type { ReactNode } from 'react';

import './styles.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="container">
          <nav className="layout__nav">
            <div className="layout__brand">
              <a href="/" className="layout__logo">
                Apiki Blog
              </a>
              <span className="layout__subtitle">Development</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="layout__main">{children}</main>

      <footer className="layout__footer">
        <div className="container">
          <div className="layout__footer-content">
            <p className="layout__footer-text">
              © 2025 Apiki Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
