import { useState } from "react";

// React Components
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home";
import FAQ from "./pages/FAQ/FAQ";
import Events from "./pages/Events/Events.jsx";
import Login from "./pages/Login/Login.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EventDetails from "./pages/EventDetails/EventDetails.jsx";
import EventCreate from "./pages/EventCreate/EventCreate.jsx";
import UserEvents from "./pages/UserEvents/UserEvents.jsx";
import NoPageError from "./pages/NoPageError/NoPageError.jsx";
import Register from "./pages/Register/Register.jsx";

// Component CSS Styles
import "./App.scss";

// React Routers
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// MUI Components
import ScrollButton from "./components/ScrollButton/ScrollButton.jsx";

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
      {displaySTT && <ScrollButton />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/eventId" element={<EventDetails />} />
        {/* <RequireAuth> */}
        <Route path="/myevents" element={<UserEvents />} />
        {/* </RequireAuth> */}
        {/* <RequireAuth> */}
        <Route path="/myevents/create" element={<EventCreate />} />
        {/* </RequireAuth> */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NoPageError />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

// function RequireAuth({ children }) {
//   let auth = useAuth();
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }
