import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import { Edit, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/volunteers`);
      setVolunteers(response.data.volunteers || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "approved"
              ? "bg-green-100 text-green-800"
              : row.status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
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
          <button className="p-2 hover:bg-green-50 rounded" title="Approve">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded" title="Reject">
            <XCircle className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Volunteer Management
          </h1>
          <p className="text-gray-600 mt-1">
            Review and manage volunteer applications
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={volunteers}
        loading={loading}
        emptyMessage="No volunteers found"
      />
    </div>
  );
};

export default VolunteerManagement;
