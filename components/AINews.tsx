
import React, { useState } from 'react';
import { summarizeNewsWithSearch } from '../services/geminiService';
import Button from './common/Button';
import LoadingSpinner from './common/LoadingSpinner';

const AINews: React.FC = () => {
  const [topic, setTopic] = useState<string>('Artificial Intelligence');
  const [summary, setSummary] = useState<string>('');
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    setArticles([]);

    try {
      const result = await summarizeNewsWithSearch(topic);
      setSummary(result.summary);
      setArticles(result.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-100">AI News Summary</h2>
        <p className="text-slate-400 mt-2">Get the latest news on any topic, summarized by Gemini.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., 'Quantum Computing')"
            className="flex-grow bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button onClick={handleSummarize} isLoading={isLoading} disabled={isLoading}>
            Get News Summary
          </Button>
        </div>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>

      {isLoading && <LoadingSpinner message="Fetching and summarizing news..." />}

      {summary && (
        <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">Summary</h3>
          <p className="text-slate-300 whitespace-pre-wrap">{summary}</p>
          
          {articles.length > 0 && (
             <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3 text-indigo-400">Sources</h4>
                <ul className="space-y-2">
                    {articles.map((article, index) => (
                        <li key={index}>
                           <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 underline"
                            >
                               {article.title}
                           </a>
                        </li>
                    ))}
                </ul>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AINews;
   