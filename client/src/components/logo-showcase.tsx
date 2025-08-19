import { useTheme } from "./theme-provider";
import { PKLogo, PKLogoStacked, PKLogoMinimal } from "./pk-logo";
import { Card, CardContent } from "@/components/ui/card";

export function LogoShowcase() {
  const { theme } = useTheme();
  
  return (
    <section className="py-20 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            P.K. Koduri Logo Variations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Modern, text-based logo treatments designed for professional versatility across all brand applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Primary Horizontal Logo */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <PKLogo size="large" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Primary Logo</h3>
              <p className="text-sm text-muted-foreground">
                Main horizontal treatment for headers, business cards, and primary brand applications.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-center">
                  <PKLogo size="default" />
                </div>
                <div className="flex justify-center">
                  <PKLogo size="small" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stacked Logo */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <PKLogoStacked size="large" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Stacked Logo</h3>
              <p className="text-sm text-muted-foreground">
                Vertical treatment for social media profiles, app icons, and square format applications.
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex justify-center">
                  <PKLogoStacked size="default" />
                </div>
                <div className="flex justify-center">
                  <PKLogoStacked size="small" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Minimal Logo */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <PKLogoMinimal className="w-16 h-16 text-xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Minimal Mark</h3>
              <p className="text-sm text-muted-foreground">
                Compact circular treatment for favicons, avatar images, and small-scale applications.
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <PKLogoMinimal className="w-12 h-12" />
                <PKLogoMinimal className="w-8 h-8 text-sm" />
                <PKLogoMinimal className="w-6 h-6 text-xs" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Theme Demonstration */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Theme-Adaptive Design
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Professional Theme Demo */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-professional-200">
              <CardContent className="p-8 text-center">
                <h4 className="font-semibold text-lg mb-4 text-gray-900">Professional Theme</h4>
                <div className="space-y-6">
                  <div className="text-2xl font-bold tracking-tight">
                    <span className="text-professional-600">P.K.</span>
                    <span className="ml-1 text-gray-800">KODURI</span>
                  </div>
                  <div className="text-center font-bold tracking-tight">
                    <div className="text-4xl leading-none text-professional-600">P.K.</div>
                    <div className="text-sm leading-tight tracking-widest text-gray-600">KODURI</div>
                  </div>
                  <div className="w-12 h-12 bg-professional-600 rounded-full flex items-center justify-center font-bold text-white mx-auto">
                    PK
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Clean, professional blue treatment emphasizing trust and medical expertise.
                </p>
              </CardContent>
            </Card>
            
            {/* Innovation Theme Demo */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-700">
              <CardContent className="p-8 text-center">
                <h4 className="font-semibold text-lg mb-4 text-white">Innovation Catalyst Theme</h4>
                <div className="space-y-6">
                  <div className="text-2xl font-bold tracking-tight">
                    <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">P.K.</span>
                    <span className="ml-1 text-white">KODURI</span>
                  </div>
                  <div className="text-center font-bold tracking-tight">
                    <div className="text-4xl leading-none text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">P.K.</div>
                    <div className="text-sm leading-tight tracking-widest text-gray-300">KODURI</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white mx-auto">
                    PK
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                  Dynamic gradient treatment reflecting innovation and forward-thinking leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}