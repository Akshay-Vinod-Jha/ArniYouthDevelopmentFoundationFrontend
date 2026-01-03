import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import Modal from "../../components/ui/Modal";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/volunteers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolunteers(response.data.volunteers || []);
      setFilteredVolunteers(response.data.volunteers || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter volunteers
  useEffect(() => {
    let filtered = [...volunteers];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter((v) => {
        const appDate = new Date(v.appliedAt || v.createdAt);
        const filterDate = new Date(dateFilter);
        return appDate >= filterDate;
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.phone?.includes(searchQuery)
      );
    }

    setFilteredVolunteers(filtered);
  }, [volunteers, statusFilter, dateFilter, searchQuery]);

  const handleApprove = async (id) => {
    if (
      !confirm("Are you sure you want to approve this volunteer application?")
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/volunteers/${id}/approve`,
        { notes: "Approved by admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Volunteer application approved successfully!");
      fetchVolunteers();
    } catch (error) {
      console.error("Error approving volunteer:", error);
      alert("Failed to approve volunteer application");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this volunteer application?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/volunteers/${id}/reject`,
        { notes: "Rejected by admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Volunteer application rejected");
      fetchVolunteers();
    } catch (error) {
      console.error("Error rejecting volunteer:", error);
      alert("Failed to reject volunteer application");
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this volunteer application? This cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/volunteers/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Volunteer application deleted successfully!");
      fetchVolunteers();
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      alert("Failed to delete volunteer application");
    }
  };

  const handleViewDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowDetailModal(true);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Age",
      accessor: "age",
    },
    {
      header: "Applied On",
      render: (row) =>
        new Date(row.appliedAt || row.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "approved"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : row.status === "rejected"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          {row.status === "pending" && (
            <>
              <button
                onClick={() => handleApprove(row._id)}
                className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </button>
              <button
                onClick={() => handleReject(row._id)}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                title="Reject"
              >
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </>
          )}
          <button
            onClick={() => handleDelete(row._id)}
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Volunteer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and manage volunteer applications
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters & Search
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Applied After
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {filteredVolunteers.length} of {volunteers.length}{" "}
            volunteers
          </span>
          {(searchQuery || statusFilter !== "all" || dateFilter) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateFilter("");
              }}
              className="text-[#FF6B35] hover:text-[#ff5722] font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredVolunteers}
        loading={loading}
        emptyMessage="No volunteers found"
      />

      {/* Detail Modal */}
      {showDetailModal && selectedVolunteer && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedVolunteer(null);
          }}
          title="Volunteer Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedVolunteer.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedVolunteer.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedVolunteer.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Age
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedVolunteer.age}
                </p>
              </div>
              {selectedVolunteer.address && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedVolunteer.address}
                  </p>
                </div>
              )}
              {selectedVolunteer.skills &&
                selectedVolunteer.skills.length > 0 && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Skills
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedVolunteer.skills.join(", ")}
                    </p>
                  </div>
                )}
              {selectedVolunteer.availability && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Availability
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedVolunteer.availability}
                  </p>
                </div>
              )}
              {selectedVolunteer.reason && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Why Volunteer?
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedVolunteer.reason}
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

export default VolunteerManagement;
