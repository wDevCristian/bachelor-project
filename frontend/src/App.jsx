import React, { useState } from "react";

// React Components
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home";
import FAQ from "./pages/FAQ/FAQ";
import Events from "./pages/Events/Events.jsx";
import Login from "./pages/Login/Login.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EventDetails from "./pages/EventDetails/EventDetails.jsx";

// Component CSS Styles
import "./App.scss";

// React Routers
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./ScrollToTop.js";

// MUI Components
import { IconButton } from "@mui/joy";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

function App() {
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [displaySTT, setDisplaySTT] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 300) {
        setDisplaySTT(true);
      } else {
        setDisplaySTT(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    setIsAuthPage(
      window.location.pathname.split("/")[1] === "login" ? true : false
    );

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {!isAuthPage && <Header toAuthPage={setIsAuthPage} />}
      {displaySTT && (
        <IconButton
          variant="outlined"
          color="neutral"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 30,
            zIndex: 30,
            backgroundColor: "white",
          }}
          onClick={scrollToTop}
        >
          <KeyboardArrowUpOutlinedIcon />
        </IconButton>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login toAuthPage={setIsAuthPage} />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/eventId" element={<EventDetails />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {!isAuthPage && <Footer />}
      <ScrollToTop />
    </div>
  );
}

export default App;
