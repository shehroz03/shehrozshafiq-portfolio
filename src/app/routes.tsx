import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, Component: AdminLogin },
      { path: "dashboard", Component: AdminDashboard },
    ],
  },
]);
