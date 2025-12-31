import { Building2 } from "lucide-react";

interface AnchorageLogoProps {
  className?: string;
}

const AnchorageLogo = ({ className = "" }: AnchorageLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* City skyline with mountain backdrop */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
        <Building2 className="w-5 h-5 text-foreground" />
      </div>
    </div>
  );
};

export default AnchorageLogo;
