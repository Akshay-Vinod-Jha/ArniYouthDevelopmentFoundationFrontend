import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import {
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import Modal from "../../components/ui/Modal";

const MembershipManagement = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(response.data.members || []);
      setFilteredMembers(response.data.members || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter members
  useEffect(() => {
    let filtered = [...members];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => {
        if (statusFilter === "active") return m.isActive;
        if (statusFilter === "inactive") return !m.isActive;
        return true;
      });
    }

    // Plan filter
    if (planFilter !== "all") {
      filtered = filtered.filter((m) => m.membershipPlan === planFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.phone?.includes(searchQuery)
      );
    }

    setFilteredMembers(filtered);
  }, [members, statusFilter, planFilter, searchQuery]);

  const handleToggleStatus = async (id, currentStatus) => {
    console.log("Toggle status clicked:", { id, currentStatus });
    const action = currentStatus ? "deactivate" : "activate";
    if (!confirm(`Are you sure you want to ${action} this membership?`)) {
      console.log("User cancelled action");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      console.log("Sending status update request...");
      const response = await axios.put(
        `${API_URL}/members/${id}/status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Status update response:", response.data);
      alert(`Membership ${action}d successfully!`);
      fetchMembers();
    } catch (error) {
      console.error("Error updating member status:", error);
      console.error("Error details:", error.response?.data);
      alert(
        error.response?.data?.message || "Failed to update membership status"
      );
    }
  };

  const handleDelete = async (id) => {
    console.log("Delete clicked:", id);
    if (
      !confirm(
        "Are you sure you want to delete this membership? This cannot be undone."
      )
    ) {
      console.log("User cancelled delete");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      console.log("Sending delete request...");
      const response = await axios.delete(`${API_URL}/members/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", response.data);
      alert("Membership deleted successfully!");
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      console.error("Error details:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete membership");
    }
  };

  const handleViewDetails = (member) => {
    console.log("View details clicked:", member);
    setSelectedMember(member);
    setShowDetailModal(true);
  };

  const columns = [
    {
      header: "Member ID",
      accessor: "membershipId",
    },
    {
      header: "Name",
      render: (row) => row.user?.name || "N/A",
    },
    {
      header: "Email",
      render: (row) => row.user?.email || "N/A",
    },
    {
      header: "Phone",
      render: (row) => row.user?.phone || "N/A",
    },
    {
      header: "Membership Type",
      render: (row) => (
        <span className="capitalize">{row.membershipType || "standard"}</span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Payment Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.paymentDetails?.status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {row.paymentDetails?.status || "pending"}
        </span>
      ),
    },
    {
      header: "Expiry Date",
      render: (row) =>
        row.membershipExpiryDate
          ? new Date(row.membershipExpiryDate).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row);
            }}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(row._id, row.isActive);
            }}
            className={`p-2 rounded ${
              row.isActive
                ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                : "hover:bg-green-50 dark:hover:bg-green-900/20"
            }`}
            title={row.isActive ? "Deactivate" : "Activate"}
          >
            {row.isActive ? (
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Membership Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage member accounts and subscriptions
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Membership Plan Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plan
            </label>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Clear Filters and Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => {
              setSearchQuery("");
              setPlanFilter("all");
              setStatusFilter("all");
            }}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear Filters
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredMembers.length} of {members.length} members
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <DataTable
          columns={columns}
          data={members}
          loading={loading}
          emptyMessage="No members found"
        />
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedMember && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedMember(null);
          }}
          title="Member Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Membership ID
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedMember.membershipId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedMember.user?.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedMember.user?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedMember.user?.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Membership Type
                </label>
                <p className="text-gray-900 dark:text-white capitalize">
                  {selectedMember.membershipType || "standard"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount Paid
                </label>
                <p className="text-gray-900 dark:text-white">
                  ₹{selectedMember.paymentDetails?.amount || 0}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Payment ID
                </label>
                <p className="text-gray-900 dark:text-white text-sm">
                  {selectedMember.paymentDetails?.paymentId || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedMember.membershipExpiryDate
                    ? new Date(
                        selectedMember.membershipExpiryDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              {selectedMember.address && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedMember.address}
                  </p>
                </div>
              )}
              {selectedMember.notes && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notes
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedMember.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MembershipManagement;
