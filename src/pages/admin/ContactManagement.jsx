import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import { Eye, Trash2, CheckCircle, Search, Filter } from "lucide-react";
import Modal from "../../components/ui/Modal";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data.contacts || []);
      setFilteredContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts
  useEffect(() => {
    let filtered = [...contacts];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((c) => {
        const contactDate = new Date(c.createdAt);
        return contactDate.toDateString() === filterDate.toDateString();
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone?.includes(searchQuery) ||
          c.subject?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, statusFilter, dateFilter, searchQuery]);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/contact/${id}/status`,
        { status: "read" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
    } catch (error) {
      console.error("Error marking contact as read:", error);
      alert("Failed to update contact status");
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this contact message? This cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Contact message deleted successfully!");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact message");
    }
  };

  const handleViewDetails = async (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);

    // Mark as read when viewing
    if (contact.status === "new") {
      await handleMarkAsRead(contact._id);
    }
  };

  const columns = [
    {
      header: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Subject", accessor: "subject" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "new"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : row.status === "read"
              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              : row.status === "responded"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {row.status || "new"}
        </span>
      ),
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
          {row.status === "new" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(row._id);
              }}
              className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
              title="Mark as Read"
            >
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </button>
          )}
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage contact form submissions
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
                placeholder="Search by name, email, phone, or subject..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
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
              <option value="new">New</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Clear Filters and Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setDateFilter("");
            }}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear Filters
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredContacts}
        loading={loading}
        emptyMessage="No contact messages found"
      />

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedContact(null);
          }}
          title="Contact Message Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedContact.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedContact.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedContact.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedContact.subject}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
              {selectedContact.response && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Response
                  </label>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {selectedContact.response}
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

export default ContactManagement;
