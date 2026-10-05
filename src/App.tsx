import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ClientSpace from './components/ClientSpace';
import Login from './components/Login';
import Blog from './components/Blog';
import TestimonialForm from './components/TestimonialForm';
import BlogPost from './components/BlogPost';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, isAdmin } = useAuthStore();

  const HomePage = () => (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Videos />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );

  const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (requireAdmin && !isAdmin) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/testimonial" element={<TestimonialForm />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client" 
          element={
            <ProtectedRoute>
              <ClientSpace />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;