
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { startChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatAssistant: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const newChat = startChat();
      setChat(newChat);
      setMessages([{ sender: 'model', text: 'Hello! I am the AI Nexus assistant. How can I help you today?' }]);
    } catch (err) {
      setError('Failed to initialize chat session.');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);
    
    try {
      const stream = await chat.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { sender: 'model', text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponse;
          return newMessages;
        });
      }
    } catch (err) {
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
      setMessages(prev => [...prev, { sender: 'model', text: errorMessage }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const UserMessageBubble: React.FC<{text: string}> = ({ text }) => (
    <div className="flex justify-end">
      <div className="bg-indigo-600 text-white rounded-lg rounded-br-none px-4 py-2 max-w-sm">
        {text}
      </div>
    </div>
  );
  
  const ModelMessageBubble: React.FC<{text: string}> = ({ text }) => (
    <div className="flex justify-start">
      <div className="bg-slate-700 text-slate-100 rounded-lg rounded-bl-none px-4 py-2 max-w-sm">
        {text}
        {isLoading && messages[messages.length-1].sender === 'model' && text === '' && <BlinkingCursor />}
      </div>
    </div>
  );
  
  const BlinkingCursor = () => (
    <span className="inline-block w-2 h-4 bg-slate-300 ml-1 animate-blink"></span>
  );

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-slate-800/50 border border-slate-700 rounded-lg shadow-2xl animate-fade-in">
        <style>{`
            @keyframes blink {
                50% { opacity: 0; }
            }
            .animate-blink {
                animation: blink 1s step-end infinite;
            }
        `}</style>
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-slate-100">AI Chat Assistant</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => 
          msg.sender === 'user' ? 
          <UserMessageBubble key={index} text={msg.text} /> : 
          <ModelMessageBubble key={index} text={msg.text} />
        )}
        {isLoading && messages[messages.length-1].sender === 'user' && <ModelMessageBubble text="" />}
        <div ref={messagesEndRef} />
      </div>
      {error && <p className="text-red-400 px-4 pb-2 text-center">{error}</p>}
      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors">
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatAssistant;
   