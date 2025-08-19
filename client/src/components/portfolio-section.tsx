import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileText, BarChart3, Lightbulb } from "lucide-react";
import { useTheme } from "./theme-provider";

interface PortfolioSectionProps {
  onDownloadResource: (type: string) => void;
}

export function PortfolioSection({ onDownloadResource }: PortfolioSectionProps) {
  const { theme } = useTheme();

  const caseStudies = theme === 'professional' ? [
    {
      badge: "Implementation Deep-Dive",
      title: "Clinical Data Management: Fenestrated Program Database Architecture",
      description: "Architected comprehensive case management system tracking every fenestrated procedure from initial planning to patient outcomes. Integrated physician certification status, order processing workflows, and real-time performance metrics, creating scalable foundation for clinical program expansion still operational today.",
      metrics: ["End-to-End Case Tracking", "Real-Time Analytics", "Scalable Architecture"]
    },
    {
      badge: "Global Expansion Strategy",
      title: "Strategic Market Analysis: EVAR Center Opportunity Mapping", 
      description: "Developed systematic approach for identifying high-volume EVAR centers across multiple markets. Created data-driven opportunity mapping methodology that enabled targeted expansion of complex aneurysm treatment access, resulting in strategic market penetration framework adopted company-wide.",
      metrics: ["Data-Driven Targeting", "Strategic Framework", "Market Intelligence"]
    },
    {
      badge: "Training Innovation",
      title: "Physician Workshop Methodology: Accelerated Competency Model",
      description: "Designed intensive 2-day workshop format that compressed months of traditional training into focused competency development. Recruited leading vascular surgeons as proctors and established certification pathways that became industry standard for complex device education.",
      metrics: ["Accelerated Learning", "Industry Standards", "Competency Certification"]
    }
  ] : [
    {
      badge: "Workflow Transformation",
      title: "Content Generation Revolution: From Hours to Minutes",
      description: "Pioneered systematic approach to AI-powered content creation, transforming marketing workflows from multi-hour manual processes to AI-assisted rapid development. Established quality control frameworks ensuring accuracy while achieving 18x speed improvements in campaign material production.",
      metrics: ["18x Speed Improvement", "Quality Frameworks", "Process Innovation"]
    },
    {
      badge: "Custom Solution Development", 
      title: "Emma AI Architecture: Persona-Driven Marketing Engine",
      description: "Engineered custom AI assistant 'Emma' from ground up, designing persona-specific content generation capabilities. Built intelligent system capable of adapting messaging for distinct healthcare buyer personas with consistent brand voice and strategic alignment.",
      metrics: ["Custom AI Engineering", "Persona Intelligence", "Brand Consistency"]
    },
    {
      badge: "Enterprise Strategy Implementation",
      title: "AI Adoption Framework: From Pilot to Organization-Wide Deployment",
      description: "Architected comprehensive change management framework for enterprise AI transformation, bridging technical capabilities with strategic business applications. Created advanced training methodologies, feedback systems, and success metrics that enabled organization-wide AI adoption achieving 18x workflow acceleration.",
      metrics: ["Change Management", "Training Systems", "Organizational Impact"]
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Executive Resume",
      description: "Complete track record of breakthrough achievements",
      color: "text-red-600 bg-red-100",
      type: "resume"
    },
    {
      icon: BarChart3,
      title: "Impact Metrics Report",
      description: "Quantified results: $250M+ impact, 95.5% success rates",
      color: "text-blue-600 bg-blue-100",
      type: "metrics"
    },
    {
      icon: Lightbulb,
      title: "Speed Innovation Playbook",
      description: "Silicon Valley methodology for medical devices",
      color: "text-green-600 bg-green-100",
      type: "framework"
    }
  ];

  return (
    <section className="py-20 theme-transition" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="portfolio-title">
            Implementation Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="portfolio-subtitle">
            Deep-dive analysis of methodologies, frameworks, and systematic approaches that drive measurable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <Card key={index} className="card-hover" data-testid={`case-study-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Badge 
                    variant="secondary"
                    className={index === 0 ? "bg-professional-100 text-professional-700" : 
                               index === 1 ? "bg-blue-100 text-blue-700" :
                               "bg-green-100 text-green-700"}
                  >
                    {study.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {study.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {study.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <Badge key={metricIndex} variant="outline" className="text-xs">
                      {metric}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on actual Cook Medical achievements
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Downloadable Resources */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center" data-testid="resources-title">
            Downloadable Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="card-hover" data-testid={`resource-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${resource.color}`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => onDownloadResource(resource.type)}
                      data-testid={`download-${resource.type}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
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
