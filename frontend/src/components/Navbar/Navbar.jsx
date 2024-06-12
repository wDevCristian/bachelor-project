import React, { useState, useEffect, useContext } from "react";
import "./Navbar.scss";
import "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
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
import {
  ListItemDecorator,
  ListItemContent,
  Divider,
  Chip,
  Modal,
  ModalDialog,
} from "@mui/joy";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();
  const { user, menuItemActive } = useContext(Context);

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    if (path.length === 0) menuItemActive.setActiveItem("home");
    else {
      menuItemActive.setActiveItem(path);
    }
  }, []);

  return (
    <nav className="navbar">
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={1}
      >
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
            to="/"
            size="sm"
            aria-pressed={
              menuItemActive.activeItem === "home" ? "true" : "false"
            }
            sx={{ alignSelf: "center" }}
            onClick={() => {
              menuItemActive.setActiveItem("home");
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
            aria-pressed={
              menuItemActive.activeItem === "events" ? "true" : "false"
            }
            sx={{ alignSelf: "center" }}
            onClick={() => {
              menuItemActive.setActiveItem("events");
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
            aria-pressed={
              menuItemActive.activeItem === "faq" ? "true" : "false"
            }
            sx={{ alignSelf: "center" }}
            onClick={() => {
              menuItemActive.setActiveItem("faq");
            }}
          >
            FAQ
          </Button>
          {!user.isAuth && (
            <Button
              variant="plain"
              color="neutral"
              component={Link}
              to="/login"
              size="sm"
              aria-pressed={
                menuItemActive.activeItem === "login" ? "true" : "false"
              }
              sx={{ alignSelf: "center" }}
              onClick={() => {
                menuItemActive.setActiveItem("login");
              }}
            >
              Login
            </Button>
          )}
        </Stack>

        {user.isAuth && (
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
                src={`${import.meta.env.VITE_SERVER_URL}/users/${
                  user.user.picture
                }`}
                sx={{ maxWidth: "32px", maxHeight: "32px" }}
                alt="logo"
              >
                {user.user.firstname[0].toUpperCase() +
                  user.user.lastname[0].toUpperCase()}
              </Avatar>
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
              <MenuItem disabled>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ borderRadius: "50%" }}
                    src={
                      user.user.picture
                        ? `${import.meta.env.VITE_SERVER_URL}/users/${
                            user.user.picture
                          }`
                        : "#"
                    }
                    alt="logo"
                  >
                    {user.user.firstname[0].toUpperCase() +
                      user.user.lastname[0].toUpperCase()}
                  </Avatar>
                  <Box sx={{ ml: 1.5 }}>
                    <Typography level="title-sm" textColor="text.primary">
                      {`${user.user.firstname} ${user.user.lastname}`}
                    </Typography>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {user.user.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <ListDivider />
              <MenuItem component={Link} to="/myevents">
                <EventRoundedIcon />
                Evenimentele mele
              </MenuItem>
              <MenuItem component={Link} to="/myevents/create">
                <AddIcon />
                Crează eveniment
              </MenuItem>
              <ListDivider />
              <MenuItem
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <LogoutRoundedIcon />
                Ieșire
              </MenuItem>
            </Menu>
          </Dropdown>
        )}
        <Box
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            // pl: 6,
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
                selected={menuItemActive.activeItem === "home" ? true : false}
                component={Link}
                to="/"
                onClick={() => {
                  menuItemActive.setActiveItem("home");
                  setOpen(false);
                }}
              >
                <ListItemDecorator>
                  <HomeRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent fontSize="sm">Acasă</ListItemContent>
              </ListItemButton>
              <ListItemButton
                selected={menuItemActive.activeItem === "events" ? true : false}
                component={Link}
                to="/events"
                onClick={() => {
                  menuItemActive.setActiveItem("events");
                  setOpen(false);
                }}
              >
                <ListItemDecorator>
                  <EventRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent fontSize="sm">Evenimente</ListItemContent>
              </ListItemButton>
              <ListItemButton
                selected={menuItemActive.activeItem === "faq" ? true : false}
                component={Link}
                to="/faq"
                onClick={() => {
                  menuItemActive.setActiveItem("faq");
                  setOpen(false);
                }}
              >
                <ListItemDecorator>
                  <QuizRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent fontSize="sm">FAQ</ListItemContent>
              </ListItemButton>
              {!user.isAuth && (
                <ListItemButton
                  selected={
                    menuItemActive.activeItem === "login" ? true : false
                  }
                  component={Link}
                  to="/login"
                  onClick={() => {
                    menuItemActive.setActiveItem("login");
                    setOpen(false);
                  }}
                >
                  <ListItemDecorator>
                    <LoginIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent fontSize="sm">Login</ListItemContent>
                </ListItemButton>
              )}
            </List>
          </Drawer>
        </Box>
      </Stack>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Sigur dorești să ieși?
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                user.setIsAuth(false);
                navigate("/");
                setOpenModal(false);
              }}
            >
              Confirmă
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpenModal(false)}
            >
              Anulează
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </nav>
  );
});

export default Navbar;
