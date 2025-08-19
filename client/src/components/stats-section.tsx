import { useTheme } from "./theme-provider";

export function StatsSection() {
  const { theme } = useTheme();
  
  const stats = theme === 'professional' ? [
    { value: "15+", label: "Years Patient-Focused Innovation" },
    { value: "$250M+", label: "Portfolio Impact on Patient Care" },
    { value: "95.5%", label: "Clinical Success Rates Achieved" },
    { value: "Global", label: "Patient Access Expansion" }
  ] : [
    { value: "Award", label: "Digital Frontier AI Leadership" },
    { value: "$250M+", label: "Portfolio Disruption Impact" },
    { value: "18x", label: "Faster AI-Powered Workflows" },
    { value: "Enterprise", label: "AI Adoption Pioneer" }
  ];

  return (
    <section className="py-16 bg-muted/50 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in" data-testid={`stat-${index}`}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
