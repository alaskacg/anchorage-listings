import { useEffect } from "react";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";

const AnchorageTerms = () => {
  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="Terms of Service | Anchorage Listings" path="/terms" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p className="text-lg">Last updated: January 2026</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
            <p>By accessing and using Anchorage Listings (anclistings.com), you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">2. Description of Service</h2>
            <p>Anchorage Listings provides an online platform for users in the Greater Anchorage area to post and browse private listings for vehicles, boats, real estate, and other items. We are a listing service only and do not participate in transactions between users.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use this service</li>
              <li>You are responsible for the accuracy of your listings</li>
              <li>You agree not to post fraudulent, misleading, or illegal content</li>
              <li>You are responsible for all transactions you enter into with other users</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Listing Fees</h2>
            <p>Standard listing fee is $10 for a 60-day listing period. Fees are non-refundable once a listing is published.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">5. Limitation of Liability</h2>
            <p>Alaska Listings LLC is not responsible for the quality, safety, or legality of items listed, the truth or accuracy of listings, or the ability of sellers to sell items or buyers to pay for them.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact</h2>
            <p>For questions about these terms, contact us at support@anclistings.com</p>
          </div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageTerms;
