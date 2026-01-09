import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnchorageHeader from "@/components/anchorage/AnchorageHeader";
import AnchorageFooter from "@/components/anchorage/AnchorageFooter";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const AnchorageAdminPayments = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add("anchorage");
    return () => {
      document.documentElement.classList.remove("anchorage");
    };
  }, []);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnchorageHeader />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Payments</h1>
          <p className="text-muted-foreground">Admin payment history coming soon.</p>
        </div>
      </main>
      <AnchorageFooter />
    </div>
  );
};

export default AnchorageAdminPayments;
