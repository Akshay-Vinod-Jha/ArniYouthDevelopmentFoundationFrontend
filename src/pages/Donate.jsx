import React, { useState } from "react";
import { Heart, TrendingUp, Users, Check } from "lucide-react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    panNumber: "",
    program: "general",
    isAnonymous: false,
  });

  const predefinedAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const programs = [
    { value: "general", label: "Where Most Needed" },
    { value: "healthcare", label: "Healthcare Initiatives" },
    { value: "education", label: "Education Programs" },
    { value: "rural-development", label: "Rural Development" },
    { value: "social-justice", label: "Social Justice" },
  ];

  const handleDonate = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    console.log("Donation:", { ...donorInfo, amount: finalAmount });
    alert(
      "Payment integration coming soon! Backend API will handle Razorpay payment."
    );
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
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹5,00,000+
              </div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                1,200+
              </div>
              <div className="text-gray-600">Generous Donors</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-gray-600">Transparent Usage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Make Your Donation
            </h2>

            <form onSubmit={handleDonate} className="space-y-6">
              {/* Select Amount */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
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
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min="1"
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Program
                </label>
                <select
                  value={donorInfo.program}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, program: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorInfo.name}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={donorInfo.email}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorInfo.phone}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="10-digit number"
                    pattern="[0-9]{10}"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
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
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="anonymous" className="text-gray-700">
                  Make this an anonymous donation
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!amount && !customAmount}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-6 h-6" fill="currentColor" />
                Proceed to Payment
              </button>
            </form>

            {/* Tax Benefits */}
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Tax Benefits
                  </h4>
                  <p className="text-gray-600 text-sm">
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
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            How Your Donation Helps
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🩸</div>
              <h3 className="font-bold text-gray-900 mb-2">₹500</h3>
              <p className="text-gray-600 text-sm">
                Organizes blood donation camp
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">₹1,000</h3>
              <p className="text-gray-600 text-sm">
                School supplies for 10 students
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-gray-900 mb-2">₹5,000</h3>
              <p className="text-gray-600 text-sm">
                Medical equipment for a family
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-bold text-gray-900 mb-2">₹10,000</h3>
              <p className="text-gray-600 text-sm">Village clean-up drive</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20">
        <div className="container">
          <h2 className="section-title text-center mb-12">
            Other Ways to Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Monthly Giving
              </h3>
              <p className="text-gray-600 mb-4">
                Set up recurring monthly donations for sustained impact
              </p>
              <button className="text-primary font-medium hover:underline">
                Learn More →
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                In-Kind Donations
              </h3>
              <p className="text-gray-600 mb-4">
                Donate medical equipment, books, or other essential items
              </p>
              <button className="text-primary font-medium hover:underline">
                Contact Us →
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Corporate Giving
              </h3>
              <p className="text-gray-600 mb-4">
                Partner with us for CSR initiatives and employee engagement
              </p>
              <button className="text-primary font-medium hover:underline">
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
