import React from "react";

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

import { Link } from "react-router-dom";

export default function Register() {
  return (
    <CssVarsProvider>
      <Sheet
        variant="outlined"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "min(500, 90vw)",
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
        <FormControl>
          <FormLabel>Prenume</FormLabel>
          <Input name="firstname" type="text" placeholder="Prenume"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Nume</FormLabel>
          <Input name="lastname" type="text" placeholder="Nume"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="Email"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Parolă</FormLabel>
          <Input name="password" type="password" placeholder="Parolă"></Input>
        </FormControl>
        <Button component={Link} to="/" sx={{ mt: 1 }} variant="soft">
          Înregistrează
        </Button>
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
