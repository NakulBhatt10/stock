import { useState } from "react";
import { chartPatterns } from "@/data/chartPatterns";
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from "lucide-react";

const typeConfig = {
  bullish: { color: "text-market-green", bg: "bg-market-green/10", border: "border-market-green/30", icon: TrendingUp, label: "Bullish" },
  bearish: { color: "text-market-red", bg: "bg-market-red/10", border: "border-market-red/30", icon: TrendingDown, label: "Bearish" },
  neutral: { color: "text-market-amber", bg: "bg-market-amber/10", border: "border-market-amber/30", icon: Minus, label: "Neutral" },
};

const PatternsPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "bullish" | "bearish" | "neutral">("all");

  const filtered = filter === "all" ? chartPatterns : chartPatterns.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Chart Patterns</h1>
          <p className="mt-1 text-muted-foreground">Master the most important chart patterns used by professional traders</p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "bullish", "bearish", "neutral"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                filter === f
                  ? f === "all"
                    ? "bg-primary/20 text-primary"
                    : `${typeConfig[f as "bullish" | "bearish" | "neutral"].bg} ${typeConfig[f as "bullish" | "bearish" | "neutral"].color}`
                  : "bg-card/60 text-muted-foreground hover:bg-muted"
              }`}
            >
              {f === "all" ? "All Patterns" : f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((pattern) => {
            const config = typeConfig[pattern.type];
            const isOpen = expanded === pattern.id;
            const Icon = config.icon;

            return (
              <div
                key={pattern.id}
                className={`glass-card-hover overflow-hidden transition-all duration-300 ${isOpen ? "md:col-span-2 xl:col-span-1" : ""}`}
              >
                {/* Pattern SVG */}
                <div className="relative border-b border-border/30 bg-card/40 p-6">
                  <svg viewBox="0 0 120 90" className="mx-auto h-32 w-full max-w-xs">
                    <defs>
                      <linearGradient id={`pg-${pattern.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={pattern.type === "bullish" ? "hsl(142,71%,45%)" : pattern.type === "bearish" ? "hsl(0,84%,60%)" : "hsl(38,92%,50%)"} stopOpacity="0.2" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid */}
                    {[20, 40, 60, 80].map((y) => (
                      <line key={y} x1="0" y1={y} x2="120" y2={y} stroke="hsl(217,33%,18%)" strokeWidth="0.3" />
                    ))}
                    <path
                      d={pattern.svgPath}
                      fill="none"
                      stroke={pattern.type === "bullish" ? "hsl(142,71%,45%)" : pattern.type === "bearish" ? "hsl(0,84%,60%)" : "hsl(38,92%,50%)"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className={`absolute right-4 top-4 flex items-center gap-1 rounded-full ${config.bg} px-2.5 py-1 text-xs font-medium ${config.color}`}>
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{pattern.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{pattern.description}</p>

                  <button
                    onClick={() => setExpanded(isOpen ? null : pattern.id)}
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {isOpen ? "Show less" : "Learn more"}
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {isOpen && (
                    <div className="mt-4 animate-fade-in space-y-3 border-t border-border/30 pt-4">
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">Prediction</p>
                        <p className={`mt-1 text-sm ${config.color}`}>{pattern.prediction}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">Key Points</p>
                        <ul className="mt-1 space-y-1">
                          {pattern.keyPoints.map((kp) => (
                            <li key={kp} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                              {kp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatternsPage;
