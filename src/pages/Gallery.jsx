import { useState, useEffect } from "react";
import axios from "axios";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(12); // Initially load 12 images
  const [dynamicImages, setDynamicImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic images from database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery`);
        setDynamicImages(response.data.items || []);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  // Import all images from aydf_gallery folder
  const importImages = () => {
    const imageFiles = [
      "IMG-20251224-WA0003.jpg",
      "IMG-20251224-WA0004.jpg",
      "IMG-20251224-WA0005(1).jpg",
      "IMG-20251224-WA0005.jpg",
      "IMG-20251224-WA0006.jpg",
      "IMG-20251224-WA0007.jpg",
      "IMG-20251224-WA0008.jpg",
      "IMG-20251224-WA0009.jpg",
      "IMG-20251224-WA0010.jpg",
      "IMG-20251224-WA0011.jpg",
      "SAVE_20260101_200110.jpg",
      "SAVE_20260101_200115.jpg",
      "SAVE_20260101_200122.jpg",
      "SAVE_20260101_200127.jpg",
      "SAVE_20260101_200133.jpg",
      "SAVE_20260101_200138.jpg",
      "SAVE_20260101_200144.jpg",
      "SAVE_20260101_200149.jpg",
      "SAVE_20260101_200154.jpg",
      "SAVE_20260101_200159.jpg",
      "SAVE_20260101_200204.jpg",
      "SAVE_20260101_200210.jpg",
      "SAVE_20260101_200214.jpg",
      "SAVE_20260101_200218.jpg",
      "SAVE_20260101_200224.jpg",
      "SAVE_20260101_200229.jpg",
      "SAVE_20260101_200234.jpg",
      "SAVE_20260101_200239.jpg",
      "SAVE_20260101_200243.jpg",
      "SAVE_20260101_200249.jpg",
      "SAVE_20260101_200257.jpg",
      "SAVE_20260101_200302.jpg",
      "SAVE_20260101_200307.jpg",
      "SAVE_20260101_200312.jpg",
      "SAVE_20260101_200317.jpg",
      "SAVE_20260101_200322.jpg",
      "SAVE_20260101_200327.jpg",
      "SAVE_20260101_200333.jpg",
      "SAVE_20260101_200339.jpg",
      "SAVE_20260101_200344.jpg",
      "SAVE_20260101_200350.jpg",
      "SAVE_20260101_200355.jpg",
      "SAVE_20260101_200359.jpg",
      "SAVE_20260101_200404.jpg",
      "SAVE_20260101_200409.jpg",
      "SAVE_20260101_200414.jpg",
      "SAVE_20260101_200419.jpg",
      "SAVE_20260101_200423.jpg",
      "SAVE_20260101_200428.jpg",
      "SAVE_20260101_200433.jpg",
      "SAVE_20260101_200437.jpg",
      "SAVE_20260101_200442.jpg",
      "SAVE_20260101_200447.jpg",
      "SAVE_20260101_200452.jpg",
      "SAVE_20260101_200457.jpg",
      "SAVE_20260101_200503.jpg",
      "SAVE_20260101_200508.jpg",
      "SAVE_20260101_200513.jpg",
      "SAVE_20260101_200517.jpg",
      "SAVE_20260101_200523.jpg",
    ];

    // Map images to gallery items with rotating categories
    const programs = [
      "Healthcare",
      "Education",
      "Rural Development",
      "Events",
      "Community",
    ];

    // Define different aspect ratios for varied image sizes (Pinterest-style)
    const aspectRatios = [
      "aspect-[3/4]", // Portrait
      "aspect-[4/5]", // Tall portrait
      "aspect-[1/1]", // Square
      "aspect-[16/9]", // Landscape
      "aspect-[4/3]", // Standard landscape
      "aspect-[2/3]", // Tall portrait
      "aspect-[3/2]", // Wide landscape
      "aspect-[9/16]", // Very tall portrait
    ];

    return imageFiles.map((filename, index) => ({
      id: index + 1,
      url: `/aydf_gallery/${filename}`,
      title: `AYDF Activity ${index + 1}`,
      program: programs[index % programs.length],
      date: "2024-2025",
      aspectRatio: aspectRatios[index % aspectRatios.length], // Assign varying aspect ratios
    }));
  };

  const staticImages = importImages();

  // Define different aspect ratios for dynamic images
  const aspectRatios = [
    "aspect-[3/4]", // Portrait
    "aspect-[4/5]", // Tall portrait
    "aspect-[1/1]", // Square
    "aspect-[16/9]", // Landscape
    "aspect-[4/3]", // Standard landscape
    "aspect-[2/3]", // Tall portrait
    "aspect-[3/2]", // Wide landscape
    "aspect-[9/16]", // Very tall portrait
  ];

  // Combine dynamic images with static images (dynamic first)
  const images = [
    ...dynamicImages.map((item, index) => ({
      id: `dynamic-${item._id}`,
      url: item.media?.url || item.media,
      title: item.title || "Gallery Image",
      program: item.category
        ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
        : "General",
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      aspectRatio: aspectRatios[index % aspectRatios.length],
    })),
    ...staticImages,
  ];

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Development",
    "Justice",
    "Events",
    "General",
    "Community",
    "Rural Development",
  ];

  const images_old = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      title: "Mobile Health Clinic",
      program: "Healthcare",
      date: "November 2024",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      title: "Scholarship Distribution",
      program: "Education",
      date: "October 2024",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      title: "School Children Program",
      program: "Education",
      date: "October 2024",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800",
      title: "Women Empowerment Workshop",
      program: "Community",
      date: "September 2024",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      title: "Organic Farming Training",
      program: "Rural Development",
      date: "September 2024",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      title: "Digital Literacy Class",
      program: "Events",
      date: "August 2024",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      title: "Clean Water Project",
      program: "Rural Development",
      date: "August 2024",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800",
      title: "Mental Health Counseling",
      program: "Healthcare",
      date: "July 2024",
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
      title: "Science Lab Inauguration",
      program: "Education",
      date: "July 2024",
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
      title: "Flood Relief Distribution",
      program: "Community",
      date: "June 2024",
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      title: "Youth Football Tournament",
      program: "Events",
      date: "June 2024",
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      title: "Annual Fundraiser Event",
      program: "Events",
      date: "May 2024",
    },
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800",
      title: "Community Health Camp",
      program: "Healthcare",
      date: "May 2024",
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
      title: "Library Opening Ceremony",
      program: "Education",
      date: "April 2024",
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
      title: "Skill Development Workshop",
      program: "Community",
      date: "April 2024",
    },
    {
      id: 16,
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
      title: "Village Medical Outreach",
      program: "Healthcare",
      date: "March 2024",
    },
    {
      id: 17,
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
      title: "Agriculture Training Session",
      program: "Rural Development",
      date: "March 2024",
    },
    {
      id: 18,
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      title: "Teacher Training Program",
      program: "Education",
      date: "February 2024",
    },
    {
      id: 19,
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
      title: "Cultural Festival",
      program: "Events",
      date: "February 2024",
    },
    {
      id: 20,
      url: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800",
      title: "Women's Self Help Group",
      program: "Community",
      date: "January 2024",
    },
    {
      id: 21,
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      title: "Computer Training Center",
      program: "Education",
      date: "January 2024",
    },
    {
      id: 22,
      url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
      title: "Water Conservation Project",
      program: "Rural Development",
      date: "December 2023",
    },
    {
      id: 23,
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
      title: "Medical Equipment Donation",
      program: "Healthcare",
      date: "December 2023",
    },
    {
      id: 24,
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      title: "Volunteer Recognition Ceremony",
      program: "Events",
      date: "November 2023",
    },
  ];

  const filteredImages = images.filter((img) => {
    // Category filter (case-insensitive)
    const matchesCategory =
      selectedCategory === "All" ||
      img.program.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === "Rural Development" &&
        img.program.toLowerCase() === "development");

    // Search filter
    const matchesSearch =
      !searchQuery ||
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.program.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Handle image loading
  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageId]: true,
    }));
  };

  // Load more images when scrolling
  const loadMoreImages = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredImages.length));
  };

  // Reset when filters change
  useEffect(() => {
    setLoadedImages({});
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  // Get only visible images
  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/WhoWeAre.jpg)",
            filter: "blur(3px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/65 to-secondary/75" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <ImageIcon className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl text-white/90">
              Capturing moments of impact, transformation, and hope
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery images..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredImages.length} of {images.length} images
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="ml-4 text-primary hover:text-primary/80 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Pinterest Masonry Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-gray-100 dark:bg-gray-800">
                  {/* Container with aspect ratio */}
                  <div className={`relative w-full ${image.aspectRatio}`}>
                    {/* Loading Placeholder */}
                    {!loadedImages[image.id] && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                    )}

                    {/* Actual Image */}
                    <img
                      src={image.url}
                      alt={image.title}
                      className="absolute inset-0 w-full h-full object-cover scale-110"
                      loading="lazy"
                      onLoad={() => handleImageLoad(image.id)}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold text-base md:text-lg mb-1 line-clamp-2">
                          {image.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs md:text-sm flex-wrap gap-2">
                          <span className="bg-primary px-2 py-1 rounded text-xs">
                            {image.program}
                          </span>
                          <span className="text-gray-200">{image.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Trigger */}
          {visibleCount < filteredImages.length && (
            <div
              ref={useIntersectionObserver(loadMoreImages)}
              className="text-center py-8"
            >
              <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading more images...</span>
              </div>
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No images found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl max-h-[90vh] relative"
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="bg-primary px-3 py-1 rounded-full">
                  {selectedImage.program}
                </span>
                <span className="text-gray-300">{selectedImage.date}</span>
                <span className="text-gray-400">
                  {currentIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
