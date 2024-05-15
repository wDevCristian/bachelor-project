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

export default function Login({ toAuthPage }) {
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
            Welcome!
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="Email"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="Password"></Input>
        </FormControl>
        <Button
          onClick={() => toAuthPage(false)}
          component={Link}
          to="/"
          sx={{ mt: 1 }}
          variant="soft"
        >
          Login
        </Button>
        <Typography
          sx={{ alignSelf: "center" }}
          fontSize="xs"
          endDecorator={
            <Link onClick={() => toAuthPage(false)} to="/">
              Sign Up
            </Link>
          }
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
