import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                FortisLine
              </h1>
              <p className="text-xs text-gray-500">Anti-Ragging Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition font-medium">
              Home
            </Link>
            <a href="#about" className="text-gray-700 hover:text-blue-700 transition font-medium">
              About
            </a>
            <a href="#resources" className="text-gray-700 hover:text-blue-700 transition font-medium">
              Resources
            </a>
            <Link to="/track" className="text-gray-700 hover:text-blue-700 transition font-medium">
              Track Complaint
            </Link>
            <Link to="/form" className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200 font-semibold">
              🚨 Report Incident
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
            >
              Home
            </Link>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
            >
              About
            </a>
            <a
              href="#resources"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
            >
              Resources
            </a>
            <Link
              to="/track"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium"
            >
              Track Complaint
            </Link>
            <Link to="/form" className="block w-full text-left px-3 py-2 rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold hover:shadow-lg transition">
              🚨 Report Incident
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
