/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Brain, TrendingUp, Clock3, Newspaper, Lightbulb } from "lucide-react";
import { getNewsFromAI } from "../services/newsService";
import { useAuth } from "../context/AuthContext";
import LoadingAI from "../components/LoadingAI";
import Button from "../components/ui/Button";

type NewsSummaryItem = {
  title: string;
  explanation: string;
};

type TechnicalAnalysis = {
  news_summary: NewsSummaryItem[];
  recommendation: string;
};

type RawNewsItem = {
  date: string;
  title: string;
  impact: string;
};

type FormattedNewsItem = {
  hour: string;
  title: string;
  impact: string;
};

type AIResponseRaw = {
  realNewsToday: RawNewsItem[];
  analysis: {
    technical_analysis: TechnicalAnalysis;
  };
};

const News = () => {
  const [pair, setPair] = useState("EUR/USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [realNews, setRealNews] = useState<FormattedNewsItem[]>([]);
  const [analysis, setAnalysis] = useState<TechnicalAnalysis | null>(null);
  const { user } = useAuth();

  const handleFetchNews = async () => {
    // Limpia resultados previos
    setRealNews([]);
    setAnalysis(null);
    setError("");
    setLoading(true);

    try {
      const raw: AIResponseRaw = await getNewsFromAI(
        pair,
        user?.displayName || "Trader"
      );

      const formattedNews: FormattedNewsItem[] = (raw.realNewsToday || []).map(
        (item) => ({
          hour: new Date(item.date).toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          title: item.title,
          impact: item.impact,
        })
      );

      setRealNews(formattedNews);
      setAnalysis(raw.analysis?.technical_analysis || null);
    } catch (err: any) {
      setError(err.message || "Error inesperado al consultar la IA.");
    } finally {
      setLoading(false);
    }
  };

  const getImpactClass = (impact: string) => {
    const val = impact.toLowerCase();
    if (val === "high") return "alto";
    if (val === "medium") return "medio";
    if (val === "low") return "bajo";
    return "";
  };

  const renderNewsItem = (item: FormattedNewsItem, index: number) => (
    <div key={index} className={`news-item ${getImpactClass(item.impact)}`}>
      <div className="hora">
        <Clock3 size={16} />
        {item.hour}
      </div>
      <div className="titulo">{item.title}</div>
      <div className="impacto">{item.impact}</div>
    </div>
  );

  return (
    <div className="news-page">
      <h1 className="title">
        <Brain size={24} /> Noticias Fundamentales con IA
      </h1>
      <p className="description">
        Esta sección utiliza inteligencia artificial para analizar las noticias
        del día y darte una guía de trading.
      </p>

      <div className="news-controls">
        <select value={pair} onChange={(e) => setPair(e.target.value)}>
          <option value="EUR/USD">EUR/USD</option>
          <option value="USD/JPY">USD/JPY</option>
        </select>
        <Button
          onClick={handleFetchNews}
          disabled={loading}
          variant="primary"
          type="button"
        >
          {loading ? "Consultando..." : "Consultar IA"}
        </Button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <LoadingAI />}

      {!loading && (realNews.length > 0 || analysis) && (
        <div className="news-results">
          {realNews.length > 0 && (
            <div className="news-block">
              <h2 className="subtitle">Noticias del día</h2>
              {realNews.map(renderNewsItem)}
            </div>
          )}

          {Array.isArray(analysis?.news_summary) && (
            <div className="news-block analysis-section">
              <h2 className="subtitle">
                <TrendingUp size={18} /> Análisis de IA
              </h2>

              <div className="card analysis-summary">
                <h3>
                  <Newspaper size={18} /> Resumen de noticias
                </h3>
                <ul>
                  {analysis.news_summary.map((item, idx) => (
                    <li key={idx}>
                      <span className="news-title">{item.title}:</span>{" "}
                      {item.explanation}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card recommendation">
                <h3>
                  <Lightbulb size={18} /> Recomendación
                </h3>
                <p>{analysis.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
