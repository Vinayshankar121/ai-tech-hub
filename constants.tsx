
import React from 'react';
import { View } from './types';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const NewsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1 8h.01" /></svg>
);
const ResumeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

export const NAV_ITEMS = [
  { view: View.HOME, label: 'Home', icon: <HomeIcon /> },
  { view: View.NEWS, label: 'AI News', icon: <NewsIcon /> },
  { view: View.RESUME, label: 'Resume Maker', icon: <ResumeIcon /> },
  { view: View.CHAT, label: 'Chat Assistant', icon: <ChatIcon /> },
];

export const FEATURES = [
  {
    view: View.NEWS,
    title: 'AI News',
    description: 'Get the latest AI news, summarized by Gemini for quick insights.',
    icon: <NewsIcon />,
    enabled: true,
  },
  {
    view: View.RESUME,
    title: 'AI Resume Maker',
    description: 'Generate a professional, tailor-made resume in minutes using AI.',
    icon: <ResumeIcon />,
    enabled: true,
  },
  {
    view: View.CHAT,
    title: 'AI Chat Assistant',
    description: 'Chat with a powerful Gemini-powered assistant for any query.',
    icon: <ChatIcon />,
    enabled: true,
  },
  {
    view: View.JOBS,
    title: 'AI Jobs',
    description: 'Find your next role in the AI industry. (Coming Soon)',
    icon: <LockIcon />,
    enabled: false,
  },
  {
    view: View.TOOLS,
    title: 'AI Tools',
    description: 'Discover and access top AI productivity tools. (Coming Soon)',
    icon: <LockIcon />,
    enabled: false,
  },
  {
    view: View.BUSINESS,
    title: 'AI Business Growth',
    description: 'Get AI-driven business ideas and strategy analysis. (Coming Soon)',
    icon: <LockIcon />,
    enabled: false,
  },
];
   