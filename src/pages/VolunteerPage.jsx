import { useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Heart,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  Upload,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Target,
} from "lucide-react";
import Modal from "../components/ui/Modal";

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: {
        line1: "",
        city: "",
        state: "",
        pincode: "",
      },
      occupation: "",
    },
    availability: {
      days: [],
      hoursPerWeek: "",
    },
    skills: [],
    programs: [],
    experience: "",
    motivation: "",
    resume: null,
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const opportunities = [
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Assist in mobile clinics and health awareness programs",
      commitment: "8-10 hours/week",
    },
    {
      icon: Users,
      title: "Education Mentoring",
      description: "Teach and mentor underprivileged children",
      commitment: "5-7 hours/week",
    },
    {
      icon: Briefcase,
      title: "Skill Development",
      description: "Train youth in vocational and technical skills",
      commitment: "10-15 hours/week",
    },
    {
      icon: Target,
      title: "Community Outreach",
      description: "Engage with communities and spread awareness",
      commitment: "Flexible",
    },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const skillOptions = [
    "Teaching",
    "Medical/Healthcare",
    "Technical/IT",
    "Administrative",
    "Event Management",
    "Social Media",
    "Photography",
    "Counseling",
    "Other",
  ];

  const programOptions = [
    "Healthcare Services",
    "Education Support",
    "Rural Development",
    "Social Justice",
    "Women Empowerment",
    "Youth Development",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("personalInfo.")) {
      const field = name.split(".")[1];
      if (field.startsWith("address.")) {
        const addressField = field.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            address: { ...prev.personalInfo.address, [addressField]: value },
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value },
        }));
      }
    } else if (name.startsWith("availability.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        availability: { ...prev.availability, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate submission
    const applicationId = `VOL${Date.now()}`;

    showModal(
      "success",
      "🎉 Application Received!",
      `Thank you ${formData.personalInfo.name}!\n\nYour volunteer application has been successfully submitted.\n\nApplication ID: ${applicationId}\n\nOur team will review your application and contact you within 5-7 business days via email at ${formData.personalInfo.email}.\n\nWelcome to the AYDF volunteer community!`
    );

    // Reset form
    setFormData({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: { line1: "", city: "", state: "", pincode: "" },
        occupation: "",
      },
      availability: { days: [], hoursPerWeek: "" },
      skills: [],
      programs: [],
      experience: "",
      motivation: "",
      resume: null,
    });
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
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a Volunteer
            </h1>
            <p className="text-xl text-white/90">
              Make a difference in your community. Join our team of dedicated
              volunteers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div
          className="container mx-auto px-4 reveal"
          ref={useIntersectionObserver()}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from various roles that match your skills and interests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
                ref={useIntersectionObserver()}
              >
                <opp.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {opp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {opp.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary dark:text-primary">
                  <Clock className="w-4 h-4" />
                  {opp.commitment}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div
          className="container mx-auto px-4 max-w-5xl reveal"
          ref={useIntersectionObserver()}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Volunteer Application Form
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="personalInfo.name"
                      value={formData.personalInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="personalInfo.email"
                      value={formData.personalInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="personalInfo.phone"
                      value={formData.personalInfo.phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="personalInfo.dateOfBirth"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation *
                    </label>
                    <input
                      type="text"
                      name="personalInfo.occupation"
                      value={formData.personalInfo.occupation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your current profession"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Availability
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Available Days *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {daysOfWeek.map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.availability.days.includes(day)}
                          onChange={() =>
                            handleCheckboxChange("availability.days", day)
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {day}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hours per Week *
                  </label>
                  <select
                    name="availability.hoursPerWeek"
                    value={formData.availability.hoursPerWeek}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select hours per week</option>
                    <option value="5-10">5-10 hours</option>
                    <option value="10-20">10-20 hours</option>
                    <option value="20+">20+ hours</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Skills & Interests
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Your Skills *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillOptions.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleCheckboxChange("skills", skill)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {skill}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Programs of Interest *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {programOptions.map((program) => (
                      <label
                        key={program}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.programs.includes(program)}
                          onChange={() =>
                            handleCheckboxChange("programs", program)
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {program}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience & Motivation */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevant Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe any relevant volunteer or professional experience..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to volunteer? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us what motivates you to volunteer with AYDF..."
                  ></textarea>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Resume (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Choose File
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {formData.resume && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formData.resume.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Submit Application
              </button>

              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                By submitting this form, you agree to volunteer with AYDF and
                follow our volunteer guidelines
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export default VolunteerPage;
