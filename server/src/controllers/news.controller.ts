// src/controllers/newsController.ts
/*import { Request, Response } from "express";
import { getEconomicNewsToday } from "../services/realNewsService";
import { getNewsFromOpenRouter } from "../services/openRouterService";

export const getAIAnalysisFromRealNews = async (req: Request, res: Response) => {
  const localDate = new Date().toLocaleString("en-US", {
    timeZone: "America/Guayaquil",
  });
  const ecuadorDate = new Date(localDate);
  const year = ecuadorDate.getFullYear();
  const month = String(ecuadorDate.getMonth() + 1).padStart(2, "0");
  const day = String(ecuadorDate.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  try {
    const pair = req.query.pair as string;
    const username = req.query.username as string;

    if (!pair || !username) {
      return res.status(400).json({ error: "Missing 'pair' or 'username' query parameters." });
    }

    const realNews = await getEconomicNewsToday();
    const [baseCurrency, quoteCurrency] = pair.split("/");

    const relevantNews = realNews.filter(
      (item: any) => item.country === baseCurrency || item.country === quoteCurrency
    );

    const prompt = `
Eres un analista experto en trading intradía de divisas con más de 10 años de experiencia. 
Recibirás un arreglo de noticias económicas reales del día de hoy, con su hora, título, impacto estimado (bajo, medio o alto), país, valor actual, anterior y pronóstico.

Tu tarea es:
1. Analizar el impacto conjunto de estas noticias en el par de divisas "${pair}" para el día de hoy "${todayStr}".
2. Generar un resumen claro y entendible de cada noticia.
3. Dar una recomendación operativa intradía.

IMPORTANTE:
- Comienza la recomendación con: "Hola ${username}, para el día de hoy ${todayStr} ..."
- El campo "news_summary" debe ser un arreglo de objetos con:
  - "title": título de la noticia.
  - "explanation": resumen sencillo (100 palabras).
- El campo "recommendation" debe tener mínimo 200 palabras.
- Devuelve solo un JSON válido, sin markdown ni explicaciones.

Formato exacto de respuesta:
{
  "technical_analysis": {
    "news_summary": [
      {
        "title": "Nóminas no agrícolas",
        "explanation": "Este dato muestra la creación de empleo en EE.UU..."
      }
    ],
    "recommendation": "Hola ${username}, para el día de hoy..."
  }
}

Aquí están las noticias del día en formato JSON:
${JSON.stringify(relevantNews)}
`.trim();

    const aiResponse = await getNewsFromOpenRouter(prompt);
    const cleaned = aiResponse.trim().replace(/^```json/, "").replace(/```$/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("[JSON Parse Error]", parseError);
      return res.status(502).json({
        error: "La respuesta de la IA fue inválida. Intenta nuevamente más tarde.",
      });
    }

    res.status(200).json({
      realNewsToday: relevantNews,
      analysis: parsed,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[AI News Controller Error]", message);
    res.status(500).json({ error: message });
  }
};*/



import { Request, Response } from "express";
import { mockNewsData } from "../mocks/mockNewsData";

export const getAIAnalysisFromRealNews = async (req: Request, res: Response) => {
  const pair = req.query.pair as string;
  const username = req.query.username as string;

  if (!pair || !username) {
    return res.status(400).json({ error: "Missing 'pair' or 'username' query parameters." });
  }

  try {
    // Aquí simplemente retornamos el mock
    return res.status(200).json(mockNewsData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Mock News Controller Error]", message);
    return res.status(500).json({ error: message });
  }
};