import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const neighborhoods = [
  { name: "Downtown Anchorage", description: "City center, business district, and waterfront", count: 0 },
  { name: "Midtown", description: "Central residential and commercial hub", count: 0 },
  { name: "South Anchorage", description: "Hillside communities and suburban areas", count: 0 },
  { name: "Eagle River", description: "Family-friendly community north of Anchorage", count: 0 },
  { name: "Chugiak", description: "Rural community in the Chugiak-Eagle River area", count: 0 },
  { name: "Girdwood", description: "Resort community and Alyeska ski area", count: 0 },
  { name: "JBER", description: "Joint Base Elmendorf-Richardson", count: 0 },
  { name: "Muldoon", description: "Diverse neighborhood in east Anchorage", count: 0 },
  { name: "Airport Heights", description: "Neighborhood near Merrill Field", count: 0 },
  { name: "Spenard", description: "Eclectic neighborhood with local businesses", count: 0 },
  { name: "Sand Lake", description: "Residential area in southwest Anchorage", count: 0 },
  { name: "Hillside", description: "Upscale homes with mountain views", count: 0 },
];

const AnchorageRegions = () => {
  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="Anchorage Neighborhoods | Anchorage Listings" path="/regions" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Anchorage Neighborhoods
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse listings by neighborhood across the Greater Anchorage area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/browse?neighborhood=${neighborhood.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">{neighborhood.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{neighborhood.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg">Browse All Listings</Button>
            </Link>
          </div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageRegions;
