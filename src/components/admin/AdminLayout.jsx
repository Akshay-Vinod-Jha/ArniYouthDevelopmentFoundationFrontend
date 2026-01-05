import { Outlet, Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import Sidebar from "./Sidebar";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const { isAuthenticated, admin, logout, loading } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full lg:w-auto">
          {/* Admin Top Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button and Title */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isSidebarOpen ? (
                    <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  )}
                </button>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    Admin Panel
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    Manage your organization effectively
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {admin?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {admin?.role}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
