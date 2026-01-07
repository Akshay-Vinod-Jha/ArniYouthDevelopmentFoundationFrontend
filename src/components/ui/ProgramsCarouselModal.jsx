import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";

const ProgramsCarouselModal = ({ programs, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isOpen || !isAutoPlaying || programs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === programs.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isOpen, isAutoPlaying, programs.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handleManualNavigation("prev");
      } else if (e.key === "ArrowRight") {
        handleManualNavigation("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Pause auto-play when user interacts
  const handleManualNavigation = (direction) => {
    setIsAutoPlaying(false);
    if (direction === "next") {
      setCurrentIndex((prevIndex) =>
        prevIndex === programs.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? programs.length - 1 : prevIndex - 1
      );
    }
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!isOpen || programs.length === 0) return null;

  const currentProgram = programs[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[75vh] overflow-hidden animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col md:flex-row h-[75vh]">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-48 md:h-[75vh] bg-gradient-to-br from-primary to-secondary flex-shrink-0">
            {currentProgram.image?.url ? (
              <img
                src={currentProgram.image.url}
                alt={currentProgram.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Briefcase className="w-16 h-16 text-white opacity-30" />
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-primary dark:text-white rounded-full text-sm font-semibold shadow-lg capitalize">
                {currentProgram.category || "Program"}
              </span>
            </div>

            {/* Navigation Arrows - Mobile Bottom, Desktop Side */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2 flex md:flex-col gap-2">
              <button
                onClick={() => handleManualNavigation("prev")}
                className="p-3 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => handleManualNavigation("next")}
                className="p-3 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 overflow-y-auto p-6 md:p-8">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  New Program
                </span>
                {currentProgram.status && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      currentProgram.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : currentProgram.status === "upcoming"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {currentProgram.status}
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {currentProgram.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                {currentProgram.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 mb-6">
              {currentProgram.targetAudience && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 min-w-[80px]">
                    Target:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentProgram.targetAudience}
                  </span>
                </div>
              )}
              {currentProgram.location && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 min-w-[80px]">
                    Location:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentProgram.location}
                  </span>
                </div>
              )}
              {currentProgram.duration && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 min-w-[80px]">
                    Duration:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentProgram.duration}
                  </span>
                </div>
              )}
            </div>

            {/* Objectives */}
            {currentProgram.objectives &&
              currentProgram.objectives.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Key Objectives:
                  </h3>
                  <ul className="space-y-1.5">
                    {currentProgram.objectives
                      .slice(0, 4)
                      .map((objective, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="line-clamp-2">{objective}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

            {/* CTA Button */}
            <a
              href="/programs"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              View All Programs
            </a>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  } rounded-full`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-center mt-3 pb-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {programs.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsCarouselModal;
