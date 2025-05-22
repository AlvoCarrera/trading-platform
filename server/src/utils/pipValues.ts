export const getPipValue = (pair: string): number => {
  switch (pair) {
    case "EUR/USD":
      return 9.209;
    case "GBP/USD":
      return 9.524;
    case "AUD/USD":
      return 7.432;
    case "USD/JPY":
      return 9.1;
    case "USD/CHF":
      return 10.2;
    case "USD/CAD":
      return 7.93;
    case "NZD/USD":
      return 6.8;
    default:
      return 10; // Valor por defecto
  }
};