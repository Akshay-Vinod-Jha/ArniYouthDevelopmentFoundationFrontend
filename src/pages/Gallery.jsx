import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Rural Development",
    "Events",
    "Community",
  ];

  const images = [
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

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.program === selectedCategory);

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
            <ImageIcon className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl text-white/90">
              Capturing moments of impact, transformation, and hope
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div
          className="container mx-auto px-4 reveal"
          ref={useIntersectionObserver()}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${
                  index % 3 === 0
                    ? "reveal-scale"
                    : index % 3 === 1
                    ? "reveal-left"
                    : "reveal-right"
                } reveal-delay-${Math.min(
                  index * 50,
                  500
                )} break-inside-avoid group cursor-pointer`}
                ref={useIntersectionObserver()}
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">
                        {image.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="bg-primary px-2 py-1 rounded text-xs">
                          {image.program}
                        </span>
                        <span className="text-gray-200">{image.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

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
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl max-h-[90vh] relative"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
