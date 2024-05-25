import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import "../Logo/Logo";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Logo from "../Logo/Logo";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import Avatar from "@mui/joy/Avatar";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ModalClose from "@mui/joy/ModalClose";
import Drawer from "@mui/joy/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import IconButton from "@mui/joy/IconButton";
import DialogTitle from "@mui/joy/DialogTitle";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import { ListItemDecorator, ListItemContent, Divider, Chip } from "@mui/joy";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

export default function Navbar({ toAuthPage, menuItem, setMenuItem }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    if (path.length === 0) setMenuItem("home");
    else {
      setMenuItem(path);
    }
  }, []);

  return (
    <nav className="navbar">
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Button
          variant="plain"
          color="neutral"
          component={Link}
          to="/login"
          size="sm"
          aria-pressed={false}
          sx={{ alignSelf: "center" }}
          onClick={() => {
            toAuthPage(true);
          }}
        >
          Login
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component={Link}
          to="/"
          size="sm"
          aria-pressed={menuItem === "home" ? "true" : "false"}
          sx={{ alignSelf: "center" }}
          onClick={() => {
            setMenuItem("home");
          }}
        >
          Acasă
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component={Link}
          to="/events"
          size="sm"
          aria-pressed={menuItem === "events" ? "true" : "false"}
          sx={{ alignSelf: "center" }}
          onClick={() => {
            setMenuItem("events");
          }}
        >
          Evenimente
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component={Link}
          to="/faq"
          size="sm"
          aria-pressed={menuItem === "faq" ? "true" : "false"}
          sx={{ alignSelf: "center" }}
          onClick={() => {
            setMenuItem("faq");
          }}
        >
          FAQ
        </Button>
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Prenume Nume
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    prenume_nume@email.com
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Stack>

      <Box
        sx={{
          display: { xs: "inline-flex", sm: "none" },
          pl: 6,
        }}
      >
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          anchor="right"
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>ADAPTM</DialogTitle>
          <List
            size="sm"
            sx={{
              "--ListItem-radius": "8px",
              "--List-gap": "4px",
              "& .JoyListItemButton-root": { p: "8px" },
              mx: 0.5,
            }}
          >
            <Divider>
              <Chip size="sm">Menu</Chip>
            </Divider>
            <ListItemButton
              selected={menuItem === "home" ? true : false}
              component={Link}
              to="/"
              onClick={() => {
                setMenuItem("home");
                setOpen(false);
              }}
            >
              <ListItemDecorator>
                <HomeRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent fontSize="sm">Acasă</ListItemContent>
            </ListItemButton>
            <ListItemButton
              selected={menuItem === "events" ? true : false}
              component={Link}
              to="/events"
              onClick={() => {
                setMenuItem("events");
                setOpen(false);
              }}
            >
              <ListItemDecorator>
                <EventRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent fontSize="sm">Evenimente</ListItemContent>
            </ListItemButton>
            <ListItemButton
              selected={menuItem === "faq" ? true : false}
              component={Link}
              to="/faq"
              onClick={() => {
                setMenuItem("faq");
                setOpen(false);
              }}
            >
              <ListItemDecorator>
                <QuizRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent fontSize="sm">FAQ</ListItemContent>
            </ListItemButton>
          </List>
        </Drawer>
      </Box>
    </nav>
  );
}
