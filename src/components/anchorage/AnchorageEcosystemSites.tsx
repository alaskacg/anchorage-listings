import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Import background images
import alcanCard from "@/assets/network/alcan-card.jpg";
import chugachCard from "@/assets/network/chugach-card.jpg";
import tongassCard from "@/assets/network/tongass-card.jpg";
import kenaiCard from "@/assets/network/kenai-card.jpg";
import prudhoeCard from "@/assets/network/prudhoe-card.jpg";
import bristolBayCard from "@/assets/network/bristol-bay-card.jpg";
import bethelCard from "@/assets/network/bethel-card.jpg";
import boatsCard from "@/assets/network/boats-card.jpg";
import miningCard from "@/assets/network/mining-card.jpg";

const networkSites = [
  {
    name: "Alcan Listings",
    description: "Interior Alaska & Alcan Corridor",
    url: "https://alcanlistings.com",
    image: alcanCard,
  },
  {
    name: "Chugach Listings",
    description: "Chugach Region",
    url: "https://chugachlistings.com",
    image: chugachCard,
  },
  {
    name: "Tongass Listings",
    description: "Southeast Alaska",
    url: "https://tongasslistings.com",
    image: tongassCard,
  },
  {
    name: "Kenai Listings",
    description: "Kenai Peninsula",
    url: "https://kenailistings.com",
    image: kenaiCard,
  },
  {
    name: "Prudhoe Listings",
    description: "North Slope & Arctic",
    url: "https://prudhoelistings.com",
    image: prudhoeCard,
  },
  {
    name: "Bristol Bay Listings",
    description: "Bristol Bay Region",
    url: "https://bristolbaylistings.com",
    image: bristolBayCard,
  },
  {
    name: "Bethel Listings",
    description: "Yukon-Kuskokwim Delta",
    url: "https://bethellistings.com",
    image: bethelCard,
  },
  {
    name: "Alaskan Boats",
    description: "Marine Marketplace",
    url: "https://alaskanboats.com",
    image: boatsCard,
  },
  {
    name: "AK Mining Equipment",
    description: "Mining Marketplace",
    url: "https://alaskaminingequipment.com",
    image: miningCard,
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
            Explore regional marketplaces across Alaska
          </p>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {networkSites.map((site, index) => (
            <motion.a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${site.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-sm md:text-base font-bold text-white mb-0.5 drop-shadow-lg">
                      {site.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-white/80">
                      {site.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnchorageEcosystemSites;
