export interface LearningTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export const learningTopics: LearningTopic[] = [
  {
    id: "what-is-stock-market",
    title: "What is the Stock Market?",
    icon: "🏛️",
    summary: "The stock market is a marketplace where shares of publicly traded companies are bought and sold.",
    content: [
      "The stock market is like a giant supermarket — but instead of groceries, you buy and sell pieces of companies called 'shares' or 'stocks'.",
      "When you buy a share, you own a tiny piece of that company. If the company does well, your share becomes more valuable. If it struggles, the value may drop.",
      "Major stock exchanges include BSE (Bombay Stock Exchange), NSE (National Stock Exchange), NYSE (New York Stock Exchange), and NASDAQ.",
    ],
    keyTakeaways: ["Stocks represent ownership in companies", "Prices are driven by supply and demand", "Stock exchanges facilitate trading"],
  },
  {
    id: "what-are-shares",
    title: "What are Shares?",
    icon: "📊",
    summary: "Shares are units of ownership in a company that can be bought and sold on stock exchanges.",
    content: [
      "A share is the smallest unit of a company's stock. When a company goes public through an IPO (Initial Public Offering), it divides its ownership into shares.",
      "There are two main types: Common shares (voting rights + dividends) and Preferred shares (priority dividends, no voting).",
      "Share prices fluctuate based on company performance, market sentiment, economic conditions, and global events.",
    ],
    keyTakeaways: ["Shares = units of company ownership", "IPO is when a company first sells shares publicly", "Two types: Common and Preferred"],
  },
  {
    id: "candlestick-basics",
    title: "Candlestick Chart Basics",
    icon: "🕯️",
    summary: "Candlestick charts show price movement over time using candle-shaped markers.",
    content: [
      "Each candlestick represents a specific time period (1 minute, 1 hour, 1 day, etc.) and shows four key prices: Open, High, Low, Close (OHLC).",
      "Green/white candles: Close > Open (bullish). Red/black candles: Close < Open (bearish).",
      "The thick body shows the range between open and close. The thin lines (wicks/shadows) show the high and low.",
      "Common patterns include Doji (indecision), Hammer (reversal), Engulfing (strong reversal), and Morning/Evening Star (trend change).",
    ],
    keyTakeaways: ["OHLC = Open, High, Low, Close", "Green = bullish, Red = bearish", "Wicks show the range of price action"],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    icon: "🛡️",
    summary: "Risk management is the process of identifying, assessing, and controlling threats to your trading capital.",
    content: [
      "The #1 rule: Never risk more than 1-2% of your total capital on a single trade. This way, even a series of losses won't wipe you out.",
      "Always use stop-loss orders — they automatically sell your position if the price drops to a certain level, limiting your loss.",
      "Diversification is key: Don't put all your money in one stock or sector. Spread your investments across different assets.",
      "Risk-Reward Ratio: Aim for at least 1:2 — for every ₹1 you risk, target ₹2 in profit. This means you can be wrong 50% of the time and still be profitable.",
    ],
    keyTakeaways: ["Never risk more than 1-2% per trade", "Always use stop-loss orders", "Diversify your portfolio", "Aim for 1:2 risk-reward ratio"],
  },
  {
    id: "technical-indicators",
    title: "Technical Indicators",
    icon: "📈",
    summary: "Technical indicators are mathematical calculations used to analyze price movements and predict future trends.",
    content: [
      "Moving Averages (MA): Smooth out price data to identify trends. SMA (Simple) and EMA (Exponential) are most common. The 50-day and 200-day MAs are widely watched.",
      "RSI (Relative Strength Index): Measures momentum on a 0-100 scale. Above 70 = overbought (sell signal). Below 30 = oversold (buy signal).",
      "MACD (Moving Average Convergence Divergence): Shows the relationship between two moving averages. Signal line crossovers indicate buy/sell opportunities.",
      "Volume: The number of shares traded. High volume confirms trends, low volume suggests weakness. Volume precedes price!",
    ],
    keyTakeaways: ["MAs identify trend direction", "RSI shows overbought/oversold conditions", "MACD reveals momentum shifts", "Volume confirms price moves"],
  },
  {
    id: "trading-psychology",
    title: "Trading Psychology",
    icon: "🧠",
    summary: "Success in trading is 80% psychology and 20% strategy. Master your emotions to master the market.",
    content: [
      "Fear and Greed are the two biggest enemies. Fear makes you sell too early or avoid good trades. Greed makes you hold too long or over-leverage.",
      "Have a trading plan and stick to it. Write down your entry, exit, stop-loss, and position size BEFORE entering a trade.",
      "Accept losses as part of the game. Even the best traders are wrong 40-50% of the time. What matters is how much you win vs. how much you lose.",
      "Avoid revenge trading — trying to recover losses immediately often leads to bigger losses. Take a break after a loss.",
    ],
    keyTakeaways: ["Control fear and greed", "Follow your trading plan", "Accept that losses are normal", "Never revenge trade"],
  },
];
