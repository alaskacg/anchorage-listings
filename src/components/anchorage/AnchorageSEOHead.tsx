import { Helmet } from "react-helmet-async";

interface AnchorageSEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const AnchorageSEOHead = ({ 
  title = "Anchorage Listings | Greater Anchorage Metro Private Marketplace",
  description = "Buy and sell vehicles, boats, real estate, and more across Greater Anchorage. No commissions, just $10 flat rate for 60 days.",
  path = "/anchorage"
}: AnchorageSEOHeadProps) => {
  const fullUrl = `https://anclistings.com${path}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Anchorage Listings" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-AK" />
      <meta name="geo.placename" content="Anchorage" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Anchorage Listings",
          "url": "https://anclistings.com",
          "description": "Greater Anchorage Metro's Premier Private Listings Marketplace",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://anclistings.com/anchorage/browse?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default AnchorageSEOHead;
