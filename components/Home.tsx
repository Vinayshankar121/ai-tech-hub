
import React from 'react';
import { View } from '../types';
import { FEATURES } from '../constants';
import Card from './common/Card';

interface HomeProps {
  navigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Welcome to AI Nexus Hub
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          Your central hub for cutting-edge AI tools and resources. Explore, create, and innovate with the power of Gemini.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <Card
            key={feature.view}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            enabled={feature.enabled}
            onClick={() => navigate(feature.view)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
   