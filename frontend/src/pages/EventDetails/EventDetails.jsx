import { React, useContext, useEffect, useState } from "react";

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
import ImageIcon from "@mui/icons-material/Image";

import MapComponent from "../../components/MapComponent/MapComponent";
import { Close } from "@mui/icons-material";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { getEventsDetailsById } from "../../api/eventAPI";

const prototype = {
  id: null,
  title: null,
  description: null,
  maxNrOfParticipants: null,
  startDateTime: null,
  endDateTime: null,
  picture: null,
  building: null,
  addressNr: null,
  street: null,
  city: null,
  latitude: null,
  longitude: null,
  createdAt: null,
  updatedAt: null,
  organizerId: null,
  user: {
    firstname: null,
    lastname: null,
    picture: null,
  },
  type: null,
  participants: null,
};

const weekDays = [
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
  "Duminică",
];

export default function EventDetails() {
  const [snackbarParticipateOpen, setSnackbarParticipateOpen] = useState(false);
  const [snackbarSavedOpen, setSnackbarSavedOpen] = useState(false);
  const [event, setEvent] = useState(prototype);
  const { eventId } = useParams();

  useEffect(() => {
    getEventsDetailsById(eventId)
      .then((fetchedEvent) => {
        setEvent(fetchedEvent);
        // throw new Error("Test events not found.");
      })
      .catch((error) => {
        console.log(error);
        // setErrorObj({ isError: true, message: error.message });
      })
      .finally(() => console.log("finally"));
  }, []);

  const startDateObj = new Date(event.startDateTime);
  const endDateObj = new Date(event.endDateTime);

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <Typography component="h3" level="h2" sx={{}}>
        {event.title}
      </Typography>
      <Stack direction="row" marginTop={2}>
        <Avatar
          src={
            event.user.picture
              ? `${import.meta.env.VITE_SERVER_URL}/users/${event.user.picture}`
              : "#"
          }
          alt="author picture"
        >
          {!event.user.picture && event.user.firstname
            ? event.user.firstname[0].toUpperCase() +
              event.user.lastname[0].toUpperCase()
            : null}
        </Avatar>
        <Box marginLeft={2}>
          <Typography level="body-xs">Organizator</Typography>
          <Typography level="title-md">
            {event.user.firstname + " " + event.user.lastname}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} mt={2} flexWrap={true}>
        {event.type !== null &&
          event.type.map((i, index) => (
            <Chip
              key={index}
              label={i}
              size="sm"
              variant="soft"
              color="primary"
            >
              {i}
            </Chip>
          ))}
      </Stack>
      <Grid container mt={{ md: "5em", xs: "3em" }} columnSpacing={5}>
        <Grid xs={12} md={8}>
          {event.picture && (
            <AspectRatio sx={{ maxWidth: "100%", borderRadius: "md" }}>
              <img
                src={
                  import.meta.env.VITE_SERVER_URL + "/events/" + event.picture
                }
                loading="lazy"
                alt="event"
              />
            </AspectRatio>
          )}
          <Typography component="h3" level="h4" mt={3}>
            Detalii
          </Typography>
          <Typography
            level="body-md"
            mt={1}
            component="p"
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {event.description}
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
                  <Typography level="body-md">
                    {startDateObj.toLocaleTimeString().slice(0, -3)} -{" "}
                    {endDateObj.toLocaleTimeString().slice(0, -3)}
                  </Typography>
                  <Typography level="body-sm">
                    {weekDays[startDateObj.getUTCDay()]},{" "}
                    {startDateObj.toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <PlaceIcon variant="soft" fontSize="medium" color="neutral" />
                <Box>
                  <Typography level="body-md">
                    {event.addressNr === event.building
                      ? event.street + " nr. " + event.addressNr
                      : event.building}
                  </Typography>
                  <Typography level="body-sm">
                    {event.street}
                    {event.addressNr && ` nr. ${event.addressNr}`}, {event.city}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <HowToRegIcon></HowToRegIcon>
                <Box>
                  <Typography level="body-md">
                    {event.participants}
                    {event.maxNrOfParticipants &&
                      `/${event.maxNrOfParticipants}`}
                  </Typography>
                  <Typography level="body-sm">
                    {event.participants > 1 ? "participanți" : "participant"}
                  </Typography>
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
          <Typography level="title-lg">{event.title}</Typography>
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
