
import React, { useState } from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  navigate: (view: View) => void;
  activeView: View;
}

const Header: React.FC<HeaderProps> = ({ navigate, activeView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(View.HOME)}>
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-xl font-bold text-white">AI Nexus Hub</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === item.view
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map(item => (
              <button
                key={item.view}
                onClick={() => {
                  navigate(item.view);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeView === item.view
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
   