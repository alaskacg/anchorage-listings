import { useEffect } from "react";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import AnchorageHeroSection from "@/components/anchorage/AnchorageHeroSection";
import AnchorageTrustIndicators from "@/components/anchorage/AnchorageTrustIndicators";
import AnchorageNeighborhoodsSection from "@/components/anchorage/AnchorageNeighborhoodsSection";
import AnchorageEcosystemSites from "@/components/anchorage/AnchorageEcosystemSites";
import AnchorageCTASection from "@/components/anchorage/AnchorageCTASection";
import AnchorageRecentListings from "@/components/anchorage/AnchorageRecentListings";
import AnchorageSEOHead from "@/components/anchorage/AnchorageSEOHead";
import AnchorageChroniclePromo from "@/components/anchorage/AnchorageChroniclePromo";

const AnchorageIndex = () => {
  useEffect(() => {
    // Apply Anchorage theme
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnchorageSEOHead />
      <AnchorageHeader />
      <main>
        <AnchorageHeroSection />
        <AnchorageTrustIndicators />
        <AnchorageNeighborhoodsSection />
        <AnchorageChroniclePromo />
        <AnchorageEcosystemSites />
        <AnchorageRecentListings />
        <AnchorageCTASection />
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageIndex;
