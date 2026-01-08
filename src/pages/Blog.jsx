import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  User,
  Tag,
  Search,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Development",
    "Justice",
    "Events",
    "Success Story",
    "General",
  ];

  const tags = [
    "All",
    "Impact",
    "Youth",
    "Rural",
    "Women",
    "Technology",
    "Training",
    "Awareness",
  ];

  // Fetch blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/published`);
        setDynamicBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Use only database blogs (no static blogs)
  const allBlogs = dynamicBlogs.map((blog) => ({
    id: blog._id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    author: blog.author?.name || "AYDF Team",
    date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    ),
    category: blog.category
      ? blog.category === "success-story"
        ? "Success Story"
        : blog.category.charAt(0).toUpperCase() + blog.category.slice(1)
      : "General",
    image:
      blog.featuredImage?.url ||
      blog.featuredImage ||
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    readTime: `${Math.ceil(
      (blog.content?.split(" ").length || 0) / 200
    )} min read`,
    featured: false,
    tags: blog.tags || [],
  }));

  // Filter posts based on search and category
  const filteredPosts = allBlogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === "Success Story" &&
        post.category.toLowerCase() === "success-story") ||
      (selectedCategory === "Success Stories" &&
        post.category.toLowerCase() === "success-story");
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Use the first blog from database as featured article
  const featuredPost = allBlogs.length > 0 ? allBlogs[0] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/AboutStory.png)",
            filter: "blur(3px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/65 to-secondary/75" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stories of Change
            </h1>
            <p className="text-xl text-white/90">
              Discover inspiring stories, updates, and insights from our
              community development work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <section className="bg-white dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Featured Article
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl border border-primary/20 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {featuredPost.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Author
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug || featuredPost.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-colors duration-300 w-fit"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Loading blogs...
              </p>
            </div>
          ) : currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.author}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${post.slug || post.id}`}
                          className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-semibold text-sm flex items-center gap-1 group/link"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentPage(index + 1);
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                No blogs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {selectedCategory !== "All"
                  ? `No blogs available for "${selectedCategory}" category`
                  : searchQuery
                  ? `No blogs match your search "${searchQuery}"`
                  : "No blogs available at the moment"}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Try selecting a different category or adjusting your search
              </p>
              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
