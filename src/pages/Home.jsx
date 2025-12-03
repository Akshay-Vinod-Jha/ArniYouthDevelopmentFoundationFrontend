import React from "react";
import { Link } from "react-router-dom";
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

const Home = () => {
  const stats = [
    { label: "Lives Impacted", value: "10,000+", icon: Users },
    { label: "Active Volunteers", value: "500+", icon: Heart },
    { label: "Programs Running", value: "15+", icon: TrendingUp },
    { label: "Years of Service", value: "5+", icon: Award },
  ];

  const programs = [
    {
      icon: Droplet,
      title: "Healthcare Initiatives",
      description:
        "Blood donation camps, medical equipment bank, health checkups and awareness programs.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: GraduationCap,
      title: "Education Programs",
      description:
        "Scholarships, career guidance, and connecting students with opportunities.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Building,
      title: "Rural Development",
      description:
        "Infrastructure improvements, environmental initiatives, and community development.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Scale,
      title: "Social Justice",
      description:
        "Legal awareness, guidance for victims, and empowering disadvantaged communities.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building Better Communities Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Empowering rural communities through healthcare, education, and
              sustainable development in Arni and beyond.
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="section-title">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                Arni Youth Development Foundation (AYDF) is a dedicated
                organization working towards the holistic development of rural
                communities in Tamil Nadu. Founded with a vision of "Matrubhumi"
                (motherland), we focus on healthcare, education, rural
                development, and social justice.
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
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-lg ${program.color} flex items-center justify-center mb-4`}
                >
                  <program.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link
                  to="/programs"
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
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
