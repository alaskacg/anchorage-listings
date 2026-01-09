import { Link } from "react-router-dom";
import { Mail, FileText, Shield, Scale, ExternalLink } from "lucide-react";
import AnchorageLogo from "./AnchorageLogo";
import { BETA_MODE } from "@/lib/beta";

const AnchorageFooter = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <AnchorageLogo />
              <span className="font-display text-base font-bold text-foreground">Anchorage Listings</span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              Greater Anchorage Metro's premier private listings marketplace connecting buyers and sellers across the Anchorage Bowl.
            </p>
            <div className="flex items-center gap-2 mb-4">
              {BETA_MODE ? (
                <>
                  <span className="text-xs text-muted-foreground">Beta:</span>
                  <span className="text-sm font-semibold text-accent">Free listings</span>
                  <span className="text-xs text-muted-foreground">(full 60-day run)</span>
                </>
              ) : (
                <>
                  <span className="text-xs text-muted-foreground">Listings just</span>
                  <span className="text-sm font-semibold text-accent">$10</span>
                  <span className="text-xs text-muted-foreground">for 60 days</span>
                </>
              )}
            </div>
            {/* Parent Site Link */}
            <a 
              href="https://aklistings.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Alaska Listings (Statewide)
            </a>
          </div>

          {/* Anchorage Neighborhoods */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Anchorage Neighborhoods</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/regions" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Downtown Anchorage
                </Link>
              </li>
              <li>
                <Link to="/regions" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Midtown / South Anchorage
                </Link>
              </li>
              <li>
                <Link to="/regions" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Eagle River / Chugiak
                </Link>
              </li>
              <li>
                <Link to="/regions" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Girdwood
                </Link>
              </li>
              <li>
                <Link to="/regions" className="text-primary hover:text-primary/80 transition-colors text-xs font-medium">
                  View All Neighborhoods →
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Categories</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/browse?category=vehicles" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/browse?category=boats" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Boats & Watercraft
                </Link>
              </li>
              <li>
                <Link to="/browse?category=real-estate" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/browse?category=mining" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Mining Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Scale className="w-3 h-3" />
                  Disclaimer
                </Link>
              </li>
              <li>
                <a href="mailto:support@anclistings.com" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Network Links - Regional sites only */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-muted-foreground text-xs text-center mb-3">Alaska Listings Network</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="https://aklistings.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
              Alaska Listings
            </a>
            <a href="https://alcanlistings.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Alcan Listings
            </a>
            <span className="text-foreground font-medium">Anchorage Listings</span>
            <a href="https://kenailistings.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Kenai Listings
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-muted-foreground text-xs text-center md:text-left">
              © {new Date().getFullYear()} Alaska Listings LLC. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs text-center md:text-right max-w-md">
              Alaska Listings LLC is a listing service only. We do not participate in, endorse, or guarantee any transactions between users.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AnchorageFooter;
