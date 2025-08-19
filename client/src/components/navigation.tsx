import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Menu, Palette } from "lucide-react";
import { PKLogo } from "./pk-logo";

interface NavigationProps {
  onThemeToggle?: () => void;
}

export function Navigation({ onThemeToggle }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "professional" ? "disruptor" : "professional";
    setTheme(newTheme);
    onThemeToggle?.();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b theme-transition ${
      theme === 'professional' 
        ? 'bg-white/95 border-gray-200' 
        : 'bg-gray-900/95 border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-600">P.K.</span>
              <span className={`text-lg font-bold ml-1 ${theme === 'professional' ? 'text-gray-900' : 'text-white'}`}>KODURI</span>
            </div>
            <span className={`ml-3 text-sm hidden sm:inline font-medium ${theme === 'professional' ? 'text-gray-600' : 'text-gray-300'}`}>
              {theme === 'professional' ? 'Patient-Focused Innovation Leader' : 'Innovation Catalyst'}
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('achievements')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="nav-achievements"
              >
                Achievements
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`hidden lg:flex ${
                theme === 'professional' 
                  ? 'text-gray-600 hover:text-professional-600 hover:bg-professional-50' 
                  : 'text-gray-300 hover:text-disruptor-400 hover:bg-gray-800'
              }`}
              data-testid="theme-toggle"
            >
              <Palette className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${
                theme === 'professional' 
                  ? 'text-gray-600 hover:text-professional-600 hover:bg-professional-50' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              data-testid="mobile-menu-toggle"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => scrollToSection('about')}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('achievements')}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="mobile-nav-achievements"
              >
                Achievements
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="mobile-nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600' 
                    : 'text-gray-300 hover:text-disruptor-400'
                }`}
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className={`w-full justify-start lg:hidden ${
                  theme === 'professional' 
                    ? 'text-gray-600 hover:text-professional-600 hover:bg-professional-50' 
                    : 'text-gray-300 hover:text-disruptor-400 hover:bg-gray-800'
                }`}
                data-testid="mobile-theme-toggle"
              >
                <Palette className="h-4 w-4 mr-2" />
                Switch Theme
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
