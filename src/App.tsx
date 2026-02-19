import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "./pages/NotFound";

// Anchorage Pages (standalone site)
import AnchorageIndex from "./pages/anchorage/Index";
import AnchorageBrowse from "./pages/anchorage/Browse";
import AnchoragePostListing from "./pages/anchorage/PostListing";
import AnchorageLogin from "./pages/anchorage/Login";
import AnchorageRegister from "./pages/anchorage/Register";
import AnchorageListingDetail from "./pages/anchorage/ListingDetail";
import AnchorageMyListings from "./pages/anchorage/MyListings";
import AnchorageTerms from "./pages/anchorage/Terms";
import AnchoragePrivacy from "./pages/anchorage/Privacy";
import AnchorageDisclaimer from "./pages/anchorage/Disclaimer";
import AnchorageRegions from "./pages/anchorage/Regions";
import AnchorageCategories from "./pages/anchorage/Categories";
import AnchorageAdminDashboard from "./pages/anchorage/admin/Dashboard";
import AnchorageAdminListings from "./pages/anchorage/admin/AdminListings";
import AnchorageAdminUsers from "./pages/anchorage/admin/AdminUsers";
import AnchorageAdminPayments from "./pages/anchorage/admin/AdminPayments";
import AnchorageAdminSettings from "./pages/anchorage/admin/AdminSettings";

import ListingSuccess from "@/pages/ListingSuccess";
import ListingCancel from "@/pages/ListingCancel";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Anchorage Listings - anclistings.com */}
              <Route path="/" element={<AnchorageIndex />} />
              <Route path="/browse" element={<AnchorageBrowse />} />
              <Route path="/post-listing" element={<AnchoragePostListing />} />
              <Route path="/listing/:id" element={<AnchorageListingDetail />} />
              <Route path="/my-listings" element={<AnchorageMyListings />} />
              <Route path="/login" element={<AnchorageLogin />} />
              <Route path="/register" element={<AnchorageRegister />} />
              <Route path="/regions" element={<AnchorageRegions />} />
              <Route path="/categories" element={<AnchorageCategories />} />
              <Route path="/terms" element={<AnchorageTerms />} />
              <Route path="/privacy" element={<AnchoragePrivacy />} />
              <Route path="/disclaimer" element={<AnchorageDisclaimer />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AnchorageAdminDashboard />} />
              <Route path="/admin/listings" element={<AnchorageAdminListings />} />
              <Route path="/admin/users" element={<AnchorageAdminUsers />} />
              <Route path="/admin/payments" element={<AnchorageAdminPayments />} />
              <Route path="/admin/settings" element={<AnchorageAdminSettings />} />
              
              {/* Catch-all */}
              <Route path="/listing-success" element={<ListingSuccess />} />
            <Route path="/listing-cancel" element={<ListingCancel />} />
          <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
