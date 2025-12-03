import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {
  Heart,
  TrendingUp,
  Users,
  Check,
  Droplet,
  GraduationCap,
  Building2,
  Sprout,
} from "lucide-react";
import Modal from "../components/ui/Modal";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    panNumber: "",
    program: "general",
    isAnonymous: false,
  });

  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const predefinedAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const programs = [
    { value: "general", label: "Where Most Needed" },
    { value: "healthcare", label: "Healthcare Initiatives" },
    { value: "education", label: "Education Programs" },
    { value: "rural-development", label: "Rural Development" },
    { value: "social-justice", label: "Social Justice" },
  ];

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;

    if (!finalAmount || finalAmount < 1) {
      showModal(
        "warning",
        "Invalid Amount",
        "Please enter a valid donation amount."
      );
      return;
    }

    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
      showModal(
        "warning",
        "Missing Information",
        "Please fill in all required fields (Name, Email, Phone)."
      );
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        showModal(
          "error",
          "Connection Error",
          "Razorpay SDK failed to load. Please check your internet connection and try again."
        );
        setLoading(false);
        return;
      }

      // Create order on backend
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const { data } = await axios.post(`${API_URL}/donations/create`, {
        donor: donorInfo,
        amount: finalAmount,
        program: donorInfo.program,
        isAnonymous: donorInfo.isAnonymous,
      });

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "AYDF - Arni Youth Development Foundation",
        description: `Donation for ${
          programs.find((p) => p.value === donorInfo.program)?.label
        }`,
        order_id: data.order.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyData = await axios.post(`${API_URL}/donations/verify`, {
              donationId: data.donation.id,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyData.data.success) {
              // Send email receipt if not anonymous
              if (verifyData.data.sendEmail) {
                try {
                  const emailParams = {
                    to_name: donorInfo.name,
                    to_email: donorInfo.email,
                    amount: `₹${finalAmount}`,
                    payment_id: response.razorpay_payment_id,
                    donation_id: verifyData.data.donation._id,
                    program: donorInfo.program.replace(/-/g, " ").toUpperCase(),
                    date: new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }),
                  };

                  console.log("📧 Sending email with params:", emailParams);

                  await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_DONATION_TEMPLATE_ID,
                    emailParams,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                  );
                  console.log("✅ Receipt email sent successfully");
                } catch (emailError) {
                  console.error(
                    "⚠️ Email failed but donation succeeded:",
                    emailError
                  );
                }
              }

              showModal(
                "success",
                "Donation Successful!",
                `Thank you for your generous contribution! Payment ID: ${response.razorpay_payment_id}. You will receive a receipt via email shortly.`
              );
              // Reset form
              setAmount("");
              setCustomAmount("");
              setDonorInfo({
                name: "",
                email: "",
                phone: "",
                panNumber: "",
                program: "general",
                isAnonymous: false,
              });
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            showModal(
              "error",
              "Verification Failed",
              `Payment verification failed. Please contact support with Payment ID: ${response.razorpay_payment_id}`
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: donorInfo.name,
          email: donorInfo.email,
          contact: donorInfo.phone,
        },
        theme: {
          color: "#FF6B35",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            showModal(
              "info",
              "Payment Cancelled",
              "Your donation was not processed. No charges were made."
            );
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      showModal(
        "error",
        "Payment Failed",
        "Failed to initiate payment. Please try again or contact support."
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Donate
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Your generosity transforms lives and builds stronger communities
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                ₹5,00,000+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total Donations
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                1,200+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Generous Donors
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Transparent Usage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Make Your Donation
            </h2>

            <form onSubmit={handleDonate} className="space-y-6">
              {/* Select Amount */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                        amount === amt
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:border-primary"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Or Enter Custom Amount
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    placeholder="Enter amount in ₹"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    min="1"
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose Program
                </label>
                <select
                  value={donorInfo.program}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, program: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                >
                  {programs.map((prog) => (
                    <option key={prog.value} value={prog.value}>
                      {prog.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorInfo.name}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={donorInfo.email}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
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
                    value={donorInfo.phone}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    placeholder="10-digit number"
                    pattern="[0-9]{10}"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    PAN Number (Optional for 80G)
                  </label>
                  <input
                    type="text"
                    value={donorInfo.panNumber}
                    onChange={(e) =>
                      setDonorInfo({
                        ...donorInfo,
                        panNumber: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-primary focus:outline-none"
                    placeholder="ABCDE1234F"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  />
                </div>
              </div>

              {/* Anonymous Donation */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={donorInfo.isAnonymous}
                  onChange={(e) =>
                    setDonorInfo({
                      ...donorInfo,
                      isAnonymous: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <label
                  htmlFor="anonymous"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Make this an anonymous donation
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={(!amount && !customAmount) || loading}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6" fill="currentColor" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </form>

            {/* Tax Benefits */}
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Tax Benefits
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Donations to AYDF are eligible for 80G tax exemption. You'll
                    receive a tax certificate via email after successful
                    payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Funds Are Used */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            How Your Donation Helps
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Droplet className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                ₹500
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Organizes blood donation camp
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                ₹1,000
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                School supplies for 10 students
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                ₹5,000
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Medical equipment for a family
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Sprout className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                ₹10,000
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Village clean-up drive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            Other Ways to Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Monthly Giving
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Set up recurring monthly donations for sustained impact
              </p>
              <button className="text-primary font-medium hover:underline">
                Learn More →
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                In-Kind Donations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Donate medical equipment, books, or other essential items
              </p>
              <button className="text-primary font-medium hover:underline">
                Contact Us →
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Corporate Giving
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Partner with us for CSR initiatives and employee engagement
              </p>
              <button className="text-primary font-medium hover:underline">
                Get in Touch →
              </button>
            </div>
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

export default Donate;
