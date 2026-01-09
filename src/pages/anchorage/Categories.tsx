import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";
import { Button } from "@/components/ui/button";
import { Car, Ship, Home, Mountain, Key, Pickaxe, Compass, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Vehicles", icon: Car, description: "Cars, trucks, ATVs, snowmobiles", slug: "vehicles" },
  { name: "Boats & Watercraft", icon: Ship, description: "Fishing boats, kayaks, jet skis", slug: "boats" },
  { name: "Homes for Sale", icon: Home, description: "Residential properties", slug: "homes" },
  { name: "Land & Lots", icon: Mountain, description: "Lots, acreage, wilderness land", slug: "land" },
  { name: "Rentals", icon: Key, description: "Apartments, houses, cabins", slug: "rentals" },
  { name: "Mining Equipment", icon: Pickaxe, description: "Gold mining, dredges, sluices", slug: "mining" },
  { name: "Guide Services", icon: Compass, description: "Fishing, hunting, tours", slug: "guides" },
  { name: "General", icon: Package, description: "Everything else", slug: "general" },
];

const AnchorageCategories = () => {
  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="Categories | Anchorage Listings" path="/categories" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you're looking for in the Anchorage area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/browse?category=${category.slug}`}
                  className="block bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors group text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg">
                Browse All Listings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageCategories;
