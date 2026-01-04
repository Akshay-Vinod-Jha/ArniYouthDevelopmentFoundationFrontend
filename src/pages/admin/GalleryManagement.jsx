import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import FormModal from "../../components/admin/FormModal";
import Modal from "../../components/ui/Modal";
import { Edit, Trash2, Plus, Upload, X, Search, Filter } from "lucide-react";

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    media: null,
    featured: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data.items || []);
      setFilteredItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      alert("Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  // Filter gallery items
  useEffect(() => {
    let filtered = [...items];

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((i) => i.category === categoryFilter);
    }

    // Featured filter
    if (featuredFilter !== "all") {
      filtered = filtered.filter(
        (i) => i.featured === (featuredFilter === "featured")
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (i) =>
          i.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, categoryFilter, featuredFilter, searchQuery]);

  const handleOpenModal = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      media: null,
      featured: false,
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      media: null,
      featured: false,
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, media: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("featured", formData.featured);

      if (formData.media) {
        formDataToSend.append("media", formData.media);
      }

      await axios.post(`${API_URL}/gallery`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Gallery item uploaded successfully!");
      setShowSuccessModal(true);
      handleCloseModal();
      fetchItems();
    } catch (error) {
      console.error("Error uploading gallery item:", error);
      alert(error.response?.data?.message || "Failed to upload image");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/gallery/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Gallery item deleted successfully!");
      setShowSuccessModal(true);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const columns = [
    {
      header: "Image",
      render: (row) => (
        <img
          src={row.media?.url}
          alt={row.title}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    {
      header: "Featured",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.featured
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          {row.featured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
            Gallery Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage gallery images
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Upload Image
        </button>
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
                placeholder="Search by title or description..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="events">Events</option>
              <option value="programs">Programs</option>
              <option value="success-stories">Success Stories</option>
              <option value="team">Team</option>
              <option value="infrastructure">Infrastructure</option>
            </select>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured
            </label>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </div>

        {/* Clear Filters and Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setFeaturedFilter("all");
            }}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear Filters
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        loading={loading}
        emptyMessage="No gallery items found"
      />

      <FormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Upload Gallery Image"
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Image title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Image description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Rural Development">Rural Development</option>
              <option value="Events">Events</option>
              <option value="Community">Community</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image *
            </label>
            <div className="space-y-2">
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, media: null }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition">
                <Upload className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {imagePreview ? "Change Image" : "Upload Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!imagePreview}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured Image
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Uploading..." : "Upload Image"}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        message={successMessage}
      />
    </div>
  );
};

export default GalleryManagement;
