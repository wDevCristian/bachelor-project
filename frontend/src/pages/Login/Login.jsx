import React from "react";

import {
  Button,
  CssVarsProvider,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";

import { Link } from "react-router-dom";

export default function Login() {
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
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="Email"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Parolă</FormLabel>
          <Input name="password" type="password" placeholder="Parolă"></Input>
        </FormControl>
        <Button component={Link} to="/" sx={{ mt: 1 }} variant="soft">
          Login
        </Button>
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
