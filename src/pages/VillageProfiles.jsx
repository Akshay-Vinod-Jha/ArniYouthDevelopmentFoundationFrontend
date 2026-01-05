import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  MessageSquare,
  Filter,
  X,
  Loader,
} from "lucide-react";

const VillageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    village: "",
    currentCity: "",
    occupation: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    villages: [],
    cities: [],
    occupations: [],
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [searchTerm, filters]);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/village-profiles/filters/options`
      );
      setFilterOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/village-profiles`, {
        params: {
          search: searchTerm,
          ...filters,
          limit: 50,
        },
      });
      setProfiles(response.data.data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      village: "",
      currentCity: "",
      occupation: "",
    });
    setSearchTerm("");
  };

  const hasActiveFilters =
    searchTerm || filters.village || filters.currentCity || filters.occupation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-yellow-500 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Village Community Directory
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90">
              Discover and connect with members of our community
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 -mt-6 sm:-mt-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, village, city, occupation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-lg transition-all ${
                  showFilters || hasActiveFilters
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    !
                  </span>
                )}
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Village Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Village
                    </label>
                    <select
                      value={filters.village}
                      onChange={(e) =>
                        setFilters({ ...filters, village: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Villages</option>
                      {filterOptions.villages.map((village) => (
                        <option key={village} value={village}>
                          {village}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Current City Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Current City
                    </label>
                    <select
                      value={filters.currentCity}
                      onChange={(e) =>
                        setFilters({ ...filters, currentCity: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Cities</option>
                      {filterOptions.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Occupation Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      Occupation
                    </label>
                    <select
                      value={filters.occupation}
                      onChange={(e) =>
                        setFilters({ ...filters, occupation: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Occupations</option>
                      {filterOptions.occupations.map((occupation) => (
                        <option key={occupation} value={occupation}>
                          {occupation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading profiles...
            </p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Profiles Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {hasActiveFilters
                ? "Try adjusting your filters or search terms"
                : "No community members available at the moment"}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-primary">
                  {profiles.length}
                </span>{" "}
                profile
                {profiles.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  {/* Photo Section */}
                  <div className="relative h-72 bg-gradient-to-br from-primary/20 to-yellow-500/20 overflow-hidden">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-20 h-20 text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Name and Age Style Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold drop-shadow-lg mb-1">
                        {profile.name}
                      </h3>
                      <p className="text-white/90 text-sm drop-shadow-md flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {profile.occupation}
                      </p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-5 space-y-3">
                    {/* Bio */}
                    {profile.bio && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {profile.bio}
                      </p>
                    )}

                    {/* Location Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Village
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {profile.village}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Current City
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {profile.currentCity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    {(profile.contactDetails?.phone ||
                      profile.contactDetails?.email ||
                      profile.contactDetails?.whatsapp) && (
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          Contact
                        </p>
                        <div className="space-y-1.5">
                          {profile.contactDetails.phone && (
                            <a
                              href={`tel:${profile.contactDetails.phone}`}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                            >
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="truncate">
                                {profile.contactDetails.phone}
                              </span>
                            </a>
                          )}
                          {profile.contactDetails.email && (
                            <a
                              href={`mailto:${profile.contactDetails.email}`}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                            >
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="truncate">
                                {profile.contactDetails.email}
                              </span>
                            </a>
                          )}
                          {profile.contactDetails.whatsapp && (
                            <a
                              href={`https://wa.me/${profile.contactDetails.whatsapp.replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4 text-gray-400" />
                              <span className="truncate">WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VillageProfiles;
