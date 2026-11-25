import { Routes, Route } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import Navbar from './components/Navbar.jsx';
import MembersDashboard from './components/MembersDashboard';
import MemberDashboard from './components/MemberDashboard';
import FullDetails from './components/FullDetails.jsx';
import Meeting from './pages/Meeting';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Chatbot from './pages/Chatbot';

import './styles/globals.css';
import './styles/animations.css';

export default function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/MembersDashboard" element={<MembersDashboard />} />
        <Route path="/FullDetails" element={<FullDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}