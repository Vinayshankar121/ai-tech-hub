
import { GoogleGenAI, Chat } from "@google/genai";
import { ResumeData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeNewsWithSearch = async (topic: string): Promise<{ summary: string, articles: any[] }> => {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize the latest top 3 news about ${topic}. Provide a concise overall summary and then list the headlines and URLs of the source articles.`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        const summary = result.text;
        const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const articles = groundingChunks.map((chunk: any) => ({
            title: chunk.web.title,
            url: chunk.web.uri,
        }));
        return { summary, articles };
    } catch (error) {
        console.error("Error summarizing news with search:", error);
        throw new Error("Failed to fetch and summarize news.");
    }
};

export const generateResume = async (data: ResumeData): Promise<string> => {
    const prompt = `
    Generate a professional resume based on the following information. The output should be in clean, well-formatted Markdown.

    **Personal Information:**
    - Name: ${data.fullName}
    - Email: ${data.email}
    - Phone: ${data.phone}
    - LinkedIn: ${data.linkedin}
    - GitHub: ${data.github}

    **Professional Summary:**
    Create a compelling professional summary based on this user-provided statement:
    "${data.summary}"

    **Work Experience:**
    ${data.experiences.map(exp => `
    - **${exp.jobTitle}** at **${exp.company}**, ${exp.location} (${exp.startDate} - ${exp.endDate})
      - Responsibilities: ${exp.responsibilities}
    `).join('')}

    **Education:**
    ${data.educations.map(edu => `
    - **${edu.degree}**, ${edu.institution}, ${edu.location} (Graduated: ${edu.gradDate})
    `).join('')}

    **Skills:**
    ${data.skills}

    Please format this into a complete and polished resume. Use bullet points for responsibilities and achievements in the experience section. Ensure a professional tone.
    `;

    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });
        return result.text;
    } catch (error) {
        console.error("Error generating resume:", error);
        throw new Error("Failed to generate the resume.");
    }
};


export const startChat = (): Chat => {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are AI Nexus Hub\'s friendly and helpful chat assistant, powered by Gemini. Answer questions concisely and clearly.',
      },
    });
};
   