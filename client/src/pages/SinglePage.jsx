import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import Appointment from "./Appointment";

export default function SinglePage() {
  const location = useLocation();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      scrollTo(hash);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, location.pathname]);

  const navigateToAppointment = () => scrollTo("appointment");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div>
      <section id="home"><Home onNavigateAppointment={navigateToAppointment} /></section>
      <section id="services"><Services onNavigateAppointment={navigateToAppointment} /></section>
      <section id="about"><About /></section>
      <section id="appointment"><Appointment /></section>

      <div className="scroll-controls">
        <button className="scroll-btn top" onClick={scrollToTop} aria-label="Scroll to top">▲</button>
        <button className="scroll-btn bottom" onClick={scrollToBottom} aria-label="Scroll to bottom">▼</button>
      </div>
    </div>
  );
}
