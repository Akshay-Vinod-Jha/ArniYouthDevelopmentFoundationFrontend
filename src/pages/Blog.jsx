import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
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

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Events",
    "Success Stories",
    "Community",
    "Announcements",
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

  const blogPosts = [
    {
      id: 1,
      title: "Transforming Rural Healthcare: A Year of Impact",
      excerpt:
        "Discover how our mobile health clinics have reached over 10,000 patients in remote villages, providing essential medical care and preventive health education.",
      author: "Dr. Priya Sharma",
      date: "November 28, 2024",
      category: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Education for All: Breaking Barriers in Rural India",
      excerpt:
        "Learn about our scholarship program that has enabled 500+ underprivileged children to pursue their dreams through quality education and mentorship.",
      author: "Rajesh Kumar",
      date: "November 25, 2024",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      readTime: "4 min read",
      featured: true,
    },
    {
      id: 3,
      title: "Community Workshop: Digital Literacy Program Success",
      excerpt:
        "Our 3-month digital literacy initiative empowered 200 women in rural areas with essential computer skills, opening new opportunities for economic independence.",
      author: "Anjali Verma",
      date: "November 20, 2024",
      category: "Events",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "From Farmer to Entrepreneur: Ravi's Inspiring Journey",
      excerpt:
        "Meet Ravi, whose life changed when AYDF's skill development program helped him start his own organic farming business, now employing 15 local youth.",
      author: "Meera Patel",
      date: "November 15, 2024",
      category: "Success Stories",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Building Sustainable Communities Through Clean Water",
      excerpt:
        "How our water purification project provided clean drinking water to 12 villages, dramatically reducing waterborne diseases and improving quality of life.",
      author: "Dr. Amit Singh",
      date: "November 10, 2024",
      category: "Community",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      readTime: "5 min read",
      featured: false,
    },
    {
      id: 6,
      title: "Annual Fundraiser 2024: Record-Breaking Support",
      excerpt:
        "Thank you to our incredible donors! This year's fundraiser raised ₹2.5 crore, enabling us to expand our programs and reach 50,000 more beneficiaries.",
      author: "AYDF Team",
      date: "November 5, 2024",
      category: "Announcements",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      readTime: "3 min read",
      featured: false,
    },
    {
      id: 7,
      title: "Women Empowerment: Vocational Training Success",
      excerpt:
        "Our tailoring and handicraft training program graduated 150 women this year, with 80% now earning sustainable income from their newfound skills.",
      author: "Sunita Devi",
      date: "October 30, 2024",
      category: "Success Stories",
      image:
        "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 8,
      title: "Mental Health Awareness: Breaking the Stigma",
      excerpt:
        "Our mental health counseling initiative in schools has helped 300+ students cope with anxiety and stress through professional support and peer groups.",
      author: "Dr. Kavita Reddy",
      date: "October 25, 2024",
      category: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800",
      readTime: "5 min read",
      featured: false,
    },
    {
      id: 9,
      title: "STEM Education: Inspiring Young Scientists",
      excerpt:
        "Our science lab initiative brought hands-on learning to 20 rural schools, sparking curiosity and passion for STEM subjects among 2,000+ students.",
      author: "Prof. Arun Mehta",
      date: "October 20, 2024",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
      readTime: "4 min read",
      featured: false,
    },
    {
      id: 10,
      title: "Disaster Relief: Supporting Flood-Affected Families",
      excerpt:
        "AYDF's rapid response team provided emergency relief supplies and temporary shelter to 500 families affected by recent floods in Bihar.",
      author: "Relief Team",
      date: "October 15, 2024",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
      readTime: "4 min read",
      featured: false,
    },
    {
      id: 11,
      title: "Sports for Development: Youth Football League Launch",
      excerpt:
        "Our new football league engages 500 youth from 15 villages, promoting fitness, teamwork, and discipline while keeping them away from negative influences.",
      author: "Coach Ramesh",
      date: "October 10, 2024",
      category: "Events",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      readTime: "5 min read",
      featured: false,
    },
    {
      id: 12,
      title: "Nutrition Program: Fighting Malnutrition in Children",
      excerpt:
        "Our mid-day meal enhancement program has improved nutritional status of 3,000 school children with balanced meals and nutrition education.",
      author: "Nutritionist Team",
      date: "October 5, 2024",
      category: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      readTime: "6 min read",
      featured: false,
    },
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
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
                  onClick={() => {
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
          <div
            className="container mx-auto px-4 reveal"
            ref={useIntersectionObserver()}
          >
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
                    to={`/blog/${featuredPost.id}`}
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
        <div
          className="container mx-auto px-4 reveal"
          ref={useIntersectionObserver()}
        >
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${
                      index % 2 === 0 ? "reveal-left" : "reveal-right"
                    } reveal-delay-${
                      index * 100
                    } bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group`}
                    ref={useIntersectionObserver()}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                          to={`/blog/${post.id}`}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
