import React, { useContext, useState } from "react";

import {
  Button,
  CssVarsProvider,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Stack,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { register } from "../../api/userAPI";

export default function Register() {
  const { user, menuItemActive } = useContext(Context);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function registrationHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await register(firstname, lastname, email, password);
    setIsLoading(false);
    console.log(response);
    menuItemActive.setActiveItem("home");
    user.setUser(response);
    user.setIsAuth(true);
    navigate("/");
  }

  return (
    <CssVarsProvider>
      <Sheet
        variant="outlined"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "min(400px, 90vw)",
          mx: "auto",
          transform: "translate(-50%, -50%)",
          px: 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div>
          <Typography component="h1" level="h4">
            Salut!
          </Typography>
        </div>
        <form
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
          onSubmit={registrationHandler}
        >
          <FormControl required>
            <FormLabel>Prenume</FormLabel>
            <Input
              required
              name="firstname"
              type="text"
              placeholder="Prenume"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required>
            <FormLabel>Nume</FormLabel>
            <Input
              required
              name="lastname"
              type="text"
              placeholder="Nume"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              required
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl required>
            <FormLabel>Parolă</FormLabel>
            <Input
              required
              name="password"
              type="password"
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <Button
            type="submit"
            sx={{ width: "100%" }}
            variant="soft"
            loading={isLoading}
            loadingPosition="start"
            // disabled={
            //   password.length === 0 ||
            //   email.length === 0 ||
            //   firstname.length === 0 ||
            //   lastname.length === 0
            //     ? true
            //     : false
            // }
          >
            {isLoading ? "Înregistrează..." : "Înregistrează"}
          </Button>
        </form>
        {/* </form> */}
        <Typography
          sx={{ alignSelf: "center" }}
          fontSize="xs"
          endDecorator={<Link to="/login">Login</Link>}
        >
          Ai cont?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
