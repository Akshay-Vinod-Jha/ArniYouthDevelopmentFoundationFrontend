import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/blog/admin/all`);
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.published
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Views",
      accessor: "views",
      render: (row) => row.views || 0,
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded" title="View">
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded" title="Edit">
            <Edit className="w-4 h-4 text-green-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded" title="Delete">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage blog posts</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-5 h-5" />
          New Blog Post
        </button>
      </div>

      <DataTable
        columns={columns}
        data={blogs}
        loading={loading}
        emptyMessage="No blogs found"
      />
    </div>
  );
};

export default BlogManagement;
