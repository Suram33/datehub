
import { GoogleGenAI, Type } from "@google/genai";
import { Review } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async enhanceDescription(activity: string, rawText: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Refine this date activity description. 
        Activity: ${activity}. 
        Draft: "${rawText}". 
        Goal: Make it sound like a cool, adventurous human wrote it. Short, punchy, under 140 chars. No emojis.`,
      });
      return response.text || rawText;
    } catch (error) {
      return rawText;
    }
  }

  async suggestDateIdea(vibe: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest a unique date idea for the vibe: ${vibe}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      });
      return JSON.parse(response.text?.trim() || '{"title":"Spontaneous Walk", "description":"Exploring the city together."}');
    } catch (error) {
      return { title: "Spontaneous Coffee", description: "Let's grab a coffee and walk around the park." };
    }
  }

  async generateChatReply(userName: string, context: string, userMessage: string) {
    try {
      // Using Pro for higher quality interpersonal simulation
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Dating app chat simulation.
        You are: ${userName}.
        Context: You posted an activity called "${context}".
        Message received: "${userMessage}".
        
        Rules:
        1. Reply like a real, casual person in their mid-20s.
        2. Use lowercase where appropriate, keep it under 15 words.
        3. Show interest in the person or the activity.
        4. Be witty but polite.
        5. Do NOT sound like an AI assistant.`,
      });
      return response.text?.replace(/"/g, '') || "that sounds cool, when are you free?";
    } catch (error) {
      return "That sounds great! Can't wait.";
    }
  }

  async summarizeReviews(reviews: Review[]) {
    if (!reviews || reviews.length === 0) return null;
    try {
      const text = reviews.map(r => r.comment).join(". ");
      // Using Pro for complex personality extraction
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze these host reviews and extract the dominant personality "vibe": "${text}". 
        Return a single 10-word punchy sentence starting with "This host is..."`,
      });
      return response.text || null;
    } catch (error) {
      return null;
    }
  }

  async analyzeSafetyReport(reason: string, details: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A user has been reported on a dating app. 
        Reason: ${reason}. 
        Details: ${details}. 
        Classify as: HIGH, MEDIUM, or LOW risk and provide a 1-sentence action.`,
      });
      return response.text;
    } catch (error) {
      return "Report received and queued for review.";
    }
  }
}

export const geminiService = new GeminiService();
