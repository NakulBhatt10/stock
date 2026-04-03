import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, BarChart3, BookOpen, Newspaper, Activity, GraduationCap, Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: TrendingUp },
  { path: "/globe", label: "Globe", icon: BookOpen },
  { path: "/market", label: "Market", icon: BarChart3 },
  { path: "/patterns", label: "Patterns", icon: Activity },
  { path: "/news", label: "News", icon: Newspaper },
  { path: "/learn", label: "Learn", icon: GraduationCap },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 neon-glow-green">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            Fin<span className="text-primary">Quest</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary neon-glow-green"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
