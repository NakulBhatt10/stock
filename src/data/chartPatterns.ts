export interface ChartPattern {
  id: string;
  name: string;
  type: "bullish" | "bearish" | "neutral";
  description: string;
  prediction: string;
  keyPoints: string[];
  svgPath: string;
}

export const chartPatterns: ChartPattern[] = [
  {
    id: "head-shoulders",
    name: "Head & Shoulders",
    type: "bearish",
    description: "A reversal pattern that signals a change from bullish to bearish trend. It consists of three peaks — left shoulder, head (highest), and right shoulder.",
    prediction: "Bearish reversal — expect price to drop below the neckline support level.",
    keyPoints: ["Three distinct peaks", "Middle peak is highest", "Neckline acts as support", "Volume decreases on right shoulder"],
    svgPath: "M 10 70 L 30 40 L 45 65 L 60 20 L 75 65 L 90 40 L 110 70",
  },
  {
    id: "inverse-head-shoulders",
    name: "Inverse Head & Shoulders",
    type: "bullish",
    description: "The opposite of Head & Shoulders. Signals a change from bearish to bullish trend with three troughs.",
    prediction: "Bullish reversal — expect price to break above the neckline resistance.",
    keyPoints: ["Three distinct troughs", "Middle trough is lowest", "Neckline acts as resistance", "Breakout with volume confirms"],
    svgPath: "M 10 30 L 30 60 L 45 35 L 60 80 L 75 35 L 90 60 L 110 30",
  },
  {
    id: "double-top",
    name: "Double Top",
    type: "bearish",
    description: "A reversal pattern where price reaches the same high twice and fails to break through, signaling exhaustion of buyers.",
    prediction: "Bearish reversal — price typically drops by the distance between the peak and trough.",
    keyPoints: ["Two similar highs", "Trough between peaks", "Volume lower on second peak", "Confirmed when support breaks"],
    svgPath: "M 10 70 L 30 20 L 50 55 L 70 20 L 90 55 L 110 80",
  },
  {
    id: "double-bottom",
    name: "Double Bottom",
    type: "bullish",
    description: "A reversal pattern where price reaches the same low twice, indicating strong support and potential upward reversal.",
    prediction: "Bullish reversal — expect a rally equal to the distance from bottom to resistance.",
    keyPoints: ["Two similar lows", "Peak between troughs", "Volume increases on second bottom", "Breakout above resistance confirms"],
    svgPath: "M 10 30 L 30 80 L 50 45 L 70 80 L 90 45 L 110 20",
  },
  {
    id: "cup-handle",
    name: "Cup & Handle",
    type: "bullish",
    description: "A bullish continuation pattern that resembles a cup with a handle. The cup is U-shaped and the handle drifts slightly downward.",
    prediction: "Bullish continuation — breakout above the handle signals further upside.",
    keyPoints: ["U-shaped cup formation", "Handle is a small pullback", "Volume dries up in handle", "Measured move = cup depth"],
    svgPath: "M 10 25 L 20 45 L 35 65 L 50 70 L 65 65 L 80 45 L 85 25 L 90 35 L 95 30 L 110 15",
  },
  {
    id: "bull-flag",
    name: "Bull Flag",
    type: "bullish",
    description: "A continuation pattern that forms after a strong upward move, followed by a slight downward-sloping consolidation (the flag).",
    prediction: "Bullish continuation — breakout above the flag targets the flagpole height.",
    keyPoints: ["Strong upward pole", "Parallel downward channel", "Decreasing volume in flag", "Breakout with volume"],
    svgPath: "M 10 80 L 30 20 L 40 30 L 50 25 L 60 35 L 70 30 L 80 40 L 85 25 L 110 10",
  },
  {
    id: "bear-flag",
    name: "Bear Flag",
    type: "bearish",
    description: "A continuation pattern after a sharp decline, followed by a slight upward consolidation before continuing down.",
    prediction: "Bearish continuation — breakdown below the flag projects the pole length.",
    keyPoints: ["Sharp downward pole", "Parallel upward channel", "Low volume in flag", "Breakdown confirms"],
    svgPath: "M 10 20 L 30 80 L 40 70 L 50 75 L 60 65 L 70 70 L 80 60 L 85 75 L 110 90",
  },
  {
    id: "ascending-triangle",
    name: "Ascending Triangle",
    type: "bullish",
    description: "A bullish pattern with a flat resistance line and rising support. Buyers are getting more aggressive over time.",
    prediction: "Bullish breakout — expect price to break above resistance.",
    keyPoints: ["Flat resistance line", "Rising support (higher lows)", "Volume contracts", "Breakout above resistance"],
    svgPath: "M 10 70 L 25 30 L 35 60 L 50 30 L 60 50 L 75 30 L 85 42 L 100 30 L 110 15",
  },
  {
    id: "descending-triangle",
    name: "Descending Triangle",
    type: "bearish",
    description: "A bearish pattern with flat support and declining resistance. Sellers become more aggressive with each bounce.",
    prediction: "Bearish breakdown — expect price to break below support.",
    keyPoints: ["Flat support line", "Falling resistance (lower highs)", "Volume decreases", "Breakdown below support"],
    svgPath: "M 10 30 L 25 70 L 35 40 L 50 70 L 60 50 L 75 70 L 85 58 L 100 70 L 110 85",
  },
  {
    id: "symmetrical-triangle",
    name: "Symmetrical Triangle",
    type: "neutral",
    description: "A neutral pattern where both support and resistance converge. Can break in either direction.",
    prediction: "Breakout direction determines trend — watch for volume confirmation.",
    keyPoints: ["Converging trendlines", "Lower highs + higher lows", "Volume decreases", "Breakout direction matters"],
    svgPath: "M 10 20 L 25 80 L 40 30 L 55 70 L 65 40 L 75 60 L 85 48 L 95 55 L 110 35",
  },
  {
    id: "pennant",
    name: "Pennant",
    type: "bullish",
    description: "Similar to a flag but with converging trendlines forming a small symmetrical triangle after a strong move.",
    prediction: "Continuation in the direction of the prior trend (usually bullish).",
    keyPoints: ["Strong prior move", "Small symmetrical triangle", "Quick consolidation", "Volume expansion on breakout"],
    svgPath: "M 10 80 L 30 20 L 40 35 L 48 25 L 55 32 L 62 27 L 68 30 L 110 10",
  },
  {
    id: "wedge-rising",
    name: "Rising Wedge",
    type: "bearish",
    description: "Both support and resistance rise but converge, indicating weakening buying momentum despite higher highs.",
    prediction: "Bearish reversal — expect a breakdown below support.",
    keyPoints: ["Rising converging lines", "Volume diminishes", "Both highs and lows rise", "Bearish breakdown"],
    svgPath: "M 10 80 L 25 55 L 35 65 L 50 40 L 60 52 L 75 28 L 85 38 L 100 20 L 110 60",
  },
];
