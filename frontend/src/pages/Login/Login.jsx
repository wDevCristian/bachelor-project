import React, { useContext, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  CssVarsProvider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Typography,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { login } from "../../api/userAPI";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReportIcon from "@mui/icons-material/Report";

export default function Login() {
  const { user, menuItemActive, events } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMsg: "" });
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await login(email, password);
      setIsLoading(false);
      menuItemActive.setActiveItem("home");
      user.setUser(response);
      user.setIsAuth(true);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError({
        isError: true,
        errorMsg:
          error.response?.data?.message ?? "Network connection problems",
      });
    }
  }

  return (
    <CssVarsProvider>
      <Box>
        <Sheet
          variant="outlined"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 400,
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
            <Typography level="body-sm">
              Logează-te pentru a continua.
            </Typography>
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
              onClick={() => {
                events.setSavedEventsHasChaged(true);
                events.setOrganizedEventsHasChanged(true);
              }}
            >
              {isLoading ? "Login..." : "Login"}
            </Button>
          </form>
          {error.isError && (
            <Alert
              startDecorator={<ReportIcon />}
              variant="soft"
              color="danger"
              endDecorator={
                <IconButton
                  variant="soft"
                  color="danger"
                  onClick={() => setError({ isError: false, errorMsg: "" })}
                >
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <div>
                <div>Error</div>
                <Typography level="body-sm" color="danger">
                  {error.errorMsg}
                </Typography>
              </div>
            </Alert>
          )}
          <Typography
            sx={{ alignSelf: "center" }}
            fontSize="xs"
            endDecorator={<Link to="/register">Înregistrează-te</Link>}
          >
            Nu ai cont?
          </Typography>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}
