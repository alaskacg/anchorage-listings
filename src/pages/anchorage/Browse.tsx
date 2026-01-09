import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import { Search, SlidersHorizontal, X, Calendar, DollarSign, ArrowUpDown, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { BETA_MODE } from "@/lib/beta";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  region: string;
  images: string[];
  created_at: string;
  user_id: string;
  contact_name: string;
}

const anchorageNeighborhoods = [
  { value: "downtown", label: "Downtown Anchorage" },
  { value: "midtown", label: "Midtown" },
  { value: "south-anchorage", label: "South Anchorage" },
  { value: "eagle-river", label: "Eagle River" },
  { value: "chugiak", label: "Chugiak" },
  { value: "girdwood", label: "Girdwood" },
  { value: "jber", label: "JBER" },
  { value: "muldoon", label: "Muldoon" },
  { value: "airport-heights", label: "Airport Heights" },
  { value: "spenard", label: "Spenard" },
  { value: "sand-lake", label: "Sand Lake" },
  { value: "hillside", label: "Hillside" },
];

const categories = [
  { value: "vehicles", label: "Vehicles" },
  { value: "boats", label: "Boats" },
  { value: "homes", label: "Homes" },
  { value: "land", label: "Land" },
  { value: "rentals", label: "Rentals" },
  { value: "mining", label: "Mining" },
  { value: "guides", label: "Guides" },
  { value: "general", label: "General" },
];

const AnchorageBrowse = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [neighborhood, setNeighborhood] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('id, title, description, price, category, region, images, created_at, user_id, contact_name')
        .eq('status', 'active')
        .eq('region', 'anchorage');

      if (!BETA_MODE) {
        query = query.eq('payment_status', 'paid');
      }

      if (category !== 'all') {
        query = query.eq('category', category);
      }
      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }
      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [category, neighborhood, sortBy, minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setNeighborhood('all');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
  };

  const hasActiveFilters = category !== 'all' || neighborhood !== 'all' || minPrice || maxPrice || search;

  return (
    <div className="min-h-screen bg-background">
      <AnchorageHeader />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Browse Anchorage Listings
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Discover what's for sale across the Anchorage Bowl
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div 
            className="bg-card rounded-xl p-4 border border-border mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search Anchorage listings..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[140px] text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={neighborhood} onValueChange={setNeighborhood}>
                  <SelectTrigger className="w-[160px] text-sm">
                    <SelectValue placeholder="Neighborhood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Neighborhoods</SelectItem>
                    {anchorageNeighborhoods.map((n) => (
                      <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] text-sm">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <SlidersHorizontal className="w-3 h-3 mr-1" />
                      More
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="font-display text-lg">Advanced Filters</SheetTitle>
                      <SheetDescription className="text-xs">
                        Refine your Anchorage search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Price Range</Label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="Min"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className="pl-7 text-sm"
                            />
                          </div>
                          <span className="text-muted-foreground text-sm">to</span>
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="Max"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className="pl-7 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90" 
                        size="sm"
                        onClick={() => {
                          fetchListings();
                          setFiltersOpen(false);
                        }}
                      >
                        Apply Filters
                      </Button>

                      {hasActiveFilters && (
                        <Button 
                          variant="ghost" 
                          className="w-full text-sm" 
                          size="sm"
                          onClick={() => {
                            clearFilters();
                            setFiltersOpen(false);
                          }}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <Button type="submit" size="sm" className="text-sm bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </form>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Active filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    "{search}"
                    <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    {category}
                    <button onClick={() => setCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {neighborhood !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    {neighborhood}
                    <button onClick={() => setNeighborhood('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${listings.length} listing${listings.length !== 1 ? 's' : ''} found`}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-3" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                No Listings Found
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your filters."
                  : "Be the first to post a listing in Anchorage!"
                }
              </p>
              {hasActiveFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/anchorage/post-listing">Post the First Listing</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link 
                    to={`/listing/${listing.id}`}
                    className={`bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer block ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    <div className={`bg-muted ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}`}>
                      {listing.images?.[0] ? (
                        <img 
                          src={listing.images[0]} 
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-foreground text-sm line-clamp-1">{listing.title}</h3>
                        <span className="text-primary font-bold text-sm whitespace-nowrap">
                          ${listing.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{listing.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground capitalize">
                          {listing.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {listing.contact_name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageBrowse;
