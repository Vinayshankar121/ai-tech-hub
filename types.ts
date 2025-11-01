
export enum View {
  HOME = 'HOME',
  NEWS = 'NEWS',
  JOBS = 'JOBS',
  RESUME = 'RESUME',
  TOOLS = 'TOOLS',
  PROJECTS = 'PROJECTS',
  BUSINESS = 'BUSINESS',
  LEARNING = 'LEARNING',
  CHAT = 'CHAT',
}

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  summary?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  gradDate: string;
}

export interface ChatMessage {
  sender: 'user' | 'model';
  text: string;
}
   