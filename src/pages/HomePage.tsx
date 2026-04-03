import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Activity, Zap, Shield } from "lucide-react";
import { indices } from "@/data/mockStocks";
import TickerBar from "@/components/TickerBar";

const HeroChart = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-70">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/background1.webm" type="video/webm" />
      </video>

      {/* Grid lines (kept from original) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-primary/10"
          style={{ top: `${(i + 1) * 12}%` }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const features = [
    { icon: BarChart3, title: "Live Market Data", desc: "Real-time stock prices with dynamic charts and indicators" },
    { icon: Activity, title: "Pattern Recognition", desc: "Learn and identify chart patterns for better trading decisions" },
    { icon: BookOpen, title: "Learning Hub", desc: "Beginner-friendly guides on trading, risk management, and more" },
    { icon: Zap, title: "Quick Analysis", desc: "Instant insights on market trends and stock performance" },
    { icon: Shield, title: "Risk Management", desc: "Tools and strategies to protect your capital" },
    { icon: TrendingUp, title: "Market News", desc: "Stay updated with the latest market news and trends" },
  ];

  return (
    <div className="min-h-screen">
      <TickerBar />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <HeroChart />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
              Markets Open — Live Data
            </div>
            
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
              Trade with
              <span className="block neon-text-green">Intelligence</span>
            </h1>
            
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Your premium stock market intelligence platform. Real-time data, pattern analysis,
              and expert insights — all in one powerful terminal.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/market"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                Explore Market
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/learn"
                className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-8 py-3.5 font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-card"
              >
                Learn Trading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-t border-border/50 bg-card/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {indices.slice(0, 4).map((idx) => (
              <div key={idx.name} className="glass-card p-5 text-center">
                <p className="mb-1 text-sm text-muted-foreground">{idx.name}</p>
                <p className="font-display text-xl font-bold text-foreground">{idx.value.toLocaleString()}</p>
                <p className={`mt-1 text-sm font-medium ${idx.change >= 0 ? "neon-text-green" : "neon-text-red"}`}>
                  {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Professional-grade tools designed for every level of trader
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card-hover group p-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Ready to Start <span className="neon-text-green">Trading?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Explore live market data, learn chart patterns, and stay ahead with real-time news.
          </p>
          <Link
            to="/market"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            Open Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Finquest. Built for educational purposes. Not financial advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
