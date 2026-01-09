import { useEffect } from "react";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";

const AnchoragePrivacy = () => {
  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="Privacy Policy | Anchorage Listings" path="/privacy" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p className="text-lg">Last updated: January 2026</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
            <p>We collect information you provide when creating an account or posting a listing, including your name, email address, and phone number (optional).</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To display your contact information on your listings (as you choose)</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">Third-Party Services</h2>
            <p>We use Supabase for authentication and data storage. Your data is protected according to their security policies.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
            <p>For privacy concerns, contact us at privacy@anclistings.com</p>
          </div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchoragePrivacy;
