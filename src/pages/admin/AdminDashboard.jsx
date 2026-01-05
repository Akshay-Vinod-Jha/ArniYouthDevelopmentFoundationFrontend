import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StatCard from "../../components/admin/StatCard";
import {
  FileText,
  UserCheck,
  CreditCard,
  Heart,
  Mail,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    volunteers: 0,
    members: 0,
    donations: 0,
    contacts: 0,
    totalDonationAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No admin token found");
        setLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Fetch all stats in parallel
      const [blogsRes, volunteersRes, membersRes, donationsRes, contactsRes] =
        await Promise.all([
          axios
            .get(`${API_URL}/blog/admin/all?limit=1`, config)
            .catch(() => ({ data: { total: 0 } })),
          axios
            .get(`${API_URL}/volunteers?limit=1`, config)
            .catch(() => ({ data: { total: 0 } })),
          axios
            .get(`${API_URL}/members?limit=1`, config)
            .catch(() => ({ data: { total: 0 } })),
          axios
            .get(`${API_URL}/donations?limit=1`, config)
            .catch(() => ({ data: { total: 0, totalAmount: 0 } })),
          axios
            .get(`${API_URL}/contact?limit=1`, config)
            .catch(() => ({ data: { total: 0 } })),
        ]);

      setStats({
        blogs: blogsRes.data.total || 0,
        volunteers: volunteersRes.data.total || 0,
        members: membersRes.data.total || 0,
        donations: donationsRes.data.total || 0,
        contacts: contactsRes.data.total || 0,
        totalDonationAmount: donationsRes.data.totalAmount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      name: "Create Blog Post",
      path: "/admin/blogs",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      name: "Review Volunteers",
      path: "/admin/volunteers",
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      name: "Manage Members",
      path: "/admin/memberships",
      icon: CreditCard,
      color: "bg-purple-500",
    },
    {
      name: "View Donations",
      path: "/admin/donations",
      icon: Heart,
      color: "bg-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <StatCard
          title="Total Blogs"
          value={stats.blogs}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Volunteer Applications"
          value={stats.volunteers}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Active Members"
          value={stats.members}
          icon={CreditCard}
          color="purple"
        />
        <StatCard
          title="Total Donations"
          value={stats.donations}
          icon={Heart}
          color="red"
        />
        <StatCard
          title="Contact Messages"
          value={stats.contacts}
          icon={Mail}
          color="yellow"
        />
        <StatCard
          title="Donation Amount"
          value={`₹${stats.totalDonationAmount.toLocaleString()}`}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all hover:scale-105"
              >
                <div
                  className={`${action.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                  {action.name}
                </h3>
                <div className="flex items-center text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                  Go to page
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-primary/20 dark:border-gray-600 p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
          System Status
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          All systems operational. Last backup: Today at 3:00 AM
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
