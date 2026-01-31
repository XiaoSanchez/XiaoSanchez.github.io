import { GoogleGenAI } from "@google/genai";

export interface SearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

// Lazy initialization to avoid top-level process access crash
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
    if (!apiKey) {
      console.warn("API Key is missing. Please ensure process.env.API_KEY is set.");
    }
    ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });
  }
  return ai;
};

export const searchWithGemini = async (query: string): Promise<SearchResult> => {
  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No response generated.";

    // Extract grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract sources from chunks that have web data
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.uri, s])).values());

    return { text, sources: uniqueSources as { title: string; uri: string }[] };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw error;
  }
};