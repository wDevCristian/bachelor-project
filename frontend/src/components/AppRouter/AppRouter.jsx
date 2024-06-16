import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Events from "../../pages/Events/Events";
import EventDetails from "../../pages/EventDetails/EventDetails";
import UserEvents from "../../pages/UserEvents/UserEvents";
import EventCreate from "../../pages/EventCreate/EventCreate";
import FAQ from "../../pages/FAQ/FAQ";
import NoPageError from "../../pages/NoPageError/NoPageError";
import EventEdit from "../../pages/EventEdit/EventEdit";
import { Context } from "../../main";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetails />} />

      {user.isAuth && (
        <>
          <Route path="/myevents" element={<UserEvents />} />
          <Route path="/myevents/create" element={<EventCreate />} />
          <Route path="/myevents/edit/:eventId" element={<EventEdit />} />
        </>
      )}

      <Route path="/faq" element={<FAQ />} />
      <Route path="*" element={<NoPageError />} />
    </Routes>
  );
});

export default AppRouter;
