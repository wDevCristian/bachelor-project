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
  Tooltip,
  Modal,
  ModalDialog,
  Skeleton,
} from "@mui/joy";

// MUI icons
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemove from "@mui/icons-material/BookmarkRemove";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

import MapComponent from "../../components/MapComponent/MapComponent";
import { Context } from "../../main";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createSavedEvent,
  deleteSavedEvent,
  getEventsDetailsById,
  getSavedEventsByUserId,
} from "../../api/eventAPI";
import { observer } from "mobx-react-lite";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

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
  "Duminică",
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
];

const modalTitleSave = "Dorești să salvezi evenimentul?";
const modalMessageSave = "Pentru a salva evenimentul, trebuie să te logezi.";
const modalTitleParticipate = "Dorești să participi la eveniment?";
const modalMessageParticipate =
  "Pentru a participa la eveniment, trebuie să te logezi.";

const savedEventAddMessage = "Evenimentul a fost adăugat în salvate.";
const savedEventRemoveMessage = "Evenimentul a fost șters din salvate.";

const EventDetails = observer(() => {
  const [snackbarParticipateOpen, setSnackbarParticipateOpen] = useState(false);
  const [snackbarSavedOpen, setSnackbarSavedOpen] = useState({
    isOpened: false,
    message: "",
  });
  const [event, setEvent] = useState(prototype);
  const [openModal, setOpenModal] = useState({
    state: false,
    title: modalTitleSave,
    message: modalMessageSave,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user, events } = useContext(Context);
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    getEventsDetailsById(eventId)
      .then((fetchedEvent) => {
        setEvent(fetchedEvent);
        console.log("Fetching event details events...");
        // throw new Error("Test events not found.");
      })
      .catch((error) => {
        console.log(error);
        // setErrorObj({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user?.user?.id && events.savedEventsHasChanged) {
      getSavedEventsByUserId(user.user.id)
        .then((fetchedEvents) => {
          events.setSavedEvents(fetchedEvents);
          console.log("Fetching saved events...");
          // throw new Error("Test events not found.");
        })
        .catch((error) => {
          console.log(error);
          // setErrorObj({ isError: true, message: error.message });
        })
        .finally(() => {
          events.setSavedEventsHasChaged(false);
          setIsLoading(false);
        });
    }
  }, [events.savedEventsHasChanged]);

  const startDateObj = new Date(event.startDateTime);
  const endDateObj = new Date(event.endDateTime);

  async function saveEventHandler() {
    if (!eventIsInSaved) {
      const result = await createSavedEvent(user.user.id, event.id);
      console.log("Event has been created in DB.");
      events.setSavedEventsHasChaged(true);
      console.log("Event has changed = true");
      if (result.isCreated === true)
        setSnackbarSavedOpen({ isOpened: true, message: savedEventAddMessage });
    } else {
      const result = await deleteSavedEvent(user.user.id, event.id);
      console.log("Event has been removed from savedEvents.");
      events.setSavedEventsHasChaged(true);
      console.log("Event has changed = true");
      if (result.isDeleted === true)
        setSnackbarSavedOpen({
          isOpened: true,
          message: savedEventRemoveMessage,
        });
    }
  }

  const eventIsInSaved = events.savedEvents.map((i) => i.id).includes(event.id);
  console.log(events.savedEvents);
  console.log(event.id);
  console.log(eventIsInSaved);

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <Typography component="h3" level="h2" sx={{}}>
        <Skeleton loading={isLoading}>
          {event.title ? event.title : "#".repeat(80)}
        </Skeleton>
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
          <Skeleton loading={isLoading}>
            {!event.user.picture && event.user.firstname
              ? event.user.firstname[0].toUpperCase() +
                event.user.lastname[0].toUpperCase()
              : null}
          </Skeleton>
        </Avatar>
        <Box marginLeft={2}>
          <Typography level="body-xs">Organizator</Typography>
          <Typography level="title-md">
            <Skeleton loading={isLoading}>
              {!event.user.firstname && "#".repeat(50)}
              {event.user.firstname + " " + event.user.lastname}
            </Skeleton>
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
        {event.type === null && (
          <Skeleton loading={isLoading} width="200px" height=".85em"></Skeleton>
        )}
      </Stack>
      <Grid container mt={{ md: "5em", xs: "3em" }} columnSpacing={5}>
        <Grid xs={12} md={8}>
          {event.picture && (
            <AspectRatio sx={{ maxWidth: "100%", borderRadius: "md" }}>
              <Skeleton loading={isLoading} variant="overlay">
                <img
                  src={
                    isLoading
                      ? "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      : import.meta.env.VITE_SERVER_URL +
                        "/events/" +
                        event.picture
                  }
                  loading="lazy"
                  alt="event"
                />
              </Skeleton>
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
            <Skeleton
              loading={isLoading}
              variant="rectangular"
              width="310px"
              height="5em"
            >
              {event.description}
            </Skeleton>
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
            <Skeleton loading={isLoading} variant="text">
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
                      {weekDays[startDateObj.getDay()]},{" "}
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
                      {event.addressNr && ` nr. ${event.addressNr}`},{" "}
                      {event.city}
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
            </Skeleton>
          </Card>
        </Grid>
      </Grid>

      {!isLoading && (
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
            <Typography level="title-lg">
              <Skeleton loading={isLoading}>
                {event.title ? event.title : "#".repeat(30)}
              </Skeleton>
            </Typography>
            <Stack direction="row" alignItems="center" columnGap={3}>
              {!user.isAuth && (
                <>
                  <Tooltip
                    arrow={false}
                    color="neutral"
                    placement="top"
                    variant="solid"
                    title="Salvează evenimentul"
                    onClick={() =>
                      setOpenModal({
                        state: true,
                        title: modalTitleSave,
                        message: modalMessageSave,
                      })
                    }
                  >
                    <IconButton>
                      <BookmarkAddOutlinedIcon fontSize="md" />
                    </IconButton>
                  </Tooltip>
                  <Button
                    onClick={() =>
                      setOpenModal({
                        state: true,
                        title: modalTitleParticipate,
                        message: modalMessageParticipate,
                      })
                    }
                  >
                    Participă
                  </Button>
                </>
              )}
              {user.isAuth && user?.user?.id === event?.user?.id && (
                <Link to={`/myevents/edit/${eventId}`}>
                  <Button variant="outlined" color="primary">
                    Modifică
                  </Button>
                </Link>
              )}
              {user.isAuth && user?.user?.id !== event?.user?.id && (
                <>
                  <Tooltip
                    arrow={false}
                    color="neutral"
                    placement="top"
                    variant="solid"
                    title={
                      eventIsInSaved
                        ? "Elimină din salvate"
                        : "Salvează evenimentul"
                    }
                  >
                    <IconButton onClick={saveEventHandler}>
                      {eventIsInSaved ? (
                        <BookmarkRemove fontSize="md" />
                      ) : (
                        <BookmarkAddOutlinedIcon fontSize="md" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Button onClick={() => setSnackbarParticipateOpen(true)}>
                    Participă
                  </Button>
                </>
              )}
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
            open={snackbarSavedOpen.isOpened}
            autoHideDuration={3000}
            color="primary"
            size="md"
            variant="soft"
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setSnackbarSavedOpen({
                isOpened: false,
                message: snackbarSavedOpen.message,
              });
            }}
            endDecorator={
              <IconButton
                onClick={() =>
                  setSnackbarSavedOpen({
                    isOpened: false,
                    message: snackbarSavedOpen.message,
                  })
                }
                size="md"
                variant="soft"
                color="primary"
              >
                <CloseIcon />
              </IconButton>
            }
          >
            {snackbarSavedOpen.message}
          </Snackbar>
          <Modal
            keepMounted
            open={openModal.state}
            onClose={() => setOpenModal({ ...openModal, state: false })}
          >
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
                {openModal.title}
              </Typography>
              <Typography
                id="nested-modal-description"
                textColor="text.tertiary"
              >
                {openModal.message}
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
                    navigate("/login");
                    setOpenModal({ ...openModal, state: false });
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setOpenModal({ ...openModal, state: false })}
                >
                  Anulează
                </Button>
              </Box>
            </ModalDialog>
          </Modal>
        </Box>
      )}
    </div>
  );
});

export default EventDetails;
