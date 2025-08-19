import { useTheme } from "./theme-provider";
import { PKLogo } from "./pk-logo";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-12 border-t theme-transition ${
      theme === 'professional' 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-gray-900 border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <PKLogo size="default" />
            <p className={`text-sm ${
              theme === 'professional' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {theme === 'professional' 
                ? 'Transforming medical technology into life-saving success through patient-focused innovation.'
                : 'Advancing medical innovation through process excellence and organizational efficiency.'
              }
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-lg ${
              theme === 'professional' ? 'text-gray-900' : 'text-white'
            }`}>
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className={`h-4 w-4 ${
                  theme === 'professional' ? 'text-professional-600' : 'text-purple-400'
                }`} />
                <span className={`text-sm ${
                  theme === 'professional' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Bloomington, Indiana
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`h-4 w-4 ${
                  theme === 'professional' ? 'text-professional-600' : 'text-purple-400'
                }`} />
                <a 
                  href="mailto:contact@pkoduri.com"
                  className={`text-sm hover:underline ${
                    theme === 'professional' ? 'text-gray-600 hover:text-professional-600' : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  contact@pkoduri.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className={`h-4 w-4 ${
                  theme === 'professional' ? 'text-professional-600' : 'text-purple-400'
                }`} />
                <a 
                  href="https://linkedin.com/in/pkoduri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm hover:underline ${
                    theme === 'professional' ? 'text-gray-600 hover:text-professional-600' : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  linkedin.com/in/pkoduri
                </a>
              </div>
            </div>
          </div>
          
          {/* Professional Summary */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-lg ${
              theme === 'professional' ? 'text-gray-900' : 'text-white'
            }`}>
              Professional Focus
            </h3>
            <div className="space-y-2">
              <div className={`text-sm ${
                theme === 'professional' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                • Medical Device Marketing
              </div>
              <div className={`text-sm ${
                theme === 'professional' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                • Strategic Product Launch
              </div>
              <div className={`text-sm ${
                theme === 'professional' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                • Global Market Development
              </div>
              <div className={`text-sm ${
                theme === 'professional' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                • Innovation Process Optimization
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-8 border-t text-center ${
          theme === 'professional' ? 'border-gray-200' : 'border-gray-700'
        }`}>
          <p className={`text-sm ${
            theme === 'professional' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            © {new Date().getFullYear()} P.K. Koduri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}