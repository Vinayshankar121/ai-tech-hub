
import React, { useState } from 'react';
import { ResumeData, Experience, Education } from '../types';
import { generateResume } from '../services/geminiService';
import Button from './common/Button';

// Helper component for repeatable form sections
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
    <h3 className="text-lg font-semibold text-indigo-400 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const AIResumeMaker: React.FC = () => {
  const [formData, setFormData] = useState<ResumeData>({
    fullName: '', email: '', phone: '', linkedin: '', github: '', summary: '',
    experiences: [{ jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
    educations: [{ degree: '', institution: '', location: '', gradDate: '' }],
    skills: '',
  });
  const [generatedResume, setGeneratedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = <T,>(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number | null = null, section: keyof ResumeData | null = null) => {
    const { name, value } = e.target;
    if (index !== null && section && Array.isArray(formData[section])) {
      const sectionData = [...(formData[section] as T[])];
      sectionData[index] = { ...sectionData[index], [name]: value };
      setFormData(prev => ({ ...prev, [section]: sectionData }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddItem = <T,>(section: keyof ResumeData, newItem: T) => {
    setFormData(prev => ({...prev, [section]: [...(prev[section] as T[]), newItem]}));
  }
  
  const handleRemoveItem = (section: keyof ResumeData, index: number) => {
     if(Array.isArray(formData[section]) && (formData[section] as any[]).length > 1) {
        setFormData(prev => ({...prev, [section]: (prev[section] as any[]).filter((_, i) => i !== index)}));
     }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedResume('');
    try {
      const resumeMarkdown = await generateResume(formData);
      setGeneratedResume(resumeMarkdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <div>
        <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-100">AI Resume Maker</h2>
            <p className="text-slate-400 mt-2">Fill in your details and let Gemini craft the perfect resume.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Personal Information">
                <input name="fullName" placeholder="Full Name" onChange={handleInputChange} className="input-style" />
                <input name="email" type="email" placeholder="Email" onChange={handleInputChange} className="input-style" />
                <input name="phone" placeholder="Phone" onChange={handleInputChange} className="input-style" />
                <input name="linkedin" placeholder="LinkedIn URL" onChange={handleInputChange} className="input-style" />
                <input name="github" placeholder="GitHub URL" onChange={handleInputChange} className="input-style col-span-1 md:col-span-2" />
            </FormSection>

            <FormSection title="Professional Summary">
              <textarea name="summary" placeholder="A brief summary of your career and goals..." onChange={handleInputChange} className="input-style col-span-1 md:col-span-2 h-24" />
            </FormSection>

            {formData.experiences.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border border-slate-700 rounded-lg bg-slate-800/30 relative">
                    <h3 className="text-lg font-semibold text-indigo-400 mb-4">Experience #{index + 1}</h3>
                    {formData.experiences.length > 1 && <Button type="button" onClick={() => handleRemoveItem('experiences', index)} className="absolute top-2 right-2 !p-1 h-7 w-7" variant="secondary">X</Button>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="jobTitle" value={exp.jobTitle} placeholder="Job Title" onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style" />
                        <input name="company" value={exp.company} placeholder="Company" onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style" />
                        <input name="location" value={exp.location} placeholder="Location" onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style" />
                        <input name="startDate" value={exp.startDate} placeholder="Start Date (e.g., Jan 2020)" onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style" />
                        <input name="endDate" value={exp.endDate} placeholder="End Date (e.g., Present)" onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style" />
                    </div>
                    <textarea name="responsibilities" value={exp.responsibilities} placeholder="Key responsibilities and achievements..." onChange={e => handleInputChange<Experience>(e, index, 'experiences')} className="input-style h-24 w-full" />
                </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => handleAddItem<Experience>('experiences', { jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' })}>+ Add Experience</Button>

            {formData.educations.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border border-slate-700 rounded-lg bg-slate-800/30 relative">
                     <h3 className="text-lg font-semibold text-indigo-400 mb-4">Education #{index + 1}</h3>
                     {formData.educations.length > 1 && <Button type="button" onClick={() => handleRemoveItem('educations', index)} className="absolute top-2 right-2 !p-1 h-7 w-7" variant="secondary">X</Button>}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="degree" value={edu.degree} placeholder="Degree (e.g., B.S. in Computer Science)" onChange={e => handleInputChange<Education>(e, index, 'educations')} className="input-style" />
                        <input name="institution" value={edu.institution} placeholder="Institution" onChange={e => handleInputChange<Education>(e, index, 'educations')} className="input-style" />
                        <input name="location" value={edu.location} placeholder="Location" onChange={e => handleInputChange<Education>(e, index, 'educations')} className="input-style" />
                        <input name="gradDate" value={edu.gradDate} placeholder="Graduation Date" onChange={e => handleInputChange<Education>(e, index, 'educations')} className="input-style" />
                     </div>
                </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => handleAddItem<Education>('educations', { degree: '', institution: '', location: '', gradDate: '' })}>+ Add Education</Button>

            <FormSection title="Skills">
                <textarea name="skills" placeholder="List your skills, separated by commas (e.g., React, TypeScript, Python)" onChange={handleInputChange} className="input-style col-span-1 md:col-span-2 h-24" />
            </FormSection>

            {error && <p className="text-red-400 text-center">{error}</p>}
            <Button type="submit" isLoading={isLoading} disabled={isLoading} className="w-full !py-3 !text-base">
                Generate Resume
            </Button>
        </form>
      </div>
      <div className="lg:sticky top-24 h-full">
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 h-full min-h-[500px] lg:max-h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-slate-100">Generated Resume Preview</h3>
          {isLoading && <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div></div>}
          {generatedResume ? (
            <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: generatedResume.replace(/\n/g, '<br />') }}></div>
          ) : (
             <div className="text-slate-500 text-center py-20">Your generated resume will appear here...</div>
          )}
        </div>
      </div>
       <style>{`
        .input-style {
          width: 100%;
          background-color: #334155; /* slate-700 */
          color: #f1f5f9; /* slate-100 */
          border: 1px solid #475569; /* slate-600 */
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-style:focus {
          outline: none;
          border-color: #6366f1; /* indigo-500 */
          box-shadow: 0 0 0 2px #4f46e5; /* indigo-600 */
        }
        .prose { color: #d1d5db; }
        .prose h1, .prose h2, .prose h3 { color: #f9fafb; }
        .prose strong { color: #e5e7eb; }
        .prose a { color: #818cf8; }
      `}</style>
    </div>
  );
};

export default AIResumeMaker;
   