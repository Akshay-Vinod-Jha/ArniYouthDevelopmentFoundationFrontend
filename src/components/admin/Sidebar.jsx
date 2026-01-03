import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image,
  Users,
  UserCheck,
  CreditCard,
  Heart,
  Mail,
  Library,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Blog Management",
      path: "/admin/blogs",
      icon: FileText,
    },
    {
      name: "Programs",
      path: "/admin/programs",
      icon: Briefcase,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Image,
    },
    {
      name: "Board Members",
      path: "/admin/board",
      icon: Users,
    },
    {
      name: "Volunteers",
      path: "/admin/volunteers",
      icon: UserCheck,
    },
    {
      name: "Memberships",
      path: "/admin/memberships",
      icon: CreditCard,
    },
    {
      name: "Contact Messages",
      path: "/admin/contacts",
      icon: Mail,
    },
    {
      name: "Donations",
      path: "/admin/donations",
      icon: Heart,
    },
    {
      name: "Image Library",
      path: "/admin/library",
      icon: Library,
    },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">AYDF Admin</h1>
        <p className="text-sm text-gray-400 mt-1">Management Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">© 2024 AYDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
