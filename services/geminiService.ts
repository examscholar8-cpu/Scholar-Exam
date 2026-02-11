
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFinancialAdvice = async (balance: number, groupName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a financial advisor for "Bharat Samuh Anudan", give a short, encouraging piece of advice (in Hindi & English mix) for a user who has a balance of ₹${balance} in their group "${groupName}". Keep it focused on community empowerment and long-term security.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep contributing to your group for a better future. समुदाय की शक्ति ही हमारी प्रगति है।";
  }
};

export const getPlatformSupport = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User question about Bharat Samuh Anudan platform: "${query}". Provide a helpful response based on the mission of providing digital financial security to rural India through group-based donations and transparent splitting.`,
    });
    return response.text;
  } catch (error) {
    return "I'm sorry, I couldn't process your request. Please try again later or contact our support desk.";
  }
};
