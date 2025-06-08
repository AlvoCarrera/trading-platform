// src/mocks/mockNewsData.ts
export const mockNewsData = {
  realNewsToday: [
    {
      date: "2025-06-08T19:50:00-04:00",
      title: "Bank Lending y/y",
      impact: "Low",
      country: "JPY",
      forecast: "2.3%",
      previous: "2.4%",
    },
    {
      date: "2025-06-08T19:50:00-04:00",
      title: "Current Account",
      impact: "Low",
      country: "JPY",
      forecast: "2.59T",
      previous: "2.72T",
    },
    {
      date: "2025-06-08T19:50:00-04:00",
      title: "Final GDP Price Index y/y",
      impact: "Low",
      country: "JPY",
      forecast: "3.3%",
      previous: "3.3%",
    },
    {
      date: "2025-06-08T19:50:00-04:00",
      title: "Final GDP q/q",
      impact: "Low",
      country: "JPY",
      forecast: "-0.2%",
      previous: "-0.2%",
    },
  ],
  analysis: {
    technical_analysis: {
      news_summary: [
        {
          title: "Bank Lending y/y",
          explanation:
            "Este dato refleja la tasa de variación anual de los préstamos otorgados por el sistema bancario japonés. Se espera un descenso ligeramente de 2.4% a 2.3%, lo que podría indicar menor actividad crediticia por parte del sector financiero.",
        },
        {
          title: "Current Account",
          explanation:
            "El déficit de la cuenta corriente muestra el desequilibrio macroeconómico de Japón. Se pronostica un déficit de 2.59T, por encima de los 2.72T del período anterior, afectado probablemente por una disminución de las exportaciones y un déficit energético, lo que presiona al yen.",
        },
        {
          title: "Final GDP Price Index y/y",
          explanation:
            "Este dato anualizado mide la variación del PIB con ajuste por encadenamiento. Se espera que se mantenga en 3.3%, similar al dato anterior, indicando cierta inestabilidad en la economía pero sin corrección significativa esperada.",
        },
        {
          title: "Final GDP q/q",
          explanation:
            "Mide la variación trimestral del PIB con ajuste por encadenamiento. Se pronostica una leve contracción del 0.2%, siguiendo el patrón del dato anterior, lo que podría sugerir un crecimiento económico débil pero estable en términos anuales.",
        },
      ],
      recommendation:
        "Hola Álvaro, para el día de hoy 2025-06-08 las noticias de Japón son principalmente de impacto neutral a bajista para el JPY. Se espera una moderación en los préstamos bancarios y un déficit de cuenta corriente, presionando la moneda oriental. El dato de crecimiento económico es neutral pero podría ser usado para estrategias. El mercado anticipa estos datos (excepto quizás el déficit comercial, que se amplía pero es anticipado). El volumen no es alto. Recomiendo operar canjeando NUEVOS con el USD/JPY si hay un fuerte movimiento esperado, usando los datos para confirmar tendencias. Usa stops obligatorios y targets intradía. Espero tu transcripción histórica para ajustar la estrategia exacta.",
    },
  },
};