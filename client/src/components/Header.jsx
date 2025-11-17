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
              <div className="w-10 h-10 bg-[#016B61] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#016B61]">
                FortisLine
              </h1>
              <p className="text-xs text-gray-500">Anti-Ragging Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="cursor-pointer text-gray-700 hover:text-[#016B61] transition-colors duration-300 font-medium">
              Home
            </Link>
            <a href="#about" className="cursor-pointer text-gray-700 hover:text-[#016B61] transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#resources" className="cursor-pointer text-gray-700 hover:text-[#016B61] transition-colors duration-300 font-medium">
              Resources
            </a>
            <Link to="/track" className="cursor-pointer text-gray-700 hover:text-[#016B61] transition-colors duration-300 font-medium">
              Track Complaint
            </Link>
            <Link to="/form" className="cursor-pointer bg-[#016B61] text-white px-6 py-2.5 rounded-lg hover:bg-[#70B2B2] hover:shadow-lg transition-all duration-300 font-semibold">
              🚨 Report Incident
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer text-gray-700 hover:text-[#016B61] focus:outline-none transition-colors duration-300"
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
              className="cursor-pointer block px-3 py-2 rounded-md text-gray-700 hover:bg-[#E5E9C5] hover:text-[#016B61] transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <a
              href="#about"
              className="cursor-pointer block px-3 py-2 rounded-md text-gray-700 hover:bg-[#E5E9C5] hover:text-[#016B61] transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#resources"
              className="cursor-pointer block px-3 py-2 rounded-md text-gray-700 hover:bg-[#E5E9C5] hover:text-[#016B61] transition-colors duration-300 font-medium"
            >
              Resources
            </a>
            <Link
              to="/track"
              className="cursor-pointer block px-3 py-2 rounded-md text-gray-700 hover:bg-[#E5E9C5] hover:text-[#016B61] transition-colors duration-300 font-medium"
            >
              Track Complaint
            </Link>
            <Link to="/form" className="cursor-pointer block w-full text-left px-3 py-2 rounded-md bg-[#016B61] text-white font-semibold hover:bg-[#70B2B2] hover:shadow-lg transition-all duration-300">
              🚨 Report Incident
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
