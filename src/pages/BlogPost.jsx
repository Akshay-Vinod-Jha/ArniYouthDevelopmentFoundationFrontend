import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Eye,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the individual blog post
      const response = await axios.get(`${API_URL}/blog/${slug}`);
      setBlog(response.data.blog);

      // Fetch related blogs (same category, exclude current)
      if (response.data.blog.category) {
        const relatedResponse = await axios.get(
          `${API_URL}/blog?category=${response.data.blog.category}&limit=3`
        );
        const filtered = relatedResponse.data.blogs.filter(
          (b) => b.slug !== slug
        );
        setRelatedBlogs(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError(error.response?.data?.message || "Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const shareUrl = window.location.href;
  const shareTitle = blog?.title || "";

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
        return;
      default:
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {error || "Blog post not found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>

            <div className="mb-6">
              <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author?.name || "AYDF Team"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage?.url && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <img
                src={blog.featuredImage.url}
                alt={blog.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 italic border-l-4 border-primary pl-6">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Blog Content */}
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary prose-strong:text-gray-900 dark:prose-strong:text-white"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.replace(/\n/g, "<br />"),
                    }}
                  />

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-gray-400" />
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1"
              >
                {/* Share Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Share this post
                  </h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex items-center gap-3 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center gap-3 w-full bg-sky-500 text-white px-4 py-3 rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center gap-3 w-full bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="flex items-center gap-3 w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Link2 className="w-5 h-5" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </motion.aside>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      to={`/blog/${relatedBlog.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    >
                      {relatedBlog.featuredImage?.url && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={relatedBlog.featuredImage.url}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="text-xs text-primary font-semibold">
                          {relatedBlog.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
