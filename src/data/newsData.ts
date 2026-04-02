export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: "Global" | "India" | "Crypto";
  source: string;
  time: string;
  trending?: boolean;
}

export const newsItems: NewsItem[] = [
  { id: "1", title: "Sensex Rallies 500 Points on Strong FII Inflows", summary: "Indian markets surge as foreign institutional investors pour ₹3,200 crore into equities amid positive global cues.", category: "India", source: "Economic Times", time: "15 min ago", trending: true },
  { id: "2", title: "Fed Signals Potential Rate Cut in September", summary: "Federal Reserve Chair hints at possible interest rate reduction, boosting global market sentiment.", category: "Global", source: "Reuters", time: "32 min ago", trending: true },
  { id: "3", title: "Bitcoin Surges Past $72,000 on ETF Momentum", summary: "Cryptocurrency markets rally as spot Bitcoin ETFs see record inflows of $1.2 billion in a single day.", category: "Crypto", source: "CoinDesk", time: "45 min ago", trending: true },
  { id: "4", title: "Reliance Industries Q4 Profit Beats Estimates", summary: "RIL reports net profit of ₹21,243 crore, up 12% YoY, driven by strong performance in digital services.", category: "India", source: "Moneycontrol", time: "1 hour ago" },
  { id: "5", title: "NVIDIA Hits $3 Trillion Market Cap", summary: "AI chip giant becomes the second most valuable company globally, overtaking Apple in market capitalization.", category: "Global", source: "Bloomberg", time: "2 hours ago" },
  { id: "6", title: "Ethereum Layer 2 Solutions See Record TVL", summary: "Total value locked in Ethereum L2 protocols surpasses $45 billion as adoption accelerates.", category: "Crypto", source: "The Block", time: "2 hours ago" },
  { id: "7", title: "RBI Maintains Repo Rate at 6.5%", summary: "Reserve Bank of India keeps benchmark rate unchanged, citing inflation concerns while maintaining growth outlook.", category: "India", source: "LiveMint", time: "3 hours ago" },
  { id: "8", title: "China's PMI Data Signals Economic Recovery", summary: "Manufacturing PMI rises to 51.2 in March, indicating expansion and boosting Asian market sentiment.", category: "Global", source: "Financial Times", time: "3 hours ago" },
  { id: "9", title: "Solana DeFi Ecosystem Expands Rapidly", summary: "Solana-based DeFi protocols see 300% growth in total value locked over the past quarter.", category: "Crypto", source: "Decrypt", time: "4 hours ago" },
  { id: "10", title: "IT Sector Faces Headwinds Amid Global Slowdown", summary: "Major Indian IT companies warn of slower growth as enterprise spending tightens globally.", category: "India", source: "Business Standard", time: "5 hours ago" },
  { id: "11", title: "Oil Prices Surge on Middle East Tensions", summary: "Brent crude jumps 3.2% to $87 per barrel as geopolitical risks in the Middle East escalate.", category: "Global", source: "CNBC", time: "5 hours ago" },
  { id: "12", title: "Cardano Launches Major Network Upgrade", summary: "Cardano completes its highly anticipated Chang hard fork, bringing enhanced governance features.", category: "Crypto", source: "CryptoSlate", time: "6 hours ago" },
];
