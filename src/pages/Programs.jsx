import React from "react";
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
  Hospital,
  Stethoscope,
  Truck,
  Award,
  BookOpen,
  Recycle,
  Construction,
  Home,
  Gavel,
  Megaphone,
} from "lucide-react";

const Programs = () => {
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
        },
        {
          name: "Medical Equipment Bank",
          description:
            "Establishing and expanding medical equipment bank for needy patients",
          icon: Hospital,
        },
        {
          name: "Health Checkup & Awareness",
          description:
            "Conducting health checkups, cancer awareness camps, and specialist consultations",
          icon: Stethoscope,
        },
        {
          name: "Multi-City Patient Support",
          description:
            "Providing ambulance, accommodation, and guidance for multi-city medical needs",
          icon: Truck,
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
        },
        {
          name: "Career Guidance",
          description:
            "Subject-based seminars and career guidance sessions in schools",
          icon: Users,
        },
        {
          name: "School Awareness Sessions",
          description:
            "Building platforms to connect donors, corporates, and students",
          icon: BookOpen,
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
        },
        {
          name: "Infrastructure Support",
          description: "Working on rural/urban infrastructure improvements",
          icon: Construction,
        },
        {
          name: "Community Development",
          description:
            "Taking initiatives on local issues affecting community wellbeing",
          icon: Home,
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
        },
        {
          name: "Rights Awareness",
          description:
            "Spreading legal awareness, especially among disadvantaged groups",
          icon: Megaphone,
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
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
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
          }`}
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
              {program.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Initiatives */}
            <div className="grid md:grid-cols-2 gap-6">
              {program.initiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
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
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
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
