import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Droplet,
  GraduationCap,
  Building,
  Scale,
  Heart,
  Users,
  TrendingUp,
  ArrowRight,
  Syringe,
  Building2,
  Stethoscope,
  Truck,
  Award,
  BookOpen,
  Recycle,
  Construction,
  Home,
  Gavel,
  Megaphone,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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

const Programs = () => {
  const [dynamicPrograms, setDynamicPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from database
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setDynamicPrograms(response.data.programs || []);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const programs = [
    {
      id: "healthcare",
      icon: Droplet,
      title: "Healthcare Initiatives",
      description:
        "Improving healthcare access and awareness in rural communities",
      color: "from-red-500 to-pink-500",
      initiatives: [
        {
          name: "Blood Donation Camps",
          description:
            "Regular blood donation camps in collaboration with district blood banks",
          icon: Droplet,
          image: "/ProgramsHealth1.jpg",
        },
        {
          name: "Medical Equipment Bank",
          description:
            "Establishing and expanding medical equipment bank for needy patients",
          icon: Building2,
          image: "/ProgramsHealth2.jpg",
        },
        {
          name: "Health Checkup & Awareness",
          description:
            "Conducting health checkups, cancer awareness camps, and specialist consultations",
          icon: Stethoscope,
          image: "/ProgramsHealth3.jpg",
        },
        {
          name: "Multi-City Patient Support",
          description:
            "Providing ambulance, accommodation, and guidance for multi-city medical needs",
          icon: Truck,
          image: "/ProgramsHealth4.jpg",
        },
      ],
      stats: [
        { label: "Blood Units Collected", value: "2,500+" },
        { label: "Patients Supported", value: "1,200+" },
        { label: "Health Camps Organized", value: "50+" },
      ],
    },
    {
      id: "education",
      icon: GraduationCap,
      title: "Education Initiatives",
      description: "Empowering students through education and guidance",
      color: "from-blue-500 to-indigo-500",
      initiatives: [
        {
          name: "Scholarships",
          description: "Offering scholarships to deserving rural students",
          icon: Award,
          image: "/ProgramsEdu1.jpg",
        },
        {
          name: "Career Guidance",
          description:
            "Subject-based seminars and career guidance sessions in schools",
          icon: Users,
          image: "/ProgramsEdu2.jpg",
        },
        {
          name: "School Awareness Sessions",
          description:
            "Building platforms to connect donors, corporates, and students",
          icon: BookOpen,
          image: "/ProgramsEdu3.jpg",
        },
      ],
      stats: [
        { label: "Scholarships Awarded", value: "300+" },
        { label: "Students Mentored", value: "2,000+" },
        { label: "Schools Reached", value: "25+" },
      ],
    },
    {
      id: "rural-development",
      icon: Building,
      title: "City & Rural Development",
      description: "Sustainable community development initiatives",
      color: "from-green-500 to-emerald-500",
      initiatives: [
        {
          name: "Environment & Cleanliness",
          description:
            "Addressing environmental issues like dumping grounds and cleanliness",
          icon: Recycle,
          image: "/ProgramsCity1.jpg",
        },
        {
          name: "Infrastructure Support",
          description: "Working on rural/urban infrastructure improvements",
          icon: Construction,
          image: "/ProgramsCity2.jpg",
        },
        {
          name: "Community Development",
          description:
            "Taking initiatives on local issues affecting community wellbeing",
          icon: Home,
          image: "/ProgramsCity3.jpg",
        },
      ],
      stats: [
        { label: "Clean-up Drives", value: "40+" },
        { label: "Infrastructure Projects", value: "15+" },
        { label: "Volunteers Engaged", value: "800+" },
      ],
    },
    {
      id: "social-justice",
      icon: Scale,
      title: "Social Justice & Legal Support",
      description: "Empowering communities through legal awareness and support",
      color: "from-purple-500 to-violet-500",
      initiatives: [
        {
          name: "Legal Guidance",
          description:
            "Providing guidance, motivation, and support to victims seeking justice",
          icon: Gavel,
          image: "/AboutOurGOv4.jpg",
        },
        {
          name: "Rights Awareness",
          description:
            "Spreading legal awareness, especially among disadvantaged groups",
          icon: Megaphone,
          image: "/AboutOurGOv5.jpg",
        },
      ],
      stats: [
        { label: "Cases Supported", value: "150+" },
        { label: "Awareness Sessions", value: "30+" },
        { label: "Lives Empowered", value: "500+" },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/ProgramHealth.jpg)",
            filter: "blur(3px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/65 to-secondary/75" />

        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Programs
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Comprehensive initiatives addressing critical needs in rural
            communities
          </p>
        </div>
      </section>

      {/* Programs Detail */}
      {programs.map((program, index) => (
        <section
          key={program.id}
          className={`py-20 ${
            index % 2 === 0
              ? "bg-white dark:bg-gray-900"
              : "bg-gray-50 dark:bg-gray-800"
          } animate-fade-in`}
          ref={useIntersectionObserver()}
        >
          <div className="container">
            <div className="mb-12 text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${program.color} text-white mb-6 animate-fade-in`}
              >
                <program.icon className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
                {program.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in">
                {program.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {program.stats.map((stat, idx) => {
                const StatCounter = () => {
                  const { count, elementRef } = useCounterAnimation(
                    stat.value,
                    2000
                  );
                  const suffix = stat.value.replace(/[0-9,]/g, "");

                  return (
                    <div
                      ref={elementRef}
                      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {count.toLocaleString()}
                        {suffix}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  );
                };

                return <StatCounter key={idx} />;
              })}
            </div>

            {/* Initiatives */}
            <div className="space-y-6">
              {program.initiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  ref={useIntersectionObserver()}
                >
                  <div
                    className={`flex flex-col md:flex-row gap-0 items-stretch ${
                      idx % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content - determines the height */}
                    <div className="md:w-[60%] p-8 flex flex-col justify-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center mb-4">
                        <initiative.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {initiative.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {initiative.description}
                      </p>
                    </div>

                    {/* Image - matches content height */}
                    <div className="md:w-[40%] h-48 overflow-hidden">
                      <img
                        src={initiative.image}
                        alt={initiative.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Dynamic Programs from Database */}
      {!loading && dynamicPrograms.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Our Additional Programs
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Discover more initiatives making a difference in our communities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynamicPrograms.map((program, index) => (
                <div
                  key={program._id}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {program.image?.url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={program.image.url}
                        alt={program.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                        style={{ objectPosition: "top" }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium capitalize">
                        {program.category || "General"}
                      </span>
                      {program.status && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            program.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : program.status === "completed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : program.status === "upcoming"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {program.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {program.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {program.targetAudience && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {program.targetAudience}
                          </span>
                        </div>
                      )}

                      {program.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {program.location}
                          </span>
                        </div>
                      )}

                      {program.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <TrendingUp className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            Duration: {program.duration}
                          </span>
                        </div>
                      )}
                    </div>

                    {program.objectives && program.objectives.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Key Objectives:
                        </p>
                        <ul className="space-y-1">
                          {program.objectives
                            .slice(0, 3)
                            .map((objective, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                              >
                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">
                                  {objective}
                                </span>
                              </li>
                            ))}
                          {program.objectives.length > 3 && (
                            <li className="text-xs text-gray-500 dark:text-gray-500 ml-6">
                              +{program.objectives.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-20 text-white animate-fade-in relative overflow-hidden"
        ref={useIntersectionObserver()}
      >
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
            Support Our Programs
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Your contribution helps us continue and expand these vital programs.
            Every donation makes a real difference.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/donate"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Donate Now
              <Heart className="w-5 h-5" fill="currentColor" />
            </a>
            <a
              href="/volunteer"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Volunteer With Us
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
