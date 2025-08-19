import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Award, Globe } from "lucide-react";
import { useTheme } from "./theme-provider";

export function AboutSection() {
  const { theme } = useTheme();
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "MBA Marketing & Strategy, Indiana University Kelley School"
    },
    {
      icon: Briefcase,
      title: "Experience", 
      description: "Cook Medical, Lexmark International, Multiple Startups"
    },
    {
      icon: Award,
      title: "Expertise",
      description: "Product Launch, Strategic Marketing, Global Expansion"
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Worldwide patient outcomes improvement"
    }
  ];

  return (
    <section className="py-20 theme-transition" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="about-title">
            About P.K. Koduri
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            {theme === 'professional' 
              ? "A methodical leader focused on patient outcomes, with 15+ years systematically bringing breakthrough medical technologies to patients who need them most."
              : "A process improvement leader who streamlines organizational efficiency, with 15+ years modernizing medical innovation practices in established healthcare organizations."
            }
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg text-muted-foreground max-w-none" data-testid="about-content">
            {theme === 'professional' ? (
              <>
                <p className="mb-6">
                  My career centers on ensuring breakthrough medical technologies reach every patient who needs them. From launching the first FDA-approved fenestrated endograft to managing $250M+ portfolios, I focus on systematic execution that delivers 95.5% clinical success rates.
                </p>
                <p className="mb-6">
                  My approach combines rigorous clinical training—from OR support to physician education programs—with strategic marketing expertise gained through my MBA from Indiana University's Kelley School of Business.
                </p>
                <p>
                  Whether developing Advanced Clinical Specialist programs, creating 2-day physician workshops for FDA compliance, or building global market strategies, every initiative serves one goal: improving patient outcomes through proven medical device adoption.
                </p>
              </>
            ) : (
              <>
                <p className="mb-6">
                  I modernize processes that slow medical innovation. While traditional planning cycles take 90 days, I've streamlined development timelines to 5 days using design sprint methodologies adapted from technology industry best practices.
                </p>
                <p className="mb-6">
                  My dual-role appointments across MedSurg and Vascular divisions improve cross-functional collaboration. I've helped teams transition from traditional processes to more efficient workflows that maintain regulatory compliance while accelerating delivery.
                </p>
                <p>
                  From launching products ahead of schedule to coordinating marketing functions across four separate business units, I create operational advantages through improved efficiency while preserving the clinical excellence patients deserve.
                </p>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="card-hover" data-testid={`highlight-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-accent-foreground" size={20} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
