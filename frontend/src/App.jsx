import { useContext, useState } from "react";

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
import { check } from "./api/userAPI.js";
import { Context } from "./main.jsx";
import { observer } from "mobx-react-lite";
import LinearProgress from "@mui/joy/LinearProgress";

const App = observer(() => {
  const [displaySTT, setDisplaySTT] = useState(false);
  const { pathname } = useLocation();
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    } else {
      user.setIsAuth(false);
      user.setUser(null);
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    return (
      <LinearProgress determinate={false} size="lg" value={25} variant="soft" />
    );
  }

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
});

export default App;
