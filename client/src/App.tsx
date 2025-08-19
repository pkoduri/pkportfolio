import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import NotFound from "@/pages/not-found";

function Router() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleThemeSelection = (theme: "professional" | "disruptor") => {
    setShowPortfolio(true);
  };

  const handleBackToHome = () => {
    setShowPortfolio(false);
  };

  return (
    <div className="min-h-screen">
      {!showPortfolio ? (
        <Home onThemeSelection={handleThemeSelection} />
      ) : (
        <Portfolio onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="professional" storageKey="pk-portfolio-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
