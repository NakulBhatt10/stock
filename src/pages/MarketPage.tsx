import { useState, useMemo } from "react";
import { Search, Star, StarOff, Filter } from "lucide-react";
import { mockStocks, sectors } from "@/data/mockStocks";
import MiniChart from "@/components/MiniChart";
import TickerBar from "@/components/TickerBar";

const MarketPage = () => {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(["RELIANCE", "TCS", "HDFCBANK"]));
  const [showWatchlist, setShowWatchlist] = useState(false);

  const filtered = useMemo(() => {
    let stocks = mockStocks;
    if (showWatchlist) stocks = stocks.filter((s) => watchlist.has(s.symbol));
    if (selectedSector !== "All") stocks = stocks.filter((s) => s.sector === selectedSector);
    if (search) {
      const q = search.toLowerCase();
      stocks = stocks.filter((s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }
    return stocks;
  }, [search, selectedSector, showWatchlist, watchlist]);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      next.has(symbol) ? next.delete(symbol) : next.add(symbol);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <TickerBar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Live Market</h1>
          <p className="mt-1 text-muted-foreground">Real-time stock prices and market data</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stocks..."
              className="w-full rounded-lg border border-border bg-card/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWatchlist(!showWatchlist)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                showWatchlist
                  ? "border-market-amber/50 bg-market-amber/10 text-market-amber"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Star className="h-4 w-4" />
              Watchlist ({watchlist.size})
            </button>
          </div>
        </div>

        {/* Sector filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSector(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedSector === s
                  ? "bg-primary/20 text-primary"
                  : "bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Stock table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="hidden px-4 py-3 md:table-cell">Name</th>
                  <th className="px-4 py-3 text-right">Price (₹)</th>
                  <th className="px-4 py-3 text-right">Change</th>
                  <th className="hidden px-4 py-3 text-right lg:table-cell">Volume</th>
                  <th className="hidden px-4 py-3 text-right xl:table-cell">Market Cap</th>
                  <th className="px-4 py-3 text-right">Chart</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((stock) => {
                  const positive = stock.change >= 0;
                  return (
                    <tr
                      key={stock.symbol}
                      className="border-b border-border/30 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <button onClick={() => toggleWatchlist(stock.symbol)} className="text-muted-foreground transition-colors hover:text-market-amber">
                          {watchlist.has(stock.symbol) ? (
                            <Star className="h-4 w-4 fill-market-amber text-market-amber" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{stock.symbol}</span>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${positive ? "bg-market-green/10 text-market-green" : "bg-market-red/10 text-market-red"}`}>
                            {stock.sector}
                          </span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{stock.name}</td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                        {stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className={`font-mono text-sm font-medium ${positive ? "neon-text-green" : "neon-text-red"}`}>
                          {positive ? "+" : ""}{stock.change.toFixed(2)}
                          <div className="text-xs opacity-80">
                            ({positive ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-right text-sm text-muted-foreground lg:table-cell">{stock.volume}</td>
                      <td className="hidden px-4 py-3 text-right text-sm text-muted-foreground xl:table-cell">{stock.marketCap}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end">
                          <MiniChart data={stock.sparkline} positive={positive} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No stocks found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
