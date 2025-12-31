import React, { createContext, useContext, useEffect, useState } from "react";

type SiteId = "alcan" | "anchorage";

interface SiteConfig {
  id: SiteId;
  name: string;
  shortName: string;
  domain: string;
  email: string;
  tagline: string;
  description: string;
  regionLabel: string;
  parentSite: { name: string; url: string };
}

const siteConfigs: Record<SiteId, SiteConfig> = {
  alcan: {
    id: "alcan",
    name: "Alcan Listings",
    shortName: "Alcan",
    domain: "alcanlistings.com",
    email: "support@alcanlistings.com",
    tagline: "Interior Alaska's Premier Private Listings Marketplace",
    description: "Connecting buyers and sellers across the Alcan corridor",
    regionLabel: "Interior Regions",
    parentSite: { name: "Alaska Listings (Statewide)", url: "https://aklistings.com" },
  },
  anchorage: {
    id: "anchorage",
    name: "Anchorage Listings",
    shortName: "Anchorage",
    domain: "anclistings.com",
    email: "support@anclistings.com",
    tagline: "Greater Anchorage Metro's Premier Private Listings Marketplace",
    description: "Connecting buyers and sellers across Greater Anchorage",
    regionLabel: "Anchorage Neighborhoods",
    parentSite: { name: "Alaska Listings (Statewide)", url: "https://aklistings.com" },
  },
};

interface SiteContextType {
  site: SiteConfig;
  siteId: SiteId;
  setSiteId: (id: SiteId) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteId, setSiteId] = useState<SiteId>(() => {
    // Check URL or localStorage for site preference
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname.includes("anclistings") || hostname.includes("anchorage")) {
        return "anchorage";
      }
      // Check for route-based detection
      if (window.location.pathname.startsWith("/anchorage")) {
        return "anchorage";
      }
      // Check localStorage
      const stored = localStorage.getItem("siteId");
      if (stored === "anchorage" || stored === "alcan") {
        return stored;
      }
    }
    return "alcan";
  });

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement;
    if (siteId === "anchorage") {
      root.classList.add("anchorage");
    } else {
      root.classList.remove("anchorage");
    }
    localStorage.setItem("siteId", siteId);
  }, [siteId]);

  const site = siteConfigs[siteId];

  return (
    <SiteContext.Provider value={{ site, siteId, setSiteId }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};

export { siteConfigs };
export type { SiteId, SiteConfig };
