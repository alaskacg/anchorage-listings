import { Newspaper, ArrowRight, Bell, Sparkles, Building2, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AnchorageChroniclePromo = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated background with urban theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-anchorage-urban/20 via-background to-anchorage-forest/20" />
      
      {/* Animated city skyline silhouette effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          style={{
            background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23334155' d='M0,120 L0,80 L30,80 L30,60 L50,60 L50,80 L80,80 L80,40 L100,40 L100,20 L120,20 L120,40 L140,40 L140,80 L180,80 L180,50 L200,50 L200,30 L220,30 L220,50 L240,50 L240,80 L280,80 L280,60 L300,60 L300,80 L340,80 L340,45 L360,45 L360,25 L380,25 L380,15 L400,15 L400,25 L420,25 L420,45 L440,45 L440,80 L480,80 L480,70 L500,70 L500,80 L540,80 L540,55 L560,55 L560,35 L580,35 L580,55 L600,55 L600,80 L640,80 L640,65 L660,65 L660,80 L700,80 L700,50 L720,50 L720,30 L740,30 L740,10 L760,10 L760,30 L780,30 L780,50 L800,50 L800,80 L840,80 L840,60 L860,60 L860,80 L900,80 L900,45 L920,45 L920,25 L940,25 L940,45 L960,45 L960,80 L1000,80 L1000,70 L1020,70 L1020,80 L1060,80 L1060,55 L1080,55 L1080,35 L1100,35 L1100,55 L1120,55 L1120,80 L1160,80 L1160,65 L1180,65 L1180,80 L1200,80 L1200,120 Z'/%3E%3C/svg%3E\") repeat-x bottom",
            backgroundSize: "1200px 120px",
          }}
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-anchorage-urban/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-anchorage-forest/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-anchorage-gold/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15] 
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-anchorage-gold/20 border border-anchorage-gold/40 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-anchorage-gold" />
                    </motion.div>
                    <span className="text-xs font-semibold text-anchorage-gold uppercase tracking-wider">Launching Soon</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Anchorage
                    <span className="block text-anchorage-urban">Chronicle</span>
                  </h2>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Your premier source for Anchorage news, local events, business updates, and community stories. 
                    Stay connected to Alaska's largest city.
                  </p>
                  
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                    {[
                      { icon: Building2, text: "Local News" },
                      { icon: MapPin, text: "Community" },
                      { icon: Clock, text: "Real-time" },
                    ].map((tag, i) => (
                      <motion.div
                        key={tag.text}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      >
                        <tag.icon className="w-3.5 h-3.5 text-anchorage-urban" />
                        <span className="text-xs font-medium text-foreground">{tag.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.a 
                    href="https://anchoragechronicle.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="group bg-anchorage-urban hover:bg-anchorage-urban/90 text-white shadow-lg shadow-anchorage-urban/30"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Get Notified at Launch
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-[320px] mx-auto">
                  {/* Outer animated rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-anchorage-urban/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-anchorage-forest/30"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-8 rounded-full border border-anchorage-gold/40"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-12 rounded-full border border-dashed border-anchorage-urban/30"
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-anchorage-urban via-anchorage-forest to-anchorage-urban flex items-center justify-center shadow-2xl shadow-anchorage-urban/40"
                      animate={{ 
                        boxShadow: [
                          "0 20px 50px -10px rgba(30, 58, 138, 0.4)",
                          "0 25px 60px -10px rgba(30, 58, 138, 0.6)",
                          "0 20px 50px -10px rgba(30, 58, 138, 0.4)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Newspaper className="w-16 h-16 md:w-18 md:h-18 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-6 right-10 w-12 h-12 rounded-xl bg-anchorage-forest/90 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Building2 className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-10 left-6 w-10 h-10 rounded-full bg-anchorage-gold/90 flex items-center justify-center shadow-lg"
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/2 left-2 w-8 h-8 rounded-lg bg-anchorage-urban/80 flex items-center justify-center shadow-lg"
                    animate={{ x: [0, -8, 0], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Clock className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  {/* Particle effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-anchorage-gold/60"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 pt-6 border-t border-border/30 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-anchorage-gold"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-anchorage-urban font-semibold">anchoragechronicle.com</span>
                <span>—</span>
                <span>Coming Soon to Anchorage</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnchorageChroniclePromo;
