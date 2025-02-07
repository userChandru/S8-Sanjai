import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const location = useLocation();

  const AdminNavItems = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      name: "Bank",
      link: "/admin/bank",
    }
  ];

  const currentNavItem = AdminNavItems.find(
    (item) => item.link === location.pathname
  );

  return (
    <div className="flex relative">
      <AdminNavbar />
      <div className="bg-white m-2 rounded-2xl h-[97.5vh] overflow-scroll scrollbar-none w-full">
        <header className="sticky top-0 z-20 bg-white p-3">
          <p className="text-3xl font-semibold">
            {currentNavItem ? currentNavItem.name : "Page Not Found"}
          </p>
        </header>
        <Outlet />
      </div>
      <div className="w-[35vw] my-2 mr-2">
        <AdminSidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
