import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Stage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateExplanation(stage: Stage): Promise<string> {
  const prompt = `
    You are a blockchain expert specializing in the Solana architecture. Provide a detailed but clear technical explanation of the '${stage.title}' component/process in the Solana architecture.
    Your explanation should be easy for a developer to understand. Structure your response into three sections with these exact headings: '### Role', '### Mechanism', and '### Importance'.
    For the '### Mechanism' section, use a bulleted list (using hyphens) to explain the key steps or components involved.
    Do not use markdown formatting like backticks or asterisks for bolding. Just plain text.
    `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
          topP: 0.95,
          topK: 64,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating explanation:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the explanation: ${error.message}`;
    }
    return "An unknown error occurred while generating the explanation.";
  }
}