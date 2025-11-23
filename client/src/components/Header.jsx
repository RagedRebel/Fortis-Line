import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                FortisLine
              </h1>
              <p className="text-xs text-gray-500">Anti-Ragging Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="cursor-pointer px-4 py-2 text-gray-700 hover:text-primary hover:bg-surface rounded-lg transition-all duration-300 font-medium">
              Home
            </Link>
            <Link to="/track" className="cursor-pointer px-4 py-2 text-gray-700 hover:text-primary hover:bg-surface rounded-lg transition-all duration-300 font-medium">
              Track Complaint
            </Link>
            <Link to="/form" className="cursor-pointer ml-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
              Report Incident
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer p-2 text-gray-700 hover:text-primary hover:bg-surface rounded-lg focus:outline-none transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="cursor-pointer block px-3 py-2 rounded-lg text-gray-700 hover:bg-surface hover:text-primary transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/track"
              className="cursor-pointer block px-3 py-2 rounded-lg text-gray-700 hover:bg-surface hover:text-primary transition-all duration-300 font-medium"
            >
              Track Complaint
            </Link>
            <Link to="/form" className="cursor-pointer block w-full text-center px-3 py-2 rounded-lg bg-primary text-white font-medium hover:bg-secondary hover:shadow-lg transition-all duration-300 mt-2">
              Report Incident
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
