import React, { useContext, useState } from "react";

import {
  Button,
  CssVarsProvider,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { login } from "../../api/userAPI";
import axios from "axios";

export default function Login() {
  const { user, menuItemActive } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await login(email, password);
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
          width: 300,
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
          <Typography level="body-sm">Logează-te pentru a continua.</Typography>
        </div>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></Input>
          </FormControl>
          <FormControl required>
            <FormLabel>Parolă</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Parolă"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </FormControl>
          <Button
            loading={isLoading}
            loadingPosition="start"
            type="submit"
            sx={{ mt: 1 }}
            variant="soft"
          >
            {isLoading ? "Login..." : "Login"}
          </Button>
        </form>
        <Typography
          sx={{ alignSelf: "center" }}
          fontSize="xs"
          endDecorator={<Link to="/register">Înregistrează-te</Link>}
        >
          Nu ai cont?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
