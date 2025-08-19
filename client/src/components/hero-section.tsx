import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface HeroSectionProps {
  onDownloadResume: () => void;
  onViewCaseStudies: () => void;
}

export function HeroSection({ onDownloadResume, onViewCaseStudies }: HeroSectionProps) {
  const { theme } = useTheme();

  const themeContent = {
    professional: {
      badge: "Patient-Focused Innovation Leader",
      title: "Breakthrough medical technologies should reach every patient who needs them",
      subtitle: "Most medical innovations fail not because of the science, but because of the strategy. I architect the bridge between life-saving discoveries and the patients whose lives depend on them.",
      background: "bg-gradient-to-br from-professional-50 to-white"
    },
    disruptor: {
      badge: "AI Innovation Pioneer & Digital Transformation Leader",
      title: "Revolutionizing Medical Device Marketing with AI Innovation", 
      subtitle: "Digital Frontier Award recipient pioneering enterprise AI adoption. Leading AI transformation across marketing workflows while accelerating medical innovation delivery to patients worldwide.",
      background: "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    }
  };

  const content = themeContent[theme];

  return (
    <section className={`pt-16 pb-12 theme-transition ${content.background} min-h-screen flex items-center`} id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <div className="flex justify-center mb-4">
              <Badge 
                variant="secondary" 
                className={`${theme === 'professional' ? 'bg-professional-100 text-professional-700' : 'bg-disruptor-100 text-disruptor-700'}`}
                data-testid="hero-badge"
              >
                {content.badge}
              </Badge>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${theme === 'professional' ? 'text-gray-900' : 'text-white'}`} data-testid="hero-title">
              {content.title}
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${theme === 'professional' ? 'text-gray-600' : 'text-gray-200'}`} data-testid="hero-subtitle">
              {content.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={onViewCaseStudies}
                className={`${theme === 'professional' ? 'bg-professional-600 hover:bg-professional-700' : 'bg-disruptor-600 hover:bg-disruptor-700'} text-white font-medium px-8 py-3`}
                data-testid="view-case-studies-button"
              >
                View Case Studies
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onDownloadResume}
                className="font-medium px-8 py-3"
                data-testid="download-resume-button"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            {/* Key Stats Above the Fold */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fade-in">
              {theme === 'professional' ? (
                <>
                  <div data-testid="hero-stat-0">
                    <div className="text-xl md:text-2xl font-bold text-professional-600 mb-1">15+</div>
                    <div className="text-xs md:text-sm text-gray-600">Years Patient-Focused Innovation</div>
                  </div>
                  <div data-testid="hero-stat-1">
                    <div className="text-xl md:text-2xl font-bold text-professional-600 mb-1">$250M+</div>
                    <div className="text-xs md:text-sm text-gray-600">Portfolio Impact on Patient Care</div>
                  </div>
                  <div data-testid="hero-stat-2">
                    <div className="text-xl md:text-2xl font-bold text-professional-600 mb-1">95.5%</div>
                    <div className="text-xs md:text-sm text-gray-600">Clinical Success Rates Achieved</div>
                  </div>
                  <div data-testid="hero-stat-3">
                    <div className="text-xl md:text-2xl font-bold text-professional-600 mb-1">Global</div>
                    <div className="text-xs md:text-sm text-gray-600">Patient Access Expansion</div>
                  </div>
                </>
              ) : (
                <>
                  <div data-testid="hero-stat-0">
                    <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">Award</div>
                    <div className="text-xs md:text-sm text-gray-100">Digital Frontier AI Leadership</div>
                  </div>
                  <div data-testid="hero-stat-1">
                    <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">$250M+</div>
                    <div className="text-xs md:text-sm text-gray-100">Portfolio Disruption Impact</div>
                  </div>
                  <div data-testid="hero-stat-2">
                    <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">18x</div>
                    <div className="text-xs md:text-sm text-gray-100">Faster AI-Powered Workflows</div>
                  </div>
                  <div data-testid="hero-stat-3">
                    <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">Enterprise</div>
                    <div className="text-xs md:text-sm text-gray-100">AI Adoption Pioneer</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
