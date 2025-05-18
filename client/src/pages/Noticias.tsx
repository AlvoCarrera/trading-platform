/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Noticias.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const Noticias = () => {
  const [symbol, setSymbol] = useState("EURUSD");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (symbol: string) => {
    const query = `${symbol.substring(0, 3)} ${symbol.substring(3, 6)}`;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_878698400666568915116650744087e54f107&q=${query}&language=en&category=business`
      );
      setNews(res.data.results || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(symbol);
  }, [symbol]);

  return (
    <div className="noticias-container">
      <h2>Noticias del mercado</h2>
      <div className="selector">
        <label htmlFor="symbol">Seleccionar par de divisas: </label>
        <select
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="EURUSD">EUR/USD</option>
          <option value="USDJPY">USD/JPY</option>
          <option value="GBPUSD">GBP/USD</option>
          <option value="AUDUSD">AUD/USD</option>
        </select>
      </div>
      <div className="tradingview-widget">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=FX:${symbol}&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&hideideas=1&hidevolume=1&studies_overrides={}`}
          style={{ width: "100%", height: "400px", border: "none" }}
          allowTransparency
          scrolling="no"
        ></iframe>
      </div>

      <div className="news-list">
        {loading ? (
          <p>Cargando noticias...</p>
        ) : news.length > 0 ? (
          <div className="news-grid">
            {news.map((item: any, index: number) => (
              <div key={index} className="news-item">
                <h3>{item.title}</h3>
                <p>
                  {item.description?.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Leer más
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron noticias para este par.</p>
        )}
      </div>
    </div>
  );
};

export default Noticias;
