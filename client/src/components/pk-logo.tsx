import { useTheme } from "./theme-provider";

export function PKLogo({ size = "default", className = "" }: { size?: "small" | "default" | "large", className?: string }) {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl lg:text-5xl"
  };

  return (
    <div className={`font-bold tracking-tight ${sizeClasses[size]} ${className}`} data-testid="pk-logo">
      <span className="text-blue-600">
        P.K.
      </span>
      <span className="ml-1 text-gray-900">
        KODURI
      </span>
    </div>
  );
}

export function PKLogoStacked({ size = "default", className = "" }: { size?: "small" | "default" | "large", className?: string }) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    small: { initials: "text-3xl", name: "text-xs" },
    default: { initials: "text-4xl md:text-5xl", name: "text-sm md:text-base" },
    large: { initials: "text-4xl md:text-5xl lg:text-6xl", name: "text-sm md:text-base lg:text-lg" }
  };

  return (
    <div className={`text-center font-bold tracking-tight ${className}`} data-testid="pk-logo-stacked">
      <div className={`leading-none ${sizeClasses[size].initials} ${
        theme === 'professional' 
          ? 'text-blue-600' 
          : 'text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text'
      }`}>
        P.K.
      </div>
      <div className={`leading-tight tracking-widest ${sizeClasses[size].name} ${
        theme === 'professional' 
          ? 'text-gray-700' 
          : 'text-gray-300'
      }`}>
        KODURI
      </div>
    </div>
  );
}

export function PKLogoMinimal({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
      theme === 'professional' 
        ? 'bg-blue-600 text-white' 
        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
    } ${className}`} data-testid="pk-logo-minimal">
      PK
    </div>
  );
}