import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
} from "lucide-react";

const ImageLibrary = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/gallery/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100 },
      });
      setImages(response.data.items || []);
      setFilteredImages(response.data.items || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter images
  useEffect(() => {
    let filtered = [...images];

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((img) => img.category === categoryFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (img) =>
          img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [images, categoryFilter, searchQuery]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image to upload");
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("category", uploadData.category);

      await axios.post(`${API_URL}/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Image uploaded successfully!");
      setSelectedFile(null);
      setUploadData({ title: "", description: "", category: "" });
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, publicId) => {
    if (
      !confirm(
        "Are you sure you want to delete this image? This cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/gallery/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Image Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all uploaded images from Cloudinary
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Upload New Image
        </h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={uploadData.title}
                onChange={(e) =>
                  setUploadData({ ...uploadData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={uploadData.category}
                onChange={(e) =>
                  setUploadData({ ...uploadData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Category</option>
                <option value="events">Events</option>
                <option value="activities">Activities</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="community">Community</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={uploadData.description}
              onChange={(e) =>
                setUploadData({ ...uploadData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#ff5722] transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      {/* Image Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Image Gallery ({filteredImages.length})
          </h2>
        </div>

        {/* Filter Section */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="activities">Activities</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="community">Community</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* Clear Filters and Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Clear Filters
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredImages.length} of {images.length} images
            </p>
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No images found{" "}
              {searchQuery || categoryFilter !== "all"
                ? "matching your filters"
                : "in library"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image._id}
                className="group relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src={image.media?.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center text-white p-2">
                    <p className="text-sm font-medium mb-1 truncate">
                      {image.title}
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      {image.category}
                    </p>
                    <button
                      onClick={() =>
                        handleDelete(image._id, image.media?.public_id)
                      }
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLibrary;
