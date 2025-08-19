import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Rocket, CheckCircle, Zap } from "lucide-react";
import { PKLogo } from "../components/pk-logo";

interface HomeProps {
  onThemeSelection: (theme: "professional" | "disruptor") => void;
}

export default function Home({ onThemeSelection }: HomeProps) {
  const { setTheme } = useTheme();

  const handleThemeChoice = (selectedTheme: "professional" | "disruptor") => {
    setTheme(selectedTheme);
    onThemeSelection(selectedTheme);
  };

  return (
    <section className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6 overflow-visible">
            <PKLogo size="default" className="mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Leadership Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Two leadership styles, one exceptional professional. Which resonates with your approach to medical device innovation?
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Professional Theme Card */}
          <Card 
            className="card-hover cursor-pointer border-2 hover:border-professional-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white border-professional-200"
            onClick={() => handleThemeChoice("professional")}
            data-testid="professional-choice"
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="text-professional-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Patient-Focused Leader</h3>
              <p className="text-gray-900 mb-4 font-medium text-base">
                The methodical strategist who believes breakthrough medical technologies should reach every patient who needs them.
              </p>
              <div className="space-y-2 text-sm pl-4">
                <div className="flex items-center justify-start">
                  <CheckCircle className="text-professional-600 mr-2 flex-shrink-0" size={16} />
                  <span className="text-gray-900 font-medium">Patient-centered mission</span>
                </div>
                <div className="flex items-center justify-start">
                  <CheckCircle className="text-professional-600 mr-2 flex-shrink-0" size={16} />
                  <span className="text-gray-900 font-medium">Proven methodology & systems</span>
                </div>
                <div className="flex items-center justify-start">
                  <CheckCircle className="text-professional-600 mr-2 flex-shrink-0" size={16} />
                  <span className="text-gray-900 font-medium">95.5% clinical success rates</span>
                </div>
                <div className="flex items-center justify-start">
                  <CheckCircle className="text-professional-600 mr-2 flex-shrink-0" size={16} />
                  <span className="text-gray-900 font-medium">Global market expansion</span>
                </div>
              </div>
              <Button 
                className="mt-6 w-full font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-professional-600 hover:bg-professional-700 text-white"
                data-testid="professional-button"
              >
                Meet Professional P.K.
              </Button>
            </CardContent>
          </Card>

          {/* Disruptor Theme Card */}
          <Card 
            className="card-hover cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 text-white border-2 hover:border-disruptor-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => handleThemeChoice("disruptor")}
            data-testid="disruptor-choice"
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-disruptor-400/30 border border-disruptor-400/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-disruptor-300" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">The Innovation Catalyst</h3>
              <p className="text-gray-100 mb-4 text-base">
                The AI pioneer who transforms traditional marketing workflows through technology innovation and strategic process optimization.
              </p>
              <div className="space-y-2 text-sm text-gray-200 pl-4">
                <div className="flex items-center justify-start">
                  <Zap className="text-disruptor-400 mr-2 flex-shrink-0" size={16} />
                  <span className="text-white">Digital Frontier Award recipient</span>
                </div>
                <div className="flex items-center justify-start">
                  <Zap className="text-disruptor-400 mr-2 flex-shrink-0" size={16} />
                  <span className="text-white">Enterprise AI transformation leader</span>
                </div>
                <div className="flex items-center justify-start">
                  <Zap className="text-disruptor-400 mr-2 flex-shrink-0" size={16} />
                  <span className="text-white">18x faster AI-powered workflows</span>
                </div>
                <div className="flex items-center justify-start">
                  <Zap className="text-disruptor-400 mr-2 flex-shrink-0" size={16} />
                  <span className="text-white">Custom AI assistant architect</span>
                </div>
              </div>
              <Button 
                className="mt-6 w-full font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-disruptor-500 hover:bg-disruptor-600 text-white border-0"
                data-testid="disruptor-button"
              >
                Meet AI Pioneer P.K.
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <div className="mb-4">
            <p className="text-base font-medium text-gray-900 mb-1">Can't decide?</p>
            <p className="text-gray-600 mb-3 text-sm">Both paths showcase the same achievements through different perspectives</p>
          </div>
          <button 
            onClick={() => handleThemeChoice("professional")}
            className="text-gray-600 hover:text-professional-600 text-sm underline font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="skip-theme-selector"
          >
            View Complete Portfolio →
          </button>
        </div>
      </div>
    </section>
  );
}
