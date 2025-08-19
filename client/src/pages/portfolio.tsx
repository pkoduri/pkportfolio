import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { AboutSection } from "@/components/about-section";
import { AchievementsTimeline } from "@/components/achievements-timeline";
import { PortfolioSection } from "@/components/portfolio-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PortfolioProps {
  onBackToHome?: () => void;
}

export default function Portfolio({ onBackToHome }: PortfolioProps) {
  const { toast } = useToast();

  const downloadMutation = useMutation({
    mutationFn: async (type: string) => {
      const response = await apiRequest("GET", `/api/resume?type=${type}`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Download initiated",
        description: data.message || "Your download should begin shortly."
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Please try again later."
      });
    }
  });

  const handleDownloadResume = () => {
    downloadMutation.mutate("resume");
  };

  const handleDownloadResource = (type: string) => {
    downloadMutation.mutate(type);
  };

  const handleViewCaseStudies = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Back to themes button */}
      {onBackToHome && (
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToHome}
          className="fixed top-20 left-4 z-40 bg-background shadow-lg border"
          data-testid="back-to-themes"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Themes
        </Button>
      )}

      <HeroSection 
        onDownloadResume={handleDownloadResume}
        onViewCaseStudies={handleViewCaseStudies}
      />

      <AboutSection />
      <AchievementsTimeline />
      <PortfolioSection onDownloadResource={handleDownloadResource} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
