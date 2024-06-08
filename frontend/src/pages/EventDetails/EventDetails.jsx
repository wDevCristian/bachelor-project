import { React, useState } from "react";

// MUI lib imports
import {
  Avatar,
  Typography,
  Box,
  Stack,
  AspectRatio,
  Grid,
  Card,
  CardOverflow,
  CardContent,
  Chip,
  Button,
  IconButton,
  Snackbar,
} from "@mui/joy";

// MUI icons
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import CloseIcon from "@mui/icons-material/Close";

import MapComponent from "../../components/MapComponent/MapComponent";
import { Close } from "@mui/icons-material";

export default function EventDetails() {
  const [snackbarParticipateOpen, setSnackbarParticipateOpen] = useState(false);
  const [snackbarSavedOpen, setSnackbarSavedOpen] = useState(false);
  const hasLimit = false;

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <Typography component="h3" level="h2" sx={{}}>
        Titlul evenimentului
      </Typography>
      <Stack direction="row" marginTop={2}>
        <Avatar alt="logo">NP</Avatar>
        <Box marginLeft={2}>
          <Typography level="body-xs">Organizator</Typography>
          <Typography level="title-md">Nume Prenume</Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} mt={2}>
        {["Muzică", "Sport", "Distracție"].map((i, index) => (
          <Chip key={index} label={i} size="sm" variant="soft" color="primary">
            {i}
          </Chip>
        ))}
      </Stack>
      <Grid container mt={{ md: "5em", xs: "3em" }} columnSpacing={5}>
        <Grid xs={12} md={8}>
          <AspectRatio sx={{ maxWidth: "100%" }}>
            <img
              src="/src/assets/img/students.jpg"
              loading="lazy"
              alt="event image"
            />
          </AspectRatio>
          <Typography component="h3" level="h4" mt={3}>
            Detalii
          </Typography>
          <Typography level="body-md" mt={1}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            asperiores est ex vitae neque officia aliquam aut esse possimus
            cumque ipsum eveniet, hic id aperiam nam laborum ducimus nihil
            debitis iure voluptatibus nemo veritatis non laboriosam. Tempore
            consequatur minima eius quae officiis quod, reiciendis voluptas,
            error quos ea ipsam nisi? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Non necessitatibus vel vero quo praesentium cumque
            sunt? Perspiciatis vel iure impedit maiores explicabo dolor officiis
            dolore, tempora laboriosam, quos sunt doloribus labore corrupti cum
            sed cupiditate quia quis animi quas, id nemo! Sed hic magni laborum
            tenetur neque unde illum minus, aut sunt repellat? Necessitatibus
            dolorum nesciunt voluptates magni, repellendus nisi mollitia odio
            eius non ratione saepe, pariatur sed ducimus quisquam cupiditate
            consequuntur eveniet laudantium modi sequi aliquid! Voluptatem velit
            modi tenetur cupiditate illo suscipit eum eveniet laborum laboriosam
            saepe unde repellat, non incidunt dignissimos, vel, at et. Hic,
            laudantium ratione?
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            paddingTop: {
              xs: "2em",
              md: "0em",
            },
          }}
        >
          <Card variant="soft">
            <CardContent>
              <Stack direction="row" spacing={2}>
                <AccessTimeIcon
                  variant="soft"
                  fontSize="medium"
                  color="neutral"
                />
                <Box>
                  <Typography level="body-md">18:00 - 21:00</Typography>
                  <Typography level="body-sm">Joi, 06.06.2024</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <PlaceIcon variant="soft" fontSize="medium" color="neutral" />
                <Box>
                  <Typography level="body-md">
                    Facultatea de Automatică și Calculatoare
                  </Typography>
                  <Typography level="body-sm">
                    Bulevardul Vasile Pârvan 2, Timișoara 300223
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <HowToRegIcon></HowToRegIcon>
                <Box>
                  <Typography level="body-md">25{hasLimit && "/50"}</Typography>
                  <Typography level="body-sm">participanți</Typography>
                </Box>
              </Stack>
            </CardContent>
            <CardOverflow
              sx={{
                padding: ".5em 0 0 0",
              }}
            >
              <MapComponent />
            </CardOverflow>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          position: "sticky",
          bottom: "0",
          left: 0,
          right: 0,
          backgroundColor: "white",
          width: "100%",
          height: "80px",
          mt: 4,
          zIndex: 2,
          borderTop: "1.5px solid #F0F4F8",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          height="100%"
        >
          <Typography level="title-lg">Titlul evenimentului</Typography>
          <Stack direction="row" alignItems="center" columnGap={3}>
            <IconButton onClick={() => setSnackbarSavedOpen(true)}>
              <BookmarkAddRoundedIcon />
            </IconButton>
            <Button onClick={() => setSnackbarParticipateOpen(true)}>
              Participă
            </Button>
          </Stack>
        </Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarParticipateOpen}
          autoHideDuration={3000}
          color="primary"
          size="md"
          variant="soft"
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackbarParticipateOpen(false);
          }}
          endDecorator={
            <IconButton
              onClick={() => setSnackbarParticipateOpen(false)}
              size="md"
              variant="soft"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          }
        >
          Înscriere a avut loc cu success
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarSavedOpen}
          autoHideDuration={3000}
          color="primary"
          size="md"
          variant="soft"
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackbarSavedOpen(false);
          }}
          endDecorator={
            <IconButton
              onClick={() => setSnackbarSavedOpen(false)}
              size="md"
              variant="soft"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          }
        >
          Eveniment adăugat în salvate
        </Snackbar>
      </Box>
    </div>
  );
}

{
  /* <Grid xs={12} md={8}>
          <Typography component="h3" level="h4" mt={5}>
            Participanți
          </Typography>
          <Stack direction="row" columnGap={2} mt={2}>
            <Card
              variant="soft"
              sx={{
                width: "33%",
              }}
            >
              <CardContent
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src="../src/assets/img/about-img.jpeg"
                  sx={{ "--Avatar-size": "4.5rem" }}
                />
                <Typography level="title-md">Josephine Blanton</Typography>
                <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                  Oraganizator
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="soft"
              sx={{
                width: "33%",
              }}
            >
              <CardContent
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src="../src/assets/img/about-img.jpeg"
                  sx={{ "--Avatar-size": "4.5rem" }}
                />
                <Typography level="title-md">Lorem Ipsum</Typography>
                <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                  Participant
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="soft"
              sx={{
                width: "33%",
              }}
            >
              <CardContent
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src="../src/assets/img/about-img.jpeg"
                  sx={{ "--Avatar-size": "4.5rem" }}
                />
                <Typography level="title-md">Lorem Ipsum</Typography>
                <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                  Participant
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid> */
}
