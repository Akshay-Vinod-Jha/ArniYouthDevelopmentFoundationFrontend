import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminProvider } from "./context/AdminContext";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Impact from "./pages/Impact";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import MembershipPage from "./pages/MembershipPage";
import VolunteerPage from "./pages/VolunteerPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManagement from "./pages/admin/BlogManagement";
import ProgramManagement from "./pages/admin/ProgramManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import BoardManagement from "./pages/admin/BoardManagement";
import VolunteerManagement from "./pages/admin/VolunteerManagement";
import MembershipManagement from "./pages/admin/MembershipManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import DonationManagement from "./pages/admin/DonationManagement";

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blogs" element={<BlogManagement />} />
              <Route path="programs" element={<ProgramManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="board" element={<BoardManagement />} />
              <Route path="volunteers" element={<VolunteerManagement />} />
              <Route path="memberships" element={<MembershipManagement />} />
              <Route path="contacts" element={<ContactManagement />} />
              <Route path="donations" element={<DonationManagement />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/impact" element={<Impact />} />
                      <Route path="/get-involved" element={<GetInvolved />} />
                      <Route path="/donate" element={<Donate />} />
                      <Route path="/membership" element={<MembershipPage />} />
                      <Route path="/volunteer" element={<VolunteerPage />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
