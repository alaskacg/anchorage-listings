import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const networkSites = [
  {
    name: "Alaska Listings",
    description: "Statewide marketplace",
    url: "https://aklistings.com",
    badge: "Parent Site",
    isExternal: true,
  },
  {
    name: "Alcan Listings",
    description: "Interior Alaska & Alcan Corridor",
    url: "/",
    badge: "Interior",
    isExternal: false,
  },
  {
    name: "Anchorage Listings",
    description: "Greater Anchorage Metro",
    url: "/anchorage",
    badge: "You're Here",
    isExternal: false,
    isCurrent: true,
  },
  {
    name: "Kenai Listings",
    description: "Kenai Peninsula",
    url: "https://kenailistings.com",
    badge: "Peninsula",
    isExternal: true,
  },
];

const AnchorageEcosystemSites = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/10 border-y border-border/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Alaska Listings Network
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Anchorage Listings is part of the Alaska Listings family of regional marketplaces
          </p>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {networkSites.map((site, index) => {
            const CardContent = (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    site.isCurrent 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {site.badge}
                  </span>
                  {site.isExternal && (
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                <h3 className={`font-display text-sm font-semibold mb-1 transition-colors ${
                  site.isCurrent 
                    ? 'text-accent' 
                    : 'text-foreground group-hover:text-primary'
                }`}>
                  {site.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {site.description}
                </p>
              </>
            );

            if (site.isExternal) {
              return (
                <motion.a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block bg-card rounded-lg p-4 border transition-all duration-300 hover:shadow-md ${
                    site.isCurrent 
                      ? 'border-accent/40 cursor-default' 
                      : 'border-border/30 hover:border-primary/40'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {CardContent}
                </motion.a>
              );
            }

            return (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={site.url}
                  className={`group block bg-card rounded-lg p-4 border transition-all duration-300 hover:shadow-md ${
                    site.isCurrent 
                      ? 'border-accent/40 cursor-default pointer-events-none' 
                      : 'border-border/30 hover:border-primary/40'
                  }`}
                >
                  {CardContent}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnchorageEcosystemSites;
