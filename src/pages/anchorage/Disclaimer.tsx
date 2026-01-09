import { useEffect } from "react";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";

const AnchorageDisclaimer = () => {
  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead title="Disclaimer | Anchorage Listings" path="/disclaimer" />
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Disclaimer</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <p className="text-lg font-semibold text-foreground mb-2">Important Notice</p>
              <p>Anchorage Listings (anclistings.com) is operated by Alaska Listings LLC. We are a listing service only and do not participate in, endorse, or guarantee any transactions between users.</p>
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">No Warranty</h2>
            <p>All listings are provided "as is" without warranty of any kind. We make no representations about the accuracy, reliability, or completeness of any listing content.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">User Transactions</h2>
            <p>All transactions are conducted directly between buyers and sellers. Alaska Listings LLC is not a party to any transaction and assumes no responsibility for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The quality, safety, or legality of items listed</li>
              <li>The accuracy of listing descriptions</li>
              <li>The ability of sellers to sell or buyers to pay</li>
              <li>Any disputes arising from transactions</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">User Responsibility</h2>
            <p>Users are solely responsible for verifying the accuracy of listings, inspecting items before purchase, and conducting safe transactions. We recommend meeting in public places and using secure payment methods.</p>
            
            <h2 className="text-xl font-semibold text-foreground mt-8">Limitation of Liability</h2>
            <p>Alaska Listings LLC shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of this service or any transaction conducted through listings on our platform.</p>
          </div>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageDisclaimer;
