import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, UserPlus, Building2, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const GetInvolved = () => {
  const ways = [
    {
      icon: Heart,
      title: "Donate",
      description:
        "Make a financial contribution to support our programs and initiatives.",
      color: "from-red-500 to-pink-500",
      link: "/donate",
      benefits: [
        "Tax exemption certificate",
        "Regular updates on fund utilization",
        "Recognition in our annual report",
        "Choose specific programs to support",
      ],
    },
    {
      icon: Users,
      title: "Become a Member",
      description:
        "Join our community with annual membership of ₹500 and get exclusive benefits.",
      color: "from-blue-500 to-indigo-500",
      link: "/membership",
      benefits: [
        "Voting rights in foundation decisions",
        "Priority access to programs and events",
        "Networking with like-minded individuals",
        "Membership certificate and ID card",
      ],
    },
    {
      icon: UserPlus,
      title: "Volunteer",
      description:
        "Contribute your time and skills to make a direct impact in communities.",
      color: "from-green-500 to-emerald-500",
      link: "/volunteer",
      benefits: [
        "Hands-on experience in social work",
        "Skill development opportunities",
        "Volunteer certificate",
        "Be part of impactful programs",
      ],
    },
    {
      icon: Building2,
      title: "Partner With Us",
      description:
        "Corporate partnerships and collaborations for larger community impact.",
      color: "from-purple-500 to-violet-500",
      link: "/contact",
      benefits: [
        "CSR partnership opportunities",
        "Employee engagement programs",
        "Brand visibility and recognition",
        "Joint program implementation",
      ],
    },
  ];

  const volunteerOpportunities = [
    {
      title: "Healthcare Programs",
      description:
        "Help organize blood donation camps, health checkups, and awareness sessions.",
      commitment: "Flexible",
    },
    {
      title: "Education Support",
      description:
        "Mentor students, conduct career guidance sessions, or help with scholarship programs.",
      commitment: "4-6 hours/month",
    },
    {
      title: "Community Development",
      description:
        "Participate in clean-up drives, infrastructure projects, and community events.",
      commitment: "Event-based",
    },
    {
      title: "Fundraising & Outreach",
      description:
        "Help with fundraising campaigns, event organization, and social media outreach.",
      commitment: "Flexible",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Get Involved
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Choose your way to make a difference in rural communities
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <div
                  className={`h-32 bg-gradient-to-br ${way.color} flex items-center justify-center`}
                >
                  <way.icon className="w-16 h-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {way.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {way.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {way.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={way.link}
                    className="btn btn-primary w-full justify-center"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            Volunteer Opportunities
          </h2>
          <p className="section-subtitle text-center mb-12">
            Find the perfect way to contribute your time and skills
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerOpportunities.map((opp, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {opp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {opp.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {opp.commitment}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/volunteer" className="btn btn-primary">
              Apply to Volunteer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Partnerships */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="section-title mb-6">
              Corporate Social Responsibility
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Partner with AYDF for meaningful CSR initiatives that create
              lasting impact in rural communities. We offer customized programs
              aligned with your CSR goals.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div
                className="reveal-left bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                ref={useIntersectionObserver()}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Employee Engagement
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Volunteer programs and team building activities
                </p>
              </div>
              <div
                className="reveal-scale reveal-delay-100 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                ref={useIntersectionObserver()}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Program Sponsorship
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Support specific initiatives aligned with your values
                </p>
              </div>
              <div
                className="reveal-right reveal-delay-200 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                ref={useIntersectionObserver()}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Skill Development
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Pro-bono services and expertise sharing
                </p>
              </div>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Discuss Partnership
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact of Involvement */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="section-title text-center mb-12">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="reveal-left text-center"
              ref={useIntersectionObserver()}
            >
              <div className="text-5xl font-bold text-primary mb-2">₹500</div>
              <div className="text-gray-900 dark:text-white font-semibold mb-2">
                Monthly Donation
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Provides school supplies for 5 students
              </p>
            </div>
            <div
              className="reveal-scale reveal-delay-100 text-center"
              ref={useIntersectionObserver()}
            >
              <div className="text-5xl font-bold text-primary mb-2">8 hrs</div>
              <div className="text-gray-900 dark:text-white font-semibold mb-2">
                Volunteering/Month
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Mentor 10 students in career guidance
              </p>
            </div>
            <div
              className="reveal-right reveal-delay-200 text-center"
              ref={useIntersectionObserver()}
            >
              <div className="text-5xl font-bold text-primary mb-2">1</div>
              <div className="text-gray-900 dark:text-white font-semibold mb-2">
                Membership
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Support all programs and shape decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Every action counts. Choose how you want to contribute and start
            your journey with AYDF today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donate" className="btn btn-primary">
              Donate Now
            </Link>
            <Link to="/membership" className="btn btn-secondary">
              Become a Member
            </Link>
            <Link to="/volunteer" className="btn btn-outline">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
