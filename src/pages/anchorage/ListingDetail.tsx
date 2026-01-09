import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, User, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  region: string;
  images: string[];
  created_at: string;
  expires_at: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
}

const AnchorageListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setListing(data as Listing);
      }
      setLoading(false);
    };

    fetchListing();
  }, [id]);

  const nextImage = () => {
    if (listing?.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = () => {
    if (listing?.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <AnchorageHeader />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Listing Not Found</h1>
            <p className="text-muted-foreground mb-8">This listing may have been removed or expired.</p>
            <Link to="/browse">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        </main>
        <AnchorageFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead 
        title={`${listing.title} | Anchorage Listings`}
        description={listing.description.slice(0, 160)}
        path={`/listing/${id}`}
      />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <Link to="/browse" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Images */}
            <div className="lg:col-span-3">
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {listing.images && listing.images.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={listing.images[currentImageIndex]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    {listing.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {listing.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-primary' : 'bg-background/60'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Images
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {listing.images && listing.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Badge variant="secondary" className="mb-3 capitalize">{listing.category}</Badge>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {listing.title}
                </h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  ${listing.price.toLocaleString()}
                </div>
              </motion.div>

              <motion.div
                className="space-y-3 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Anchorage, Alaska</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {format(new Date(listing.created_at), 'MMM d, yyyy')}</span>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                className="bg-card rounded-xl p-6 border border-border space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-semibold text-foreground">Contact Seller</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{listing.contact_name}</span>
                  </div>
                  <a 
                    href={`mailto:${listing.contact_email}`}
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{listing.contact_email}</span>
                  </a>
                  {listing.contact_phone && (
                    <a 
                      href={`tel:${listing.contact_phone}`}
                      className="flex items-center gap-3 text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{listing.contact_phone}</span>
                    </a>
                  )}
                </div>
                <a href={`mailto:${listing.contact_email}?subject=Inquiry about: ${listing.title}`}>
                  <Button className="w-full mt-4">Send Message</Button>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Description</h2>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {listing.description}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageListingDetail;
