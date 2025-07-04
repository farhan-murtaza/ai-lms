import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-slidebar";

const Navbar = () => {
  return (
    <div className=" p-4 border-b h-full flex items-center bg-white shadow-sm z-50 ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
