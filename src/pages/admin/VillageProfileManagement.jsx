import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/admin/DataTable";
import FormModal from "../../components/admin/FormModal";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const VillageProfileManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    village: "",
    currentCity: "",
    occupation: "",
    isActive: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    village: "",
    currentCity: "",
    occupation: "",
    bio: "",
    contactDetails: {
      phone: "",
      email: "",
      whatsapp: "",
    },
    isActive: true,
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchProfiles();
  }, [searchTerm, filters]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: searchTerm,
          ...filters,
        },
      };

      const response = await axios.get(
        `${API_URL}/village-profiles/admin/all`,
        config
      );
      setProfiles(response.data.data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("village", formData.village);
      submitData.append("currentCity", formData.currentCity);
      submitData.append("occupation", formData.occupation);
      submitData.append("bio", formData.bio);
      submitData.append(
        "contactDetails",
        JSON.stringify(formData.contactDetails)
      );
      submitData.append("isActive", formData.isActive);

      if (formData.photo instanceof File) {
        submitData.append("photo", formData.photo);
      }

      if (editingProfile) {
        await axios.put(
          `${API_URL}/village-profiles/${editingProfile._id}`,
          submitData,
          config
        );
      } else {
        await axios.post(`${API_URL}/village-profiles`, submitData, config);
      }

      fetchProfiles();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(error.response?.data?.message || "Error saving profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${API_URL}/village-profiles/${id}`, config);
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Error deleting profile");
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      photo: null,
      village: profile.village,
      currentCity: profile.currentCity,
      occupation: profile.occupation,
      bio: profile.bio || "",
      contactDetails: profile.contactDetails || {
        phone: "",
        email: "",
        whatsapp: "",
      },
      isActive: profile.isActive,
    });
    setPhotoPreview(profile.photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProfile(null);
    setFormData({
      name: "",
      photo: null,
      village: "",
      currentCity: "",
      occupation: "",
      bio: "",
      contactDetails: { phone: "", email: "", whatsapp: "" },
      isActive: true,
    });
    setPhotoPreview("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFilters = () => {
    setFilters({
      village: "",
      currentCity: "",
      occupation: "",
      isActive: "",
    });
    setSearchTerm("");
  };

  const columns = [
    {
      header: "Photo",
      render: (profile) => (
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <MapPin className="w-6 h-6" />
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Village",
      accessor: "village",
    },
    {
      header: "Current City",
      accessor: "currentCity",
    },
    {
      header: "Occupation",
      accessor: "occupation",
    },
    {
      header: "Contact",
      render: (profile) => (
        <div className="text-xs">
          {profile.contactDetails?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {profile.contactDetails.phone}
            </div>
          )}
          {profile.contactDetails?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {profile.contactDetails.email}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      render: (profile) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            profile.isActive
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}
        >
          {profile.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (profile) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(profile)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(profile._id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Village Profiles
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage community member profiles
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add Profile</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by name, village, city, occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Village
                </label>
                <input
                  type="text"
                  placeholder="Filter by village"
                  value={filters.village}
                  onChange={(e) =>
                    setFilters({ ...filters, village: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current City
                </label>
                <input
                  type="text"
                  placeholder="Filter by city"
                  value={filters.currentCity}
                  onChange={(e) =>
                    setFilters({ ...filters, currentCity: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  placeholder="Filter by occupation"
                  value={filters.occupation}
                  onChange={(e) =>
                    setFilters({ ...filters, occupation: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.isActive}
                  onChange={(e) =>
                    setFilters({ ...filters, isActive: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="mt-3 text-xs sm:text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={profiles}
        loading={loading}
        emptyMessage="No profiles found"
      />

      {/* Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProfile ? "Edit Profile" : "Add New Profile"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photo (Optional)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <MapPin className="w-10 h-10" />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Village and Current City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Village <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) =>
                  setFormData({ ...formData, village: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.currentCity}
                onChange={(e) =>
                  setFormData({ ...formData, currentCity: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Occupation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.occupation}
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio (Optional)
            </label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Brief description about the person..."
              maxLength="500"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Details
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactDetails.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: {
                        ...formData.contactDetails,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactDetails.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: {
                        ...formData.contactDetails,
                        email: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.contactDetails.whatsapp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: {
                        ...formData.contactDetails,
                        whatsapp: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Active Profile
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Saving..."
                : editingProfile
                ? "Update Profile"
                : "Add Profile"}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default VillageProfileManagement;
