
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI Nexus Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
   