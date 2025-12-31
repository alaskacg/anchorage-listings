import { motion } from "framer-motion";

interface AnchorageLogoProps {
  className?: string;
}

const AnchorageLogo = ({ className = "" }: AnchorageLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        className="w-11 h-11 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent opacity-40 blur-md"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Main container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-card via-card to-card/80 border border-border/50 shadow-lg overflow-hidden">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Mountain silhouette - Chugach Mountains */}
          <svg 
            viewBox="0 0 44 44" 
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            {/* Background mountain range */}
            <motion.path
              d="M0 32 L8 22 L12 26 L18 16 L24 24 L28 20 L34 26 L40 18 L44 24 L44 44 L0 44 Z"
              fill="url(#mountainGradient)"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            
            {/* City skyline in front */}
            <motion.g
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Buildings */}
              <rect x="6" y="28" width="4" height="10" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="11" y="30" width="3" height="8" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="15" y="26" width="5" height="12" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="21" y="29" width="4" height="9" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="26" y="31" width="3" height="7" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="30" y="27" width="4" height="11" fill="url(#buildingGradient)" rx="0.5" />
              <rect x="35" y="30" width="3" height="8" fill="url(#buildingGradient)" rx="0.5" />
              
              {/* Building windows - animated */}
              <motion.rect 
                x="16.5" y="28" width="1.5" height="1.5" 
                fill="hsl(var(--accent))"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.rect 
                x="16.5" y="31" width="1.5" height="1.5" 
                fill="hsl(var(--accent))"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.rect 
                x="31" y="29" width="1.5" height="1.5" 
                fill="hsl(var(--accent))"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.rect 
                x="31" y="32" width="1.5" height="1.5" 
                fill="hsl(var(--accent))"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.rect 
                x="7" y="30" width="1.5" height="1.5" 
                fill="hsl(var(--accent))"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
            </motion.g>
            
            {/* Star/sparkle accent */}
            <motion.circle
              cx="36"
              cy="10"
              r="1.5"
              fill="hsl(var(--accent))"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default AnchorageLogo;
