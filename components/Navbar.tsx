import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Publications', path: '/publications' },
    { name: 'Projects', path: '/projects' },
    { name: 'CV', path: '/cv' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Yongxiang Cai
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium tracking-tight rounded-md transition-colors ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/30'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 mx-3 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
            
            <button
              onClick={toggleTheme}
              className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-colors flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <motion.button 
              onClick={onSearchClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button
               onClick={toggleTheme}
               className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
               aria-label="Toggle dark mode"
             >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button 
              onClick={onSearchClick}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300"
      >
        <div className="px-6 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-medium tracking-tight ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;