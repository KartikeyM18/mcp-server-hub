import { Outlet, useLocation , matchPath } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Layout() {

  const location = useLocation()
  const hideHeaderRoutes = ["/login", "/register", "/developer/dev-login", "/developer/dev-home","/servers/:serverid" , "/developer/giveapproval/:serverid","/404","/developer/dev-home/:serverid"];
const shouldHideHeader = hideHeaderRoutes.some((route) =>
  matchPath({ path: route, end: true }, location.pathname)
);
  return (
    <div className="flex flex-col min-h-screen">
    { !shouldHideHeader &&  < Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
    {!shouldHideHeader &&  <Footer />}
    </div>
  );
}
