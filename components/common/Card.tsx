
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  enabled: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick, enabled }) => {
  const baseClasses = "group relative rounded-lg p-6 bg-slate-800/50 border border-slate-700 transition-all duration-300";
  const enabledClasses = "hover:bg-slate-800 hover:border-indigo-500/50 hover:-translate-y-1 cursor-pointer";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <div
      className={`${baseClasses} ${enabled ? enabledClasses : disabledClasses}`}
      onClick={enabled ? onClick : undefined}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-slate-700/50 p-3 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm">{description}</p>
      {!enabled && (
        <div className="absolute inset-0 bg-slate-900/50 rounded-lg flex items-center justify-center">
            <span className="text-xs font-semibold text-amber-400 bg-amber-900/50 px-3 py-1 rounded-full">COMING SOON</span>
        </div>
      )}
    </div>
  );
};

export default Card;
   