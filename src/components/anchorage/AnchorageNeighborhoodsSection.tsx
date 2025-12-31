import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin,
  Mountain,
  TreePine,
  Home,
  Plane
} from "lucide-react";

const neighborhoods = [
  {
    name: "Downtown Anchorage",
    description: "City center, business district, and waterfront",
    icon: Building2,
    href: "/anchorage/browse?region=downtown",
  },
  {
    name: "Midtown",
    description: "Central hub with shopping and dining",
    icon: MapPin,
    href: "/anchorage/browse?region=midtown",
  },
  {
    name: "South Anchorage",
    description: "Hillside communities and family neighborhoods",
    icon: Home,
    href: "/anchorage/browse?region=south-anchorage",
  },
  {
    name: "East Anchorage",
    description: "Muldoon, Mountain View, and Russian Jack",
    icon: TreePine,
    href: "/anchorage/browse?region=east-anchorage",
  },
  {
    name: "Eagle River / Chugiak",
    description: "Suburban communities north of Anchorage",
    icon: Mountain,
    href: "/anchorage/browse?region=eagle-river",
  },
  {
    name: "Girdwood",
    description: "Resort town and Alyeska ski area",
    icon: Mountain,
    href: "/anchorage/browse?region=girdwood",
  },
  {
    name: "JBER",
    description: "Joint Base Elmendorf-Richardson",
    icon: Plane,
    href: "/anchorage/browse?region=jber",
  },
  {
    name: "Birchwood / Peters Creek",
    description: "Rural communities along the Glenn Highway",
    icon: TreePine,
    href: "/anchorage/browse?region=birchwood",
  },
];

const AnchorageNeighborhoodsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/40 mb-4">
            <Building2 className="w-4 h-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-secondary-foreground">Explore by Area</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Greater Anchorage Neighborhoods
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find listings in your neighborhood or explore opportunities across the Anchorage metro
          </p>
        </div>

        {/* Neighborhoods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={neighborhood.href}
                className="group block bg-card rounded-xl p-5 border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <neighborhood.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {neighborhood.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {neighborhood.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link 
            to="/anchorage/regions" 
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View all neighborhoods →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnchorageNeighborhoodsSection;
