
import React, { useState, useCallback } from 'react';
import { View } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AINews from './components/AINews';
import AIResumeMaker from './components/AIResumeMaker';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);

  const navigate = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case View.HOME:
        return <Home navigate={navigate} />;
      case View.NEWS:
        return <AINews />;
      case View.RESUME:
        return <AIResumeMaker />;
      case View.CHAT:
        return <AIChatAssistant />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
      <Header navigate={navigate} activeView={activeView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
   