import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
}
