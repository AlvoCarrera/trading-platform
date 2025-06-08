// src/services/realNewsService.ts
import axios from "axios";
import { supabase } from "../config/supabase";
import { v4 as uuidv4 } from "uuid";

export const getEconomicNewsToday = async () => {
  const apiUrl = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";

  // Obtener la fecha actual en la zona horaria de Ecuador (America/Guayaquil)
  const localDate = new Date().toLocaleString("en-US", {
    timeZone: "America/Guayaquil",
  });
  const ecuadorDate = new Date(localDate);
  const year = ecuadorDate.getFullYear();
  const month = String(ecuadorDate.getMonth() + 1).padStart(2, "0");
  const day = String(ecuadorDate.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  try {
    // Buscar si ya existe caché para hoy
    const { data: existing, error: fetchError } = await supabase
      .from("real_news_cache")
      .select("data")
      .eq("date", todayStr)
      .single();

    if (fetchError) {
      console.warn("⚠️ Supabase fetch warning:", fetchError.message);
    }

    let newsData = existing?.data;

    if (!newsData) {
      console.log("🌐 Fetching data from API...");
      const { data: apiData } = await axios.get(apiUrl);
      newsData = apiData;

      const { error: insertError } = await supabase
        .from("real_news_cache")
        .insert([
          {
            id: uuidv4(),
            date: todayStr,
            data: apiData,
          },
        ]);

      if (insertError) {
        console.error("❌ Error saving to Supabase:", insertError.message);
        throw new Error("Error saving real news cache");
      }

      console.log("✅ API data saved to Supabase for today");
    } else {
      console.log("✅ Using cached news from Supabase");
    }

    // Filtrar solo las noticias del día actual con conversión a zona horaria de Ecuador
    const todayNews = newsData.filter((item: any) => {
      if (!item.date) return false;

      const itemDate = new Date(item.date).toLocaleString("en-US", {
        timeZone: "America/Guayaquil",
      });
      const dateOnly = new Date(itemDate);
      const itemYear = dateOnly.getFullYear();
      const itemMonth = String(dateOnly.getMonth() + 1).padStart(2, "0");
      const itemDay = String(dateOnly.getDate()).padStart(2, "0");
      const itemDateStr = `${itemYear}-${itemMonth}-${itemDay}`;

      return itemDateStr === todayStr;
    });

    return todayNews;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[RealNewsError]", message);
    throw new Error("Failed to get real economic news");
  }
};