import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useTheme } from "./theme-provider";

export function TestimonialsSection() {
  const { theme } = useTheme();

  const achievements = theme === 'professional' ? [
    {
      title: "Zenith Fenestrated Program Excellence",
      metric: "95.5% Freedom from Mortality",
      description: "Built comprehensive training ecosystem with 2-day physician workshops and proctor programs for the first FDA-approved fenestrated endograft. Over 90 accounts trained in Phase I with 30% year-over-year EVAR growth."
    },
    {
      title: "Global Patient Access Expansion",
      metric: "High Single-Digit Market Growth",
      description: "Extended fenestrated EVAR therapy globally across Europe, Canada, and Asia-Pacific. Captured significant market share gains in complex AAA segment, making life-saving therapy accessible to thousands of patients worldwide."
    },
    {
      title: "Clinical Training Infrastructure",
      metric: "Custom CRM System Built",
      description: "Developed Quickbase CRM system to track every fenestrated case from initial plan to implant. Monitored physician training status, order lead times, and outcomes to ensure only certified physicians received grafts."
    }
  ] : [
    {
      title: "TeslaTome Strategy Development",
      metric: "Go-to-Market Framework",
      description: "Led multiple design sprints developing comprehensive go-to-market strategy for breakthrough ERCP technology. Orchestrated cross-functional teams using agile methodology while coordinating marketing claims strategy for US, Japan, and EU regulatory pathways."
    },
    {
      title: "Design Sprint Innovation", 
      metric: "5-Day Development Cycles",
      description: "Introduced modern design sprint methodology to medical device marketing, adapting 5-day intensive workshops for corporate culture. Created agile deployment teams that efficiently transition between high-priority projects without waiting for annual planning cycles."
    },
    {
      title: "NEST-VT Brand Enhancement",
      metric: "Reproductive Health Innovation", 
      description: "Enhanced women's health product branding through creative sprints, developing new messaging and visual identity for oocyte cryopreservation success. Re-engaged sales teams around previously under-marketed reproductive medicine technology."
    }
  ];

  return (
    <section className="py-20 bg-muted/50 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="testimonials-title">
            Key Achievements & Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
            Quantifiable outcomes from P.K. Koduri's strategic marketing leadership at Cook Medical.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="card-hover" data-testid={`achievement-card-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary mb-2">{achievement.metric}</div>
                  <h3 className="font-semibold text-foreground text-lg">{achievement.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
