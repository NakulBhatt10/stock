export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  sparkline: number[];
}

const generateSparkline = (base: number, volatility: number): number[] => {
  const points: number[] = [];
  let current = base;
  for (let i = 0; i < 20; i++) {
    current += (Math.random() - 0.48) * volatility;
    points.push(Math.round(current * 100) / 100);
  }
  return points;
};

export const mockStocks: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.75, change: 32.45, changePercent: 1.34, volume: "12.3M", marketCap: "₹16.6L Cr", sector: "Energy", sparkline: generateSparkline(2456, 15) },
  { symbol: "TCS", name: "Tata Consultancy", price: 3542.30, change: -18.90, changePercent: -0.53, volume: "5.6M", marketCap: "₹12.9L Cr", sector: "IT", sparkline: generateSparkline(3542, 20) },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.50, change: 24.15, changePercent: 1.46, volume: "8.9M", marketCap: "₹12.8L Cr", sector: "Banking", sparkline: generateSparkline(1678, 10) },
  { symbol: "INFY", name: "Infosys", price: 1456.80, change: -7.20, changePercent: -0.49, volume: "9.1M", marketCap: "₹6.0L Cr", sector: "IT", sparkline: generateSparkline(1456, 12) },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 987.35, change: 15.60, changePercent: 1.60, volume: "11.2M", marketCap: "₹6.9L Cr", sector: "Banking", sparkline: generateSparkline(987, 8) },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2534.20, change: -12.30, changePercent: -0.48, volume: "3.4M", marketCap: "₹5.9L Cr", sector: "FMCG", sparkline: generateSparkline(2534, 14) },
  { symbol: "SBIN", name: "State Bank of India", price: 625.40, change: 8.75, changePercent: 1.42, volume: "18.7M", marketCap: "₹5.6L Cr", sector: "Banking", sparkline: generateSparkline(625, 5) },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1123.65, change: 19.85, changePercent: 1.80, volume: "6.3M", marketCap: "₹6.3L Cr", sector: "Telecom", sparkline: generateSparkline(1123, 9) },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1845.90, change: -5.40, changePercent: -0.29, volume: "4.1M", marketCap: "₹3.7L Cr", sector: "Banking", sparkline: generateSparkline(1845, 11) },
  { symbol: "ITC", name: "ITC Limited", price: 438.25, change: 6.80, changePercent: 1.58, volume: "15.8M", marketCap: "₹5.5L Cr", sector: "FMCG", sparkline: generateSparkline(438, 3) },
  { symbol: "LT", name: "Larsen & Toubro", price: 3245.60, change: 45.20, changePercent: 1.41, volume: "2.8M", marketCap: "₹4.5L Cr", sector: "Industrial", sparkline: generateSparkline(3245, 22) },
  { symbol: "AXISBANK", name: "Axis Bank", price: 1067.30, change: -9.15, changePercent: -0.85, volume: "7.5M", marketCap: "₹3.3L Cr", sector: "Banking", sparkline: generateSparkline(1067, 8) },
  { symbol: "WIPRO", name: "Wipro Limited", price: 456.70, change: 3.25, changePercent: 0.72, volume: "8.2M", marketCap: "₹2.4L Cr", sector: "IT", sparkline: generateSparkline(456, 4) },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", price: 6789.45, change: 87.30, changePercent: 1.30, volume: "1.9M", marketCap: "₹4.2L Cr", sector: "Finance", sparkline: generateSparkline(6789, 40) },
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 10234.80, change: -156.45, changePercent: -1.51, volume: "1.2M", marketCap: "₹3.2L Cr", sector: "Auto", sparkline: generateSparkline(10234, 60) },
  { symbol: "TATAMOTORS", name: "Tata Motors", price: 645.30, change: 12.65, changePercent: 2.00, volume: "22.4M", marketCap: "₹2.4L Cr", sector: "Auto", sparkline: generateSparkline(645, 5) },
  { symbol: "SUNPHARMA", name: "Sun Pharma", price: 1234.55, change: -8.90, changePercent: -0.72, volume: "4.5M", marketCap: "₹3.0L Cr", sector: "Pharma", sparkline: generateSparkline(1234, 9) },
  { symbol: "TITAN", name: "Titan Company", price: 3156.80, change: 42.15, changePercent: 1.35, volume: "2.1M", marketCap: "₹2.8L Cr", sector: "Consumer", sparkline: generateSparkline(3156, 20) },
  { symbol: "ASIANPAINT", name: "Asian Paints", price: 3345.20, change: -23.45, changePercent: -0.70, volume: "1.8M", marketCap: "₹3.2L Cr", sector: "Consumer", sparkline: generateSparkline(3345, 18) },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement", price: 8456.70, change: 67.30, changePercent: 0.80, volume: "0.9M", marketCap: "₹2.4L Cr", sector: "Cement", sparkline: generateSparkline(8456, 45) },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1345.60, change: 18.40, changePercent: 1.39, volume: "5.3M", marketCap: "₹3.6L Cr", sector: "IT", sparkline: generateSparkline(1345, 10) },
  { symbol: "TECHM", name: "Tech Mahindra", price: 1267.85, change: -14.20, changePercent: -1.11, volume: "4.7M", marketCap: "₹1.2L Cr", sector: "IT", sparkline: generateSparkline(1267, 10) },
  { symbol: "POWERGRID", name: "Power Grid Corp", price: 245.30, change: 3.45, changePercent: 1.43, volume: "14.5M", marketCap: "₹1.7L Cr", sector: "Energy", sparkline: generateSparkline(245, 2) },
  { symbol: "NTPC", name: "NTPC Limited", price: 278.45, change: 5.60, changePercent: 2.05, volume: "16.3M", marketCap: "₹2.7L Cr", sector: "Energy", sparkline: generateSparkline(278, 2) },
  { symbol: "ONGC", name: "Oil & Natural Gas", price: 189.60, change: -2.35, changePercent: -1.22, volume: "19.8M", marketCap: "₹2.4L Cr", sector: "Energy", sparkline: generateSparkline(189, 2) },
  { symbol: "COALINDIA", name: "Coal India", price: 234.50, change: 4.20, changePercent: 1.82, volume: "12.1M", marketCap: "₹1.4L Cr", sector: "Mining", sparkline: generateSparkline(234, 2) },
  { symbol: "JSWSTEEL", name: "JSW Steel", price: 789.30, change: 11.45, changePercent: 1.47, volume: "5.8M", marketCap: "₹1.9L Cr", sector: "Metals", sparkline: generateSparkline(789, 6) },
  { symbol: "TATASTEEL", name: "Tata Steel", price: 123.45, change: -1.80, changePercent: -1.44, volume: "28.6M", marketCap: "₹1.5L Cr", sector: "Metals", sparkline: generateSparkline(123, 1) },
  { symbol: "ADANIENT", name: "Adani Enterprises", price: 2678.90, change: 56.30, changePercent: 2.15, volume: "3.4M", marketCap: "₹3.1L Cr", sector: "Conglomerate", sparkline: generateSparkline(2678, 18) },
  { symbol: "DRREDDY", name: "Dr. Reddy's Labs", price: 5432.10, change: -34.50, changePercent: -0.63, volume: "1.1M", marketCap: "₹0.9L Cr", sector: "Pharma", sparkline: generateSparkline(5432, 30) },
];

export const indices = [
  { name: "SENSEX", value: 72568.34, change: 456.23, changePercent: 0.63 },
  { name: "NIFTY 50", value: 22012.70, change: 132.45, changePercent: 0.61 },
  { name: "BANK NIFTY", value: 46789.20, change: -234.10, changePercent: -0.50 },
  { name: "S&P 500", value: 5234.18, change: 28.56, changePercent: 0.55 },
  { name: "NASDAQ", value: 16742.39, change: 156.78, changePercent: 0.95 },
  { name: "DOW JONES", value: 39872.99, change: -89.34, changePercent: -0.22 },
  { name: "FTSE 100", value: 8164.12, change: 34.56, changePercent: 0.43 },
  { name: "NIKKEI 225", value: 39098.68, change: 198.45, changePercent: 0.51 },
];

export const sectors = ["All", "IT", "Banking", "Energy", "FMCG", "Auto", "Pharma", "Metals", "Consumer", "Finance", "Telecom", "Industrial", "Cement", "Mining", "Conglomerate"];
