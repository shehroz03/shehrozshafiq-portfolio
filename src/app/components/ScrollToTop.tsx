import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top on route change
    window.scrollTo(0, 0);
    
    // Fallback for slower-loading content or transitions
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
