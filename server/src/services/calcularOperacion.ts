interface DatosOperacion {
  pair: string;
  type: 'buy' | 'sell';
  entry: number;
  tp: number;
  sl: number;
  lotSize: number;
  result: 'TP' | 'SL' | 'BE';
}

export const calcularOperacion = (datos: DatosOperacion) => {
  const { pair, entry, tp, sl, lotSize, result } = datos;

  const factorPip = getPipFactor(pair); // 10000 para EUR/USD, 100 para USD/JPY
  const pipsProfit = Math.abs(tp - entry) * factorPip;
  const pipsStop = Math.abs(entry - sl) * factorPip;
  const ratioRB = pipsStop === 0 ? 0 : pipsProfit / pipsStop;

  const valorPipPorLote = getValorPipUSD(pair); // Ej: $10 por lote en EUR/USD
  const valorPipOperacion = valorPipPorLote * lotSize;

  let beneficio = 0;
  if (result === 'TP') beneficio = pipsProfit * valorPipOperacion;
  if (result === 'SL') beneficio = -pipsStop * valorPipOperacion;
  if (result === 'BE') beneficio = 0;

  return {
    ...datos,
    pipsProfit,
    pipsStop,
    ratioRB,
    valorPipOperacion,
    beneficio,
  };
};

// Retorna el factor de pips según el par
const getPipFactor = (pair: string) => {
  return pair.includes('JPY') ? 100 : 10000;
};

// Valor aproximado del pip por lote estándar (1 lote) en USD
const getValorPipUSD = (pair: string) => {
  if (pair === 'USD/JPY') return 9.1;
  if (pair === 'EUR/USD' || pair === 'GBP/USD' || pair === 'AUD/USD' || pair === 'NZD/USD') return 10;
  if (pair === 'USD/CHF') return 10.2;
  return 10; // genérico
};