import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Heart,
  Users,
  TrendingUp,
  Award,
  Droplet,
  GraduationCap,
  Building,
  Scale,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import ProgramsCarouselModal from "../components/ui/ProgramsCarouselModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Custom hook for counter animation
const useCounterAnimation = (targetValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = Date.now();
            const endValue = parseInt(targetValue.replace(/[^0-9]/g, ""));

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutQuad = progress * (2 - progress);
              const currentCount = Math.floor(easeOutQuad * endValue);

              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [targetValue, duration, hasAnimated]);

  return { count, elementRef };
};

const Home = () => {
  const [showProgramsModal, setShowProgramsModal] = useState(false);
  const [newPrograms, setNewPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  // Fetch new programs from database
  useEffect(() => {
    const fetchNewPrograms = async () => {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        const programs = response.data.programs || [];

        // Filter active programs and sort by creation date (newest first)
        const activePrograms = programs
          .filter((p) => p.isActive)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNewPrograms(activePrograms);

        // Show modal if there are programs - shows every time user visits
        if (activePrograms.length > 0) {
          // Small delay to let the page load first
          setTimeout(() => {
            setShowProgramsModal(true);
          }, 800);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchNewPrograms();
  }, []);

  const handleCloseModal = () => {
    setShowProgramsModal(false);
  };

  const stats = [
    { label: "Lives Impacted", value: "1,000+", icon: Users, suffix: "+" },
    { label: "Active Volunteers", value: "50+", icon: Heart, suffix: "+" },
    { label: "Programs Running", value: "8", icon: TrendingUp, suffix: "" },
    { label: "Months of Service", value: "3", icon: Award, suffix: "" },
  ];

  const programs = [
    {
      icon: Droplet,
      title: "Healthcare Initiatives",
      description:
        "Blood donation camps, medical equipment bank, health checkups and awareness programs.",
      color: "bg-red-100 text-red-600",
      image: "/ProgramHealth.jpg",
    },
    {
      icon: GraduationCap,
      title: "Education Programs",
      description:
        "Scholarships, career guidance, and connecting students with opportunities.",
      color: "bg-blue-100 text-blue-600",
      image: "/ProgramEducation.png",
    },
    {
      icon: Building,
      title: "Rural Development",
      description:
        "Infrastructure improvements, environmental initiatives, and community development.",
      color: "bg-green-100 text-green-600",
      image: "/ProgramRural.jpg",
    },
    {
      icon: Scale,
      title: "Social Justice",
      description:
        "Legal awareness, guidance for victims, and empowering disadvantaged communities.",
      color: "bg-purple-100 text-purple-600",
      image: "/ProgramSocial.jpg",
    },
  ];

  return (
    <div>
      {/* Programs Carousel Modal */}
      <ProgramsCarouselModal
        programs={newPrograms}
        isOpen={showProgramsModal}
        onClose={handleCloseModal}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-16 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Building Better Communities Together
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Empowering rural communities through healthcare, education, and
                sustainable development in Arni Taluka, Yavatmal District,
                Maharashtra.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/donate"
                  className="btn bg-white text-primary hover:bg-gray-100"
                >
                  Donate Now
                  <Heart className="w-5 h-5" fill="currentColor" />
                </Link>
                <Link
                  to="/get-involved"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  Get Involved
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div
              className="hidden md:flex justify-center items-center animate-fade-in h-full max-h-96"
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src="/HomeUpper1RemoveBG.png"
                alt="Community Support"
                className="w-auto h-full max-h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {stats.map((stat, index) => {
              const StatCounter = () => {
                const { count, elementRef } = useCounterAnimation(
                  stat.value,
                  2000
                );

                return (
                  <div
                    ref={elementRef}
                    className="text-center animate-fade-in flex flex-col items-center justify-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {count.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                );
              };

              return <StatCounter key={index} />;
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section
        className="py-20 dark:bg-gray-900 animate-fade-in"
        ref={useIntersectionObserver()}
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" ref={useIntersectionObserver()}>
              <h2 className="section-title">Who We Are</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Arni Youth Development Foundation (AYDF) is a dedicated
                organization working towards the holistic development of rural
                communities in Arni and Arni Taluka, Yavatmal District,
                Maharashtra. Founded with a vision of "Matrubhumi" (motherland),
                we focus on healthcare, education, rural development, and social
                justice.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to create sustainable change by empowering youth,
                supporting healthcare access, promoting education, and ensuring
                social justice for all community members.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.2s" }}
              ref={useIntersectionObserver()}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/WhoWeAre.jpg"
                  alt="Who We Are"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        className="py-20 bg-gray-50 dark:bg-gray-800 animate-fade-in"
        ref={useIntersectionObserver()}
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Programs</h2>
            <p className="section-subtitle">
              Making a difference through focused initiatives in key areas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                {/* Image on top */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-300"
                    style={{ objectPosition: "top" }}
                  />
                </div>

                {/* Content below */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {program.description}
                  </p>
                  <Link
                    to="/programs"
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/JoinUs.jpg)",
            filter: "blur(3px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/65 to-secondary/75" />

        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Your support can transform lives. Whether through donations,
            volunteering, or becoming a member, every contribution matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/donate"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Donate Now
            </Link>
            <Link
              to="/membership"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Become a Member
            </Link>
            <Link
              to="/volunteer"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
