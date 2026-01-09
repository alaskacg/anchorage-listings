import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Loader2, Eye, Trash2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  status: string;
  created_at: string;
  expires_at: string;
  images: string[];
}

const AnchorageMyListings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, price, category, status, created_at, expires_at, images')
        .eq('user_id', user.id)
        .eq('region', 'anchorage')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setListings(data as Listing[]);
      }
      setLoading(false);
    };

    if (user) {
      fetchListings();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Listing deleted", description: "Your listing has been removed." });
    } else {
      toast({ title: "Error", description: "Failed to delete listing.", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="My Listings | Anchorage Listings" path="/my-listings" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">My Listings</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage your Anchorage listings</p>
            </div>
            <Link to="/post-listing">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </Link>
          </div>

          {listings.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-card rounded-2xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-muted-foreground mb-6">You haven't posted any listings yet.</p>
              <Link to="/post-listing">
                <Button>Post Your First Listing</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  className="bg-card rounded-xl border border-border p-4 flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    {listing.images && listing.images[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{listing.title}</h3>
                        <p className="text-primary font-bold">${listing.price.toLocaleString()}</p>
                      </div>
                      <Badge className={`${getStatusColor(listing.status)} capitalize text-xs`}>
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="capitalize">{listing.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Expires {format(new Date(listing.expires_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link to={`/listing/${listing.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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

export default AnchorageMyListings;
