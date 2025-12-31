import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Grid, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AnchorageHeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Urban gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-secondary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Animated urban elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-2xl"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Greater Anchorage Metro</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Anchorage's Premier
            <span className="block text-gradient-mountain">Private Marketplace</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Buy and sell vehicles, boats, real estate, and more across the Anchorage Bowl. 
            No middlemen. No commissions. Just <span className="text-accent font-semibold">$10</span> for 60 days.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Neighborhoods</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-accent">60</div>
              <div className="text-sm text-muted-foreground">Day Listings</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/anchorage/browse">
              <Button variant="aurora" size="xl" className="group">
                <Search className="w-5 h-5 mr-2" />
                Browse Listings
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/anchorage/post-listing">
              <Button variant="outline" size="xl" className="group">
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
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Building2 className="w-4 h-4 mr-2" />
                Explore Neighborhoods
              </Button>
            </Link>
            <Link to="/anchorage/categories">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
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
