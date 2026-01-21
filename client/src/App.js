import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Breeding from "./pages/Breeding";
import BreedUpload from "./pages/BreedUpload";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import AppointmentsList from "./pages/AppointmentsList";
import "./App.css";

function Layout() {
  const location = useLocation();

  // Pages where footer should NOT appear
  const hideFooterRoutes = ["/appointments-list","/breeding"];

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/breeding" element={<Breeding />} />
        <Route path="/breed-upload" element={<BreedUpload />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointments-list" element={<AppointmentsList />} />
      </Routes>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
