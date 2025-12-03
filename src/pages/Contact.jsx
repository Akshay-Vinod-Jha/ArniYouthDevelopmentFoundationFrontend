import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Modal from "../components/ui/Modal";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    type: "general",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Arni, Tiruvannamalai District", "Tamil Nadu, India - 632301"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@aydfindia.org", "support@aydfindia.org"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday: 9 AM - 6 PM", "Sunday: Closed"],
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "volunteer", label: "Volunteer Opportunities" },
    { value: "partnership", label: "Partnership/CSR" },
    { value: "support", label: "Support/Help" },
    { value: "complaint", label: "Complaint/Feedback" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          inquiry_type:
            inquiryTypes.find((t) => t.value === formData.type)?.label ||
            formData.type,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      showModal(
        "success",
        "Message Sent!",
        "Thank you for contacting us. We'll get back to you within 24-48 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        type: "general",
        message: "",
      });

      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      showModal(
        "error",
        "Send Failed",
        "Failed to send message. Please try again or contact us directly via email."
      );
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            We'd love to hear from you. Get in touch with AYDF team.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={useIntersectionObserver()}
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="reveal-left" ref={useIntersectionObserver()}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                      placeholder="9876543210"
                      pattern="[0-9]{10}"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full btn btn-primary text-lg py-4 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : status === "success" ? (
                    "✓ Message Sent!"
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-800 text-center">
                    Thank you! We'll get back to you within 24-48 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div
              className="reveal-right reveal-delay-200"
              ref={useIntersectionObserver()}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Visit Us
              </h2>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Response
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We typically respond to inquiries within 24-48 hours during
                  working days. For urgent matters, please call us directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Phone className="w-5 h-5 text-primary" />
                    <a href="tel:+919876543210" className="hover:text-primary">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href="mailto:info@aydfindia.org"
                      className="hover:text-primary"
                    >
                      info@aydfindia.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container max-w-4xl">
          <h2 className="section-title text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How can I volunteer with AYDF?",
                a: "Visit our Volunteer page, fill out the application form, and our team will contact you with available opportunities.",
              },
              {
                q: "Are donations tax-deductible?",
                a: "Yes! All donations to AYDF are eligible for 80G tax exemption. You will receive a tax certificate via email.",
              },
              {
                q: "How can my company partner with AYDF?",
                a: 'We welcome corporate partnerships! Please select "Partnership/CSR" in the inquiry type above, and our partnerships team will reach out.',
              },
              {
                q: "Where do you operate?",
                a: "Our primary focus is Arni and surrounding areas in Tiruvannamalai District, Tamil Nadu, covering 25+ villages.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className={`${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } reveal-delay-${
                  index * 100
                } bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg`}
                ref={useIntersectionObserver()}
              >
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Component */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default Contact;
