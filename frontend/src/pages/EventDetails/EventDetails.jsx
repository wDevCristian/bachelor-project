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
  createAttendee,
  createSavedEvent,
  deleteAttendee,
  deleteSavedEvent,
  getAllAttendees,
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
const participantEventAddMessage = "Ai devenit participant la acest eveniment.";
const participantEventRemoveMessage = "Te-ai retras de la acest eveniment.";

const EventDetails = observer(() => {
  const [snackbarParticipateOpen, setSnackbarParticipateOpen] = useState({
    isOpened: false,
    message: "",
  });
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
  const { user, events, menuItemActive } = useContext(Context);
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

  useEffect(() => {
    if (user?.user?.id && events.participantEventsHasChanged) {
      getAllAttendees(user.user.id)
        .then((fetchedEvents) => {
          events.setParticipantEvents(fetchedEvents);
          console.log("Fetching participant events...");
          // throw new Error("Test events not found.");
        })
        .catch((error) => {
          console.log(error);
          // setErrorObj({ isError: true, message: error.message });
        })
        .finally(() => {
          events.setParticipantEventsHasChaged(false);
          setIsLoading(false);
        });
    }
  }, [events.participantEventsHasChanged]);

  const startDateObj = new Date(event.startDateTime);
  const endDateObj = new Date(event.endDateTime);

  async function saveEventHandler() {
    if (!eventIsInSaved) {
      const result = await createSavedEvent(user.user.id, event.id);
      console.log("Event saved has been created in DB.");
      events.setSavedEventsHasChaged(true);
      console.log("Event saved has changed = true");
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

  async function participateEventHandler() {
    if (!eventIsInParticipate) {
      const result = await createAttendee(user.user.id, event.id);
      console.log("Event participant has been created in DB.");
      events.setParticipantEventsHasChaged(true);
      console.log("Event participant has changed = true");
      if (result.isCreated === true)
        setSnackbarParticipateOpen({
          isOpened: true,
          message: participantEventAddMessage,
        });
    } else {
      const result = await deleteAttendee(user.user.id, event.id);
      console.log("Event has been removed from participantEvents.");
      events.setParticipantEventsHasChaged(true);
      console.log("Event participant has changed = true");
      if (result.isDeleted === true)
        setSnackbarParticipateOpen({
          isOpened: true,
          message: participantEventRemoveMessage,
        });
    }
  }

  const eventIsInSaved = events.savedEvents.map((i) => i.id).includes(event.id);
  const eventIsInParticipate = events.participantEvents
    .map((i) => i.id)
    .includes(event.id);

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
                <MapComponent
                  latitude={event.latitude}
                  longitude={event.longitude}
                />
              </CardOverflow>
            </Skeleton>
          </Card>
          <Box mt={2}>
            <a
              href={`https://www.google.com/maps/dir//${event.latitude},${event.longitude}/@${event.latitude},${event.longitude},17z?hl=ro&entry=ttu`}
              target="_blank"
            >
              <Button
                size="md"
                variant="plain"
                sx={{ width: "100%", columnGap: 2 }}
              >
                Deschide cu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  height="16px"
                  viewBox="0 0 264.6 50.86"
                >
                  <path
                    d="M9.835 37.67a51.38 51.38 0 0 1 4.007 5.91c1.022 1.938 1.448 3.252 2.195 5.587.458 1.29.872 1.675 1.762 1.675.97 0 1.41-.655 1.75-1.668.706-2.205 1.26-3.888 2.134-5.478 1.715-3.07 3.846-5.798 5.94-8.42.567-.742 4.232-5.065 5.882-8.476 0 0 2.028-3.747 2.028-8.98 0-4.895-2-8.29-2-8.29l-5.758 1.542-3.497 9.21-.865 1.27-.173.23-.23.288-.404.46-.577.577-3.114 2.537-7.785 4.495z"
                    fill="#34a853"
                  />
                  <path
                    d="M1.8 26.17c1.9 4.34 5.564 8.155 8.043 11.503L23.01 22.076s-1.855 2.426-5.22 2.426c-3.748 0-6.776-2.993-6.776-6.767 0-2.588 1.557-4.366 1.557-4.366l-8.938 2.395z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M23.157.792c4.373 1.41 8.116 4.37 10.38 8.735l-10.523 12.54s1.557-1.81 1.557-4.382c0-3.862-3.252-6.747-6.765-6.747-3.322 0-5.23 2.422-5.23 2.422v-7.9z"
                    fill="#4285f4"
                  />
                  <path
                    d="M4.212 6.333C6.824 3.208 11.42-.01 17.756-.01c3.074 0 5.39.807 5.39.807l-10.58 12.57H5.07z"
                    fill="#1a73e8"
                  />
                  <path
                    d="M1.8 26.17S.052 22.747.052 17.788c0-4.687 1.822-8.784 4.16-11.455l8.36 7.035z"
                    fill="#ea4335"
                  />
                  <g fill="#767676">
                    <path d="M181.68 41.235V14.508h3.434l9.295 16.275h.15l9.295-16.275h3.434v26.727h-3.434V25.37l.15-4.48h-.15l-8.36 14.67h-2.015l-8.36-14.67h-.15l.15 4.48v15.864zm35.648.56c-1.94 0-3.565-.56-4.87-1.68s-1.96-2.6-1.96-4.442c0-2 .77-3.552 2.314-4.685s3.446-1.698 5.7-1.698c2.016 0 3.67.373 4.965 1.12v-.523c0-1.344-.46-2.42-1.38-3.228s-2.053-1.213-3.398-1.213c-.995 0-1.896.236-2.705.7s-1.362 1.12-1.66 1.94l-3.136-1.343c.423-1.095 1.257-2.1 2.5-3.042s2.886-1.4 4.927-1.4c2.34 0 4.28.685 5.823 2.053s2.314 3.298 2.314 5.787V41.2h-3.284v-2.54h-.15c-1.37 2.1-3.373 3.135-6 3.135zm.56-3.135c1.418 0 2.705-.53 3.863-1.586s1.736-2.3 1.736-3.75c-.97-.797-2.426-1.195-4.367-1.195-1.668 0-2.925.36-3.77 1.083s-1.27 1.568-1.27 2.538c0 .896.386 1.605 1.157 2.128s1.655.784 2.65.784zm21.742 3.135c-1.393 0-2.644-.3-3.75-.896s-1.935-1.344-2.48-2.24h-.15l.15 2.538v8.063h-3.434V22.908h3.286v2.538h.15c.547-.896 1.374-1.642 2.48-2.24s2.358-.896 3.75-.896c2.364 0 4.405.933 6.122 2.8s2.576 4.18 2.576 6.943-.86 5.077-2.576 6.943-3.758 2.8-6.122 2.8zm-.56-3.135c1.593 0 2.96-.604 4.106-1.8s1.717-2.806 1.717-4.797-.572-3.6-1.717-4.797-2.514-1.8-4.106-1.8c-1.617 0-2.993.597-4.125 1.792s-1.697 2.8-1.697 4.815.566 3.62 1.697 4.815 2.507 1.792 4.125 1.792zm18.385 3.135c-2.04 0-3.726-.498-5.058-1.493s-2.3-2.24-2.93-3.733l3.06-1.27c.97 2.3 2.626 3.433 4.966 3.433 1.07 0 1.948-.236 2.632-.7s1.027-1.095 1.027-1.866c0-1.194-.834-2.004-2.502-2.426l-3.695-.895c-1.17-.298-2.277-.865-3.322-1.698s-1.568-1.96-1.568-3.377c0-1.617.715-2.93 2.146-3.94s3.13-1.512 5.095-1.512c1.617 0 3.06.367 4.33 1.1a6.21 6.21 0 0 1 2.725 3.154l-2.987 1.232c-.67-1.617-2.065-2.426-4.18-2.426-1.02 0-1.88.212-2.575.634s-1.045.996-1.045 1.718c0 1.045.8 1.754 2.426 2.128l3.62.858c1.717.398 2.986 1.083 3.807 2.053s1.232 2.066 1.232 3.286c0 1.642-.672 3-2.016 4.106s-3.073 1.642-5.2 1.642zM79.916 25.3H65.83v4.18h10c-.493 5.86-5.37 8.36-9.973 8.36a10.98 10.98 0 0 1-11.029-11.128c0-6.327 4.898-11.2 11.04-11.2 4.74 0 7.53 3.022 7.53 3.022l2.927-3.03s-3.757-4.18-10.607-4.18c-8.723 0-15.473 7.363-15.473 15.316 0 7.792 6.35 15.393 15.696 15.393 8.22 0 14.24-5.632 14.24-13.96 0-1.756-.255-2.772-.255-2.772z" />
                    <use xlinkHref="#B" />
                    <use xlinkHref="#B" x="21.476" />
                    <path d="M134.102 22.327c-5.305 0-9.476 4.647-9.476 9.862 0 5.94 4.834 9.88 9.383 9.88 2.813 0 4.308-1.117 5.414-2.4v1.946c0 3.405-2.068 5.445-5.2 5.445-3.015 0-4.526-2.242-5.052-3.514l-3.793 1.586c1.346 2.845 4.054 5.813 8.878 5.813 5.275 0 9.296-3.322 9.296-10.3v-17.73h-4.138v1.672c-1.272-1.37-3.012-2.265-5.32-2.265zm.384 3.87c2.602 0 5.272 2.22 5.272 6.013 0 3.856-2.665 5.98-5.33 5.98-2.828 0-5.46-2.296-5.46-5.944 0-3.8 2.732-6.05 5.518-6.05zm27.534-3.87c-5.004 0-9.207 3.98-9.207 9.857 0 6.216 4.683 9.904 9.687 9.904 4.176 0 6.74-2.285 8.268-4.332l-3.4-2.27c-.885 1.374-2.366 2.718-4.835 2.718-2.775 0-4.05-1.52-4.84-2.992l13.234-5.5-.687-1.6c-1.28-3.152-4.262-5.784-8.2-5.784zm.172 3.796c1.804 0 3.1.96 3.653 2.108l-8.838 3.694c-.38-2.86 2.328-5.802 5.186-5.802zm-15.7 15.377h4.346V12.4h-4.346z" />
                  </g>
                  <defs>
                    <path
                      id="B"
                      d="M91.48 22.327c-5.78 0-9.922 4.518-9.922 9.788 0 5.348 4.018 9.95 10 9.95 5.407 0 9.836-4.132 9.836-9.836 0-6.537-5.153-9.904-9.904-9.904zm.057 3.877c2.843 0 5.536 2.298 5.536 6 0 3.624-2.683 5.99-5.55 5.99-3.15 0-5.635-2.523-5.635-6.017 0-3.418 2.455-5.972 5.648-5.972z"
                    />
                  </defs>
                </svg>
              </Button>
            </a>
          </Box>
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
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => menuItemActive.setActiveItem("myevents")}
                  >
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
                  <Button
                    onClick={participateEventHandler}
                    variant={eventIsInParticipate ? "soft" : "solid"}
                  >
                    {eventIsInParticipate ? "Mă retrag" : "Participă"}
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackbarParticipateOpen.isOpened}
            autoHideDuration={3000}
            color="primary"
            size="md"
            variant="soft"
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setSnackbarParticipateOpen({
                isOpened: false,
                message: snackbarParticipateOpen.message,
              });
            }}
            endDecorator={
              <IconButton
                onClick={() =>
                  setSnackbarParticipateOpen({
                    isOpened: false,
                    message: snackbarParticipateOpen.message,
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
            {snackbarParticipateOpen.message}
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
