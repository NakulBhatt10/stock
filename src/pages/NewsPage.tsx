import { useState } from "react";
import { newsItems } from "@/data/newsData";
import { Clock, TrendingUp, ExternalLink } from "lucide-react";

const categories = ["All", "Global", "India", "Crypto"] as const;

const categoryColors: Record<string, string> = {
  Global: "bg-market-blue/10 text-market-blue",
  India: "bg-market-green/10 text-market-green",
  Crypto: "bg-market-amber/10 text-market-amber",
};

const NewsPage = () => {
  const [category, setCategory] = useState<typeof categories[number]>("All");

  const filtered = category === "All" ? newsItems : newsItems.filter((n) => n.category === category);
  const trending = newsItems.filter((n) => n.trending);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Market News</h1>
          <p className="mt-1 text-muted-foreground">Latest updates from global financial markets</p>
        </div>

        {/* Trending */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {trending.map((item) => (
              <div key={item.id} className="glass-card-hover group cursor-pointer p-5">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                <h3 className="mt-3 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                category === c ? "bg-primary/20 text-primary" : "bg-card/60 text-muted-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* News list */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="glass-card-hover group flex cursor-pointer items-start gap-5 p-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.source}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
              <ExternalLink className="mt-2 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
