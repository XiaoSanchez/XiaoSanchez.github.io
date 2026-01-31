import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-12 border-t border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Yongxiang Cai. All rights reserved.</p>
        <p className="mt-1">Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;