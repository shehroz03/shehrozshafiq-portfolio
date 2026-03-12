import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";
import { SocialPopup } from "./SocialPopup";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <SocialPopup />
      <Outlet />
    </div>
  );
}
