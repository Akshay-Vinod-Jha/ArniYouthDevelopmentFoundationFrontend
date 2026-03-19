import React, { useState, useEffect } from "react";
import axios from "axios";
import { Award, Heart, Users, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Trustee = () => {
  const [trustees, setTrustees] = useState([
    {
      id: 1,
      name: "Pankaj Kantilal Kothari",
      position: "President",
      image: "/aydf_trustee/PankajKantilalKothari.jpg.jpeg",
      bio: "President of the Arni Youth Development Foundation and Trustee of the Late Matoshree Sushilabai Nagpure Old Age Home, Arni. Pankaj Kothari has been consistently involved in social service, contributing to education, youth welfare, healthcare, agriculture, and community development. A respected industrialist and well-known figure in the Arni Taluka, he is widely recognized for his business acumen and philanthropic efforts. He is the owner of Swastik Ginning & Pressing Services and plays a significant role in the social and economic development of the region.",
    },
    {
      id: 2,
      name: "Abdul Sheikh Usman",
      position: "Vice President",
      image: "/aydf_trustee/Abdul Sheikh Usman SK 19.png",
      bio: "Vice President of the Arni Youth Development Foundation with over twenty years of active involvement in the social sector. Associated with multiple social organizations and known for his grassroots-level involvement, he works tirelessly to resolve the problems of poor, distressed, and marginalized individuals by providing guidance, assistance, and emotional support. His humanitarian approach and long-standing dedication reflect a deep commitment to social justice and community welfare.",
    },
    {
      id: 3,
      name: "Suhas Manohar Jilhewar",
      position: "Treasurer",
      image: "/aydf_trustee/Suhas Manohar Jilhewar SK 8.png",
      bio: "Treasurer of the Arni Youth Development Foundation with a strong interest in social service. He actively supports youth development initiatives, particularly in the areas of sports, education, and youth welfare. Suhas provides financial and moral support to encourage young talent from rural backgrounds. He is the owner of Vyankatesh Krushi Kendra at Jawla in Arni Taluka and works closely with farmers, promoting sustainable agricultural practices and rural economic development.",
    },
    {
      id: 4,
      name: "Ashish Manikrao Dhakulkar",
      position: "Secretary",
      image: "/aydf_trustee/Ashish Manikrao Dhakulkar SK 10.png",
      bio: "Secretary of the Arni Youth Development Foundation and Vice President of the Late Matoshree Sushilabai Nagpure Old Age Home, Arni. He actively oversees welfare activities for senior citizens and plays an important role in planning and executing social initiatives, including health camps, awareness programs, and community service activities. His dedication ensures that social welfare programs are implemented efficiently and with compassion.",
    },
    {
      id: 5,
      name: "Kunal Manwar",
      position: "Trustee",
      image: "/aydf_trustee/Kunal Manwar SK 1.png",
      bio: "Trustee of the Arni Youth Development Foundation representing the younger generation of social workers. He approaches every social initiative with clarity of purpose and unwavering commitment. Actively involved in youth welfare, awareness campaigns, and community support programs, Kunal demonstrates leadership, empathy, and a strong desire to create positive social change at a young age.",
    },
    {
      id: 6,
      name: "Amol Sudhakar Mangulkar",
      position: "Trustee",
      image: "/aydf_trustee/Amol Sudhakar Mangulkar SK 4.png",
      bio: "Trustee of the Arni Youth Development Foundation with active involvement in social service for many years. He is an active member of the Good Morning Group and regularly takes the initiative in organizing health camps, awareness drives, and public welfare programs. With a strong sense of responsibility and excellent organizational skills, he contributes significantly to the successful execution of community-oriented activities. Professionally, he works as a government contractor and supports development-focused projects that benefit society.",
    },
    {
      id: 7,
      name: "Nandkishor Girdharilal Rathi",
      position: "Trustee",
      image: "/aydf_trustee/Nandkishor Girdharilal Rathi SK 6.png",
      bio: "Trustee of the Arni Youth Development Foundation who combines business activities with deep commitment to social welfare and community service. Known for his compassionate nature, he extends support to underprivileged individuals and contributes to social initiatives aimed at inclusive growth and social harmony.",
    },
    {
      id: 8,
      name: "Ranjitkumar Govindsing Rathod",
      position: "Trustee",
      image: "/aydf_trustee/Ranjitkumar Govindsing Rathod SK 12.png",
      bio: "Trustee of the Arni Youth Development Foundation and an active member of the Arni Cycling Club and Good Morning Group. Through his personal involvement, he promotes health awareness among youth with the message, 'Ride a bicycle, maintain a healthy body.' He remains actively engaged in rural development activities and supports initiatives that encourage fitness, discipline, and positive lifestyle choices among young people.",
    },
    {
      id: 9,
      name: "Rajendra Uddhaorao Ingole",
      position: "Trustee",
      image: "/aydf_trustee/Rajendra Uddhaorao Ingole SK 14.png",
      bio: "Trustee of the Arni Youth Development Foundation and a journalist by profession. As a strong believer in democratic values, he uses journalism as a medium to highlight social issues, raise public awareness, and advocate for justice. Through his writing and social involvement, he amplifies the voices of marginalized communities and contributes meaningfully to social reform.",
    },
    {
      id: 10,
      name: "Mohamad Nasir Haji Mohamad Shafi Khakara",
      position: "Trustee",
      image: "/aydf_trustee/Mohamad Nasir Haji Mohamad Shafi Khakara SK 16.png",
      bio: "Trustee of the Arni Youth Development Foundation and an active contributor to community welfare initiatives. He supports various social programs and assists individuals in need. Along with his social work, he runs a textile business under the name Haji Abdul Karim Tayyab, through which he also supports local employment and community development.",
    },
    {
      id: 11,
      name: "Prakash Shyamrao Zalke",
      position: "Trustee",
      image: "/aydf_trustee/Prakash Shyamrao Zalke SK 20.png",
      bio: "Trustee of the Arni Youth Development Foundation and a responsible officer in the Public Works Department (PWD). He actively participates in social and developmental activities and strongly believes in guiding youth toward public service. He provides mentorship and guidance to students preparing for MPSC and UPSC examinations, helping them contribute to nation-building.",
    },
  ]);

  const stats = [
    {
      label: "Board Members",
      value: "11",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Years of Experience",
      value: "150+",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Collective Impact",
      value: "1000+",
      icon: Heart,
      color: "text-red-600",
    },
    {
      label: "Expertise Areas",
      value: "8+",
      icon: Award,
      color: "text-purple-600",
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
            backgroundImage: "url(/logo_type_photo/Aydf Trustee Final.jpg)",
            filter: "blur(3px)",
            transform: "scale(1.1)",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/65 to-secondary/75" />

        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Trustees
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Dedicated leaders driving AYDF's mission with vision, expertise, and
            compassion
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-20 dark:bg-gray-900 animate-fade-in"
        ref={useIntersectionObserver()}
      >
        <div className="container">
          <h2 className="section-title text-center mb-12">Board Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow animate-fade-in"
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

      {/* Trustees Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 animate-fade-in">
        <div className="container">
          <h2 className="section-title text-center mb-4">Meet Our Board</h2>
          <p className="section-subtitle text-center mb-16">
            Experienced professionals committed to transforming rural
            communities
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustees.map((trustee, index) => (
              <div
                key={trustee.id}
                className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
                ref={useIntersectionObserver()}
              >
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {trustee.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {trustee.position}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                    {trustee.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustee Values Section */}
      <section className="py-20 dark:bg-gray-900 animate-fade-in">
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Board Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity & Transparency",
                description:
                  "Committed to ethical practices, transparency in all operations, and accountability to community members and stakeholders.",
                icon: Award,
              },
              {
                title: "Community-Centric Focus",
                description:
                  "Prioritizing community needs and ensuring that all decisions are made with genuine concern for beneficiary welfare.",
                icon: Users,
              },
              {
                title: "Collaborative Excellence",
                description:
                  "Believing in collective strength, fostering partnerships, and leveraging diverse expertise for maximum impact.",
                icon: TrendingUp,
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  ref={useIntersectionObserver()}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white animate-fade-in">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Collaborate with Our Board?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're always open to partnerships and collaborations that advance
            our mission of rural development and community empowerment.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Trustee;
