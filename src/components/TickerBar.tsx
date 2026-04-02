import { indices } from "@/data/mockStocks";

const TickerBar = () => {
  const items = [...indices, ...indices];

  return (
    <div className="w-full overflow-hidden border-b border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="animate-ticker flex whitespace-nowrap py-2">
        {items.map((idx, i) => (
          <div key={`${idx.name}-${i}`} className="mx-6 flex items-center gap-2 text-sm">
            <span className="font-medium text-muted-foreground">{idx.name}</span>
            <span className="font-semibold text-foreground">{idx.value.toLocaleString()}</span>
            <span className={idx.change >= 0 ? "neon-text-green" : "neon-text-red"}>
              {idx.change >= 0 ? "▲" : "▼"} {Math.abs(idx.change).toFixed(2)} ({Math.abs(idx.changePercent).toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
