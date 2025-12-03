import React from "react";
import {
  Users,
  Heart,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Sprout,
  User,
  UserCircle,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Impact = () => {
  const impactStats = [
    {
      icon: Users,
      label: "Lives Impacted",
      value: "10,000+",
      color: "text-blue-600",
    },
    {
      icon: Heart,
      label: "Blood Units Donated",
      value: "2,500+",
      color: "text-red-600",
    },
    {
      icon: TrendingUp,
      label: "Active Programs",
      value: "15+",
      color: "text-green-600",
    },
    {
      icon: Award,
      label: "Years of Service",
      value: "5+",
      color: "text-purple-600",
    },
  ];

  const stories = [
    {
      title: "Healthcare Access Improved",
      description:
        "Through our medical equipment bank, over 500 families received essential medical equipment including wheelchairs, oxygen cylinders, and hospital beds at no cost.",
      icon: Building2,
      stats: ["500+ Families", "1,200+ Equipment Items", "24/7 Availability"],
    },
    {
      title: "Education Transformed",
      description:
        "Our scholarship program has helped 300+ students from rural areas continue their education, with 95% successfully completing their studies.",
      icon: GraduationCap,
      stats: ["300+ Scholarships", "95% Success Rate", "25 Schools Partnered"],
    },
    {
      title: "Community Development",
      description:
        "Environmental initiatives have cleaned 40+ dumping grounds and improved infrastructure in 15+ villages, benefiting over 5,000 residents.",
      icon: Sprout,
      stats: ["40+ Clean-ups", "15+ Villages", "5,000+ Beneficiaries"],
    },
  ];

  const testimonials = [
    {
      name: "Priya Kumar",
      role: "Scholarship Recipient",
      text: "AYDF scholarship helped me pursue engineering when my family couldn't afford it. Today, I'm working as a software engineer and giving back to my community.",
      icon: User,
    },
    {
      name: "Rajesh Menon",
      role: "Medical Equipment Beneficiary",
      text: "When my mother needed a wheelchair after surgery, AYDF provided it immediately at no cost. Their support made her recovery journey much easier.",
      icon: UserCircle,
    },
    {
      name: "Lakshmi Devi",
      role: "Village Leader",
      text: "AYDF's clean-up drives transformed our village. The youth involvement has also created awareness about environmental responsibility.",
      icon: User,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Impact
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Real stories, measurable change, lasting transformation
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <h2 className="section-title text-center mb-12">Impact By Numbers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <stat.icon className={`w-16 h-16 ${stat.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="section-title text-center mb-12">Stories of Change</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`${
                  index % 3 === 0
                    ? "reveal-left"
                    : index % 3 === 1
                    ? "reveal-scale"
                    : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center">
                  <story.icon className="w-24 h-24 text-primary" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {story.description}
                  </p>
                  <div className="space-y-2">
                    {story.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <h2 className="section-title text-center mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${
                  index % 3 === 0
                    ? "reveal-left"
                    : index % 3 === 1
                    ? "reveal-scale"
                    : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center mb-4">
                  <testimonial.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Impact */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="section-title text-center mb-12">Where We Work</h2>
          <div
            className="max-w-4xl mx-auto reveal-scale"
            ref={useIntersectionObserver()}
          >
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Primary Focus Areas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Based in Arni, Tiruvannamalai District, Tamil Nadu, our
                    programs reach across the district and neighboring regions.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Villages Covered
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    25+ villages in Tiruvannamalai District
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Population Reached
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    50,000+ people across rural areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: "2019",
                  event:
                    "Foundation established with first blood donation camp",
                },
                {
                  year: "2020",
                  event:
                    "Medical equipment bank launched, first scholarships awarded",
                },
                {
                  year: "2021",
                  event: "Expanded to 10+ villages, 100+ volunteers joined",
                },
                {
                  year: "2022",
                  event:
                    "Social justice board formed, legal awareness programs started",
                },
                {
                  year: "2023",
                  event: "Reached 5,000+ lives, 25 schools partnered",
                },
                {
                  year: "2024",
                  event: "10,000+ lives impacted, 500+ active volunteers",
                },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      <Calendar className="w-6 h-6" />
                    </div>
                    {index < 5 && (
                      <div className="w-1 h-full bg-primary/20 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {milestone.year}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of This Impact
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Every contribution creates ripples of positive change. Join us in
            transforming lives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/donate"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Donate Now
            </a>
            <a
              href="/volunteer"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
