import React from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Award, ArrowRight } from "lucide-react";

const About = () => {
  const boards = [
    {
      name: "Healthcare Board",
      description: "Managing health initiatives and medical support programs",
    },
    {
      name: "Education Board",
      description: "Overseeing scholarships and educational programs",
    },
    {
      name: "City & Rural Development Board",
      description: "Leading infrastructure and community development",
    },
    {
      name: "Social Justice Board",
      description: "Ensuring legal support and rights awareness",
    },
    {
      name: "Outreach Board",
      description: "Coordinating events, fundraising, and partnerships",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every initiative with empathy and genuine care for community wellbeing.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Communities are at the heart of everything we do, guiding our decisions and actions.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest quality in all our programs and services.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            About AYDF
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Arni Youth Development Foundation - Empowering communities,
            transforming lives
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                To create sustainable positive change in rural communities
                through integrated programs in healthcare, education,
                infrastructure development, and social justice.
              </p>
              <p className="text-lg text-gray-600">
                We aim to empower youth and community members with resources,
                knowledge, and opportunities to build better futures for
                themselves and their families.
              </p>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                A thriving, self-sustaining rural community where every
                individual has access to quality healthcare, education, and
                opportunities for growth and development.
              </p>
              <p className="text-lg text-gray-600">
                We envision communities where social justice prevails,
                infrastructure supports modern living, and youth are empowered
                to lead positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-600 mb-6">
                Founded with the spirit of "Matrubhumi" (motherland), Arni Youth
                Development Foundation was born from a deep commitment to serve
                rural communities in Tamil Nadu. What started as a small group
                of dedicated volunteers has grown into a comprehensive
                organization making a tangible impact across multiple sectors.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey began with blood donation camps and has expanded to
                include medical equipment banks, educational scholarships,
                infrastructure development, and legal support services. Each
                program is designed to address real community needs and create
                lasting positive change.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to have impacted over 10,000 lives through
                our various initiatives, supported by a network of 500+
                volunteers and governed by five specialized boards ensuring
                excellence across all our programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            Our Governance Structure
          </h2>
          <p className="section-subtitle text-center mb-12">
            Five specialized boards ensuring excellence across all programs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {board.name}
                </h3>
                <p className="text-gray-600">{board.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in making a lasting impact on rural communities. Your
            support and involvement can change lives.
          </p>
          <Link to="/get-involved" className="btn btn-primary">
            Get Involved Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
