import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SinglePage from "./pages/SinglePage";
import Breeding from "./pages/Breeding";
import AppointmentsList from "./pages/AppointmentsList";
import BreedUpload from "./pages/BreedUpload";
import Services from "./pages/Services";
import About from "./pages/About";
import "./App.css";

function Layout() {
  const location = useLocation();

  
  const hideFooterRoutes = [];

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<SinglePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/breeding" element={<Breeding />} />
        <Route path="/appointments-list" element={<AppointmentsList />} />
        <Route path="/breed-upload" element={<BreedUpload />} />
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
