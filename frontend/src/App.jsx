import { useState } from "react";

// React Components
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Component CSS Styles
import "./App.scss";

// React Routers
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// MUI Components
import ScrollButton from "./components/ScrollButton/ScrollButton.jsx";
import AppRouter from "./components/AppRouter/AppRouter.jsx";

function App() {
  const [displaySTT, setDisplaySTT] = useState(false);
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 300) {
        setDisplaySTT(true);
      } else {
        setDisplaySTT(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <AppRouter />
      {displaySTT && <ScrollButton />}
      <Footer />
    </div>
  );
}

export default App;
