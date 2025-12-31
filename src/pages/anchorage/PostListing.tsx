import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, DollarSign, AlertCircle, Loader2 } from "lucide-react";
import { listingSchema } from "@/lib/validations";
import { motion } from "framer-motion";

const categories = [
  { value: "vehicles", label: "Vehicles & Autos" },
  { value: "boats", label: "Boats & Watercraft" },
  { value: "homes", label: "Homes for Sale" },
  { value: "land", label: "Land & Lots" },
  { value: "rentals", label: "Rentals" },
  { value: "mining", label: "Mining Equipment" },
  { value: "guides", label: "Guide Services" },
  { value: "general", label: "General" },
];

const neighborhoods = [
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

const AnchoragePostListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [category, setCategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/anchorage/login');
    }
  }, [user, authLoading, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (images.length + newFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum of 5 images per listing.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = newFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file type", description: `${file.name} is not an image.`, variant: "destructive" });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: `${file.name} exceeds 10MB.`, variant: "destructive" });
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (listingId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of images) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${listingId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('listing-images').upload(fileName, file);
      if (uploadError) continue;
      const { data: { publicUrl } } = supabase.storage.from('listing-images').getPublicUrl(fileName);
      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };

  const validateForm = () => {
    const result = listingSchema.safeParse({
      title,
      description,
      price: price ? parseFloat(price) : 0,
      category,
      region: 'anchorage',
      contactName,
      contactEmail,
      contactPhone: contactPhone || undefined,
    });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to post a listing.", variant: "destructive" });
      navigate('/anchorage/login');
      return;
    }

    if (!agreedToTerms) {
      toast({ title: "Terms Required", description: "Please agree to the Terms of Service.", variant: "destructive" });
      return;
    }

    if (!validateForm()) {
      toast({ title: "Validation Error", description: "Please fix the errors in the form.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 60);

      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          category,
          region: 'anchorage',
          title: title.trim(),
          price: parseFloat(price),
          description: description.trim(),
          contact_name: contactName.trim(),
          contact_email: contactEmail.trim(),
          contact_phone: contactPhone.trim() || null,
          status: 'pending',
          payment_status: 'unpaid',
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (listingError) throw listingError;

      if (images.length > 0 && listing) {
        const imageUrls = await uploadImages(listing.id);
        if (imageUrls.length > 0) {
          await supabase.from('listings').update({ images: imageUrls }).eq('id', listing.id);
        }
      }

      toast({ title: "Listing Created", description: "Your listing has been submitted for review." });
      navigate('/anchorage/my-listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({ title: "Error", description: "Failed to create listing. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnchorageHeader />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Post Your Anchorage Listing
            </h1>
            <p className="text-muted-foreground text-sm">
              Reach buyers across the Anchorage Bowl. $10 for 60 days.
            </p>
          </motion.div>

          <motion.div 
            className="bg-card/50 backdrop-blur rounded-2xl p-6 mb-10 flex items-center justify-between border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">$10 per listing</h3>
                <p className="text-xs text-muted-foreground">60 days • Up to 5 images</p>
              </div>
            </div>
            <div className="text-2xl font-display font-bold text-primary">$10</div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display text-lg font-semibold text-foreground">Listing Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood" className="text-sm">Neighborhood *</Label>
                  <Select value={neighborhood} onValueChange={setNeighborhood} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      {neighborhoods.map((n) => (
                        <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm">Listing Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., 2018 Ford F-150 XLT 4x4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  maxLength={2000}
                />
              </div>
            </motion.div>

            <motion.div 
              className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-display text-lg font-semibold text-foreground">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Your Name *</Label>
                  <Input id="name" placeholder="Full name" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Phone (optional)</Label>
                  <Input id="phone" type="tel" placeholder="(907) 555-0123" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-display text-lg font-semibold text-foreground">Images (up to 5)</h2>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={images.length >= 5}
                />
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${images.length >= 5 ? 'border-muted opacity-50' : 'border-border hover:border-primary'}`}>
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-1 text-sm">
                    {images.length >= 5 ? 'Maximum images reached' : 'Drop images here or click to upload'}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div 
              className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">Important Information</h3>
                  <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Your listing will be active for 60 days</li>
                    <li>Alaska Listings LLC is a listing service only</li>
                    <li>All transactions are between buyers and sellers</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>
                </Label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  'Submit Listing — $10'
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchoragePostListing;
