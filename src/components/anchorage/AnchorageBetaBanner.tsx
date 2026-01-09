import { BETA_ANNOUNCEMENT, BETA_MODE } from "@/lib/beta";

const AnchorageBetaBanner = () => {
  if (!BETA_MODE) return null;

  return (
    <div className="fixed left-0 right-0 top-14 md:top-16 z-40 border-b border-border/60 bg-card/80 backdrop-blur">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1.5 sm:gap-2 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-foreground">
            {BETA_ANNOUNCEMENT.label}
          </span>
          <p className="text-xs text-foreground/80 leading-snug">
            {BETA_ANNOUNCEMENT.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnchorageBetaBanner;
