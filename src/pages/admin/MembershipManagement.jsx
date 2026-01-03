import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import Modal from "../../components/ui/Modal";

const MembershipManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    if (!confirm(`Are you sure you want to ${action} this membership?`)) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/members/${id}/status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Membership ${action}d successfully!`);
      fetchMembers();
    } catch (error) {
      console.error("Error updating member status:", error);
      alert("Failed to update membership status");
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this membership? This cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/members/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Membership deleted successfully!");
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete membership");
    }
  };

  const handleViewDetails = (member) => {
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
            onClick={() => handleViewDetails(row)}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => handleToggleStatus(row._id, row.isActive)}
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
            Membership Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage member accounts and subscriptions
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={members}
        loading={loading}
        emptyMessage="No members found"
      />

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
