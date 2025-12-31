import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const networkSites = [
  {
    name: "Alaska Listings",
    description: "Statewide marketplace",
    url: "https://aklistings.com",
    badge: "Parent Site",
  },
  {
    name: "Alcan Listings",
    description: "Interior Alaska & Alcan Corridor",
    url: "/",
    badge: "Sister Site",
  },
  {
    name: "Kenai Auto Sales",
    description: "Vehicles & automobiles",
    url: "https://kenaiautosales.com",
    badge: "Vehicles",
  },
  {
    name: "Alaskan Boats",
    description: "Boats & watercraft",
    url: "https://alaskanboats.com",
    badge: "Marine",
  },
  {
    name: "Kenai Home Sales",
    description: "Residential real estate",
    url: "https://kenaihomesales.com",
    badge: "Real Estate",
  },
  {
    name: "Alaska Mining Equipment",
    description: "Mining & prospecting gear",
    url: "https://alaskaminingequipment.com",
    badge: "Mining",
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
            Anchorage Listings is part of the Alaska Listings family of marketplaces
          </p>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {networkSites.map((site, index) => (
            <motion.a
              key={site.name}
              href={site.url}
              target={site.url.startsWith("http") ? "_blank" : undefined}
              rel={site.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group block bg-card rounded-lg p-4 border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {site.badge}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {site.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {site.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnchorageEcosystemSites;
