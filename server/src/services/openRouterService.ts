import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000",
    "X-Title": "Trading AI Noticias",
  },
});

export const getNewsFromOpenRouter = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawContent = completion.choices[0].message?.content ?? "";

    // Asegura que se devuelve solo texto limpio
    return rawContent.trim();
  } catch (error: any) {
    console.error("🛑 Error al consultar OpenRouter:", error?.message || error);
    return "";
  }
};