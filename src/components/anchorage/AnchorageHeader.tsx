import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import AnchorageLogo from "./AnchorageLogo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const neighborhoods = [
  { name: "Downtown Anchorage", href: "/anchorage/regions", description: "City center and business district" },
  { name: "Midtown", href: "/anchorage/regions", description: "Central residential and commercial hub" },
  { name: "South Anchorage", href: "/anchorage/regions", description: "Hillside and suburban communities" },
  { name: "Eagle River", href: "/anchorage/regions", description: "Eagle River and Chugiak area" },
  { name: "Girdwood", href: "/anchorage/regions", description: "Resort community and Alyeska" },
  { name: "JBER", href: "/anchorage/regions", description: "Joint Base Elmendorf-Richardson" },
];

const categories = [
  { name: "Vehicles", href: "https://kenaiautosales.com", description: "Cars, trucks, ATVs, snowmobiles" },
  { name: "Boats & Watercraft", href: "https://alaskanboats.com", description: "Fishing boats, kayaks, jet skis" },
  { name: "Homes for Sale", href: "https://kenaihomesales.com", description: "Residential properties" },
  { name: "Land for Sale", href: "https://kenailandsales.com", description: "Lots, acreage, wilderness" },
  { name: "Rentals", href: "https://kenaipeninsularentals.com", description: "Apartments, houses, cabins" },
  { name: "Mining Equipment", href: "https://alaskaminingequipment.com", description: "Gold mining, dredges, sluices" },
  { name: "Guide Services", href: "https://alaskaguidelistings.com", description: "Fishing, hunting, tours" },
  { name: "General Listings", href: "https://alaskadigs.com", description: "Everything else" },
];

const AnchorageHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/anchorage" className="flex items-center gap-2">
              <AnchorageLogo />
              <span className="font-display text-base font-bold text-foreground">Anchorage Listings</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm bg-transparent">Neighborhoods</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                        {neighborhoods.map((neighborhood) => (
                          <li key={neighborhood.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={neighborhood.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{neighborhood.name}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                  {neighborhood.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-2">
                          <Link
                            to="/anchorage/regions"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center text-sm text-primary"
                          >
                            View All Neighborhoods →
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm bg-transparent">Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                          <li key={category.name}>
                            <NavigationMenuLink asChild>
                              <a
                                href={category.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-full">
                          <Link
                            to="/anchorage/categories"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center text-sm text-primary"
                          >
                            View All Categories →
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/anchorage/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse All
              </Link>
              
              <ThemeToggle />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/anchorage/my-listings" className="cursor-pointer text-sm">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/anchorage/post-listing" className="cursor-pointer text-sm">Post a Listing</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/anchorage/admin" className="cursor-pointer text-sm">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive text-sm">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/anchorage/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/anchorage/post-listing">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Post a Listing
                    </Button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-up max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {/* Neighborhoods Accordion */}
            <details className="group">
              <summary className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                Neighborhoods
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 py-2 space-y-2">
                {neighborhoods.map((neighborhood) => (
                  <Link
                    key={neighborhood.name}
                    to={neighborhood.href}
                    className="block text-sm text-muted-foreground hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {neighborhood.name}
                  </Link>
                ))}
                <Link
                  to="/anchorage/regions"
                  className="block text-sm text-primary py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All →
                </Link>
              </div>
            </details>

            {/* Categories Accordion */}
            <details className="group">
              <summary className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                Categories
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 py-2 space-y-2">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-primary py-1"
                  >
                    {category.name}
                  </a>
                ))}
                <Link
                  to="/anchorage/categories"
                  className="block text-sm text-primary py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All →
                </Link>
              </div>
            </details>

            <Link 
              to="/anchorage/browse" 
              className="text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse All
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/anchorage/admin" 
                    className="text-sm text-primary hover:text-primary/80 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/anchorage/my-listings" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    My Listings
                  </Button>
                </Link>
                <Link to="/anchorage/post-listing" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Post a Listing
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="justify-start text-destructive mt-2"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/anchorage/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link to="/anchorage/post-listing" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Post a Listing
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AnchorageHeader;
