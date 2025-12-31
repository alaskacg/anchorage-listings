import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid, Search, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const AnchorageHeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Dark urban gradient background - no aurora */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Gradient mesh - subtle and dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Floating orbs - very subtle */}
        <motion.div 
          className="absolute top-1/3 left-1/5 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-secondary/8 rounded-full blur-[120px]"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.12, 0.2, 0.12]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline with styled treatment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              <span>Anchorage's Premier</span>
              <span className="block mt-1">Private Marketplace</span>
            </h1>
          </motion.div>

          {/* Subheadline - brighter text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8"
          >
            Buy and sell vehicles, boats, real estate, and more across the Anchorage Bowl. 
            No middlemen. No commissions. Just <span className="text-accent font-bold">$10</span> for 60 days.
          </motion.p>

          {/* Stats - refined cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {[
              { value: "12", label: "Neighborhoods" },
              { value: "8", label: "Categories" },
              { value: "60", label: "Day Listings", highlight: true }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="text-center px-6 py-3 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`font-display text-2xl md:text-3xl font-bold ${stat.highlight ? 'text-accent' : 'text-foreground'}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - updated styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/anchorage/browse">
              <Button size="xl" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                <Search className="w-5 h-5 mr-2" />
                Browse Listings
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/anchorage/post-listing">
              <Button variant="outline" size="xl" className="group border-border/50 hover:border-primary/50 hover:bg-primary/5">
                <Sparkles className="w-5 h-5 mr-2" />
                Post for $10
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            <Link to="/anchorage/regions">
              <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground hover:bg-card/50">
                <MapPin className="w-4 h-4 mr-2" />
                Explore Neighborhoods
              </Button>
            </Link>
            <Link to="/anchorage/categories">
              <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground hover:bg-card/50">
                <Grid className="w-4 h-4 mr-2" />
                Browse Categories
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default AnchorageHeroSection;
