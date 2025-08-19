import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./theme-provider";

export function AchievementsTimeline() {
  const { theme } = useTheme();
  const achievements = theme === 'professional' ? [
    {
      period: "2010-2011",
      title: "Clinical Foundation Building",
      description: "Started as Clinical Specialist conducting in-service training for OR and office staff in vascular surgery departments. Provided technical support in OR, assisted surgeons in planning procedures, and represented Cook Medical at regional conferences.",
      tags: ["Clinical Training", "OR Support", "Medical Education"]
    },
    {
      period: "2011-2014", 
      title: "Zenith Fenestrated FDA Success",
      description: "Successfully launched the first FDA-approved fenestrated abdominal endograft in the US as Product Manager. Met all post-launch objectives including revenue and market share targets for FY2013. Developed Advanced Clinical Specialist program and 2-day physician workshops for FDA compliance.",
      tags: ["FDA Launch", "Clinical Programs", "Patient Outcomes"]
    },
    {
      period: "2014-2016",
      title: "Strategic Healthcare Planning", 
      description: "As Manager of Strategic Projects, developed health economics framework for global product development. Created seal zone education campaigns and conducted cardiothoracic specialty due diligence to expand patient access to life-saving technologies.",
      tags: ["Health Economics", "Patient Access", "Strategic Planning"]
    },
    {
      period: "2017-2018",
      title: "$250M+ Patient Impact Portfolio",
      description: "Owned global marketing mix for $250+ Million portfolio of life-saving endografts. Achieved high single-digit market share growth, directly expanding patient access to critical vascular interventions worldwide.",
      tags: ["Patient Impact", "Global Reach", "Clinical Success"]
    },
    {
      period: "2021-Present",
      title: "Dual-Division Patient Impact Leadership",
      description: "Unique joint appointment across MedSurg and Vascular Divisions created in partnership with Cook leadership. Led comprehensive patient-focused initiatives including TeslaTome ERCP go-to-market strategy development, NEST-VT reproductive health improvements, and Account Integration program ensuring unified patient care approach.",
      tags: ["Patient-Centered Care", "Cross-Division Leadership", "Integrated Patient Solutions"]
    }
  ] : [
    {
      period: "2008-2010",
      title: "Startup Disruption Experience",
      description: "Developed SaaS product GatherWare to harness collective intelligence, successfully implementing for 150+ engineers at global manufacturing company. Improved production efficiency and enabled new product development through innovation management.",
      tags: ["SaaS Innovation", "Process Disruption", "Efficiency Gains"]
    },
    {
      period: "2010-2014",
      title: "Breaking Traditional Launch Models",
      description: "Shattered conventional medical device launch timelines by pioneering the first FDA-approved fenestrated endograft launch. Disrupted standard training models with intensive 2-day workshops that compressed months of education into accelerated programs.",
      tags: ["Launch Disruption", "Training Revolution", "Speed Innovation"]
    },
    {
      period: "2014-2018", 
      title: "Portfolio Dominance Strategy",
      description: "Owned marketing strategy development for $250M+ endograft portfolio, achieving high single-digit market share growth against entrenched competitors. Pioneered market disruption tactics that positioned organization ahead of traditional device manufacturers.",
      tags: ["Portfolio Strategy", "Market Disruption", "Competitive Leadership"]
    },
    {
      period: "2018-2020",
      title: "Strategic Future Planning Leadership",
      description: "Led horizon-scanning project analyzing industry trends to develop future healthcare scenarios. Created strategic playbooks with recommendations for AI, robotics, and additive manufacturing partnerships—positioning organization ahead of technological advancement.",
      tags: ["Future Planning", "Tech Integration", "Strategic Advantage"]
    },
    {
      period: "2023-Present", 
      title: "AI Innovation Leadership & Digital Transformation",
      description: "Pioneer in enterprise AI adoption, earning Digital Frontier Award (November 2024) for architecting organization-wide AI transformation across marketing workflows. Leading contributor and strategic leader in Marketing Generative AI Workgroup, shaping organizational AI approach. Developed custom AI assistant 'Emma' for personalized marketing content. Finalist in LoopTech CEO Innovation Challenge.",
      tags: ["AI Leadership", "Digital Transformation", "Innovation Awards"]
    }
  ];

  return (
    <section className="py-20 bg-muted/50 theme-transition" id="achievements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="achievements-title">
            {theme === 'professional' ? 'Career Journey: Patient-Focused Milestones' : 'Disruption Timeline: Organizational Breakthroughs'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="achievements-subtitle">
            {theme === 'professional' 
              ? "A systematic progression through medical device marketing, with each role building deeper expertise in bringing life-saving technologies to patients worldwide."
              : "A track record of organizational disruption, consistently breaking traditional models to accelerate medical innovation while maintaining regulatory excellence."
            }
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-border"></div>
          
          {achievements.map((achievement, index) => (
            <div key={index} className="relative flex items-center mb-12" data-testid={`achievement-${index}`}>
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              <div className="md:hidden absolute left-4 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              
              {/* Content */}
              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8 md:ml-auto'}`}>
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {achievement.period}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {achievement.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
