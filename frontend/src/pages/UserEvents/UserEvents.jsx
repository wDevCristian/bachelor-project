import { React, useContext, useEffect, useState } from "react";

import EventCards from "../../components/EventCards/EventCards";

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
  Divider,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  selectClasses,
  Option,
  Textarea,
  SvgIcon,
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Chip,
  Alert,
  IconButton,
  Skeleton,
} from "@mui/joy";

import { CssVarsProvider } from "@mui/joy/styles";

import { Context } from "../../main";
import { getEventsByOrganizerId } from "../../api/eventAPI";

// MUI icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReportIcon from "@mui/icons-material/Report";

export default function UserEvents() {
  const [menuItem, setMenuItem] = useState("organizer");
  const [isLoading, setIsLoading] = useState(true);
  const [errorObj, setErrorObj] = useState({ isError: false, message: "" });
  const { events, user } = useContext(Context);

  useEffect(() => {
    getEventsByOrganizerId(user.user.id)
      .then((fetchedEvents) => {
        events.setOrganizedEvents(fetchedEvents);
        // throw new Error("Test events not found.");
      })
      .catch((error) => {
        console.log(error);
        setErrorObj({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sendObj = events.organizedEvents.map((event) => {
    return {
      ...event,
      user: {
        firstname: user.user.firstname,
        lastname: user.user.lastname,
      },
    };
  });

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <CssVarsProvider>
        <Typography level="h2">Evenimentele mele</Typography>
        <Stack
          columnGap={3}
          mt={3}
          sx={{
            flexDirection: {
              md: "row",
              sx: "column",
            },
          }}
        >
          <Box minWidth="20ch">
            <List
              aria-labelledby="nav-list-browse"
              size="sm"
              sx={{
                "& .JoyListItemButton-root": { p: "8px" },
                "--ListItem-radius": "var(--joy-radius-sm)",
                "--List-gap": "4px",
              }}
            >
              <ListItem>
                <ListItemButton
                  selected={menuItem === "participant" ? true : false}
                  onClick={() => setMenuItem("participant")}
                >
                  <ListItemDecorator>
                    <PeopleAltIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Participant</ListItemContent>
                  {isLoading && (
                    <Skeleton
                      animation={import.meta.env.VITE_SKELETON_ANIMATION_TYPE}
                      variant="circular"
                      width={20}
                      height={20}
                    />
                  )}
                  {!isLoading &&
                    false && ( // TODO: replace false and "0" with "events.participateEvents.length > 0"
                      <Chip variant="soft" color="primary" size="sm">
                        {"0"}
                      </Chip>
                    )}
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={menuItem === "organizer" ? true : false}
                  onClick={() => setMenuItem("organizer")}
                >
                  <ListItemDecorator sx={{ color: "neutral.500" }}>
                    <PersonIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Organizator</ListItemContent>
                  {isLoading && (
                    <Skeleton
                      animation={import.meta.env.VITE_SKELETON_ANIMATION_TYPE}
                      variant="circular"
                      width={20}
                      height={20}
                    />
                  )}
                  {!isLoading && events.organizedEvents.length > 0 && (
                    <Chip variant="soft" color="primary" size="sm">
                      {events.organizedEvents.length}
                    </Chip>
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={menuItem === "saved" ? true : false}
                  onClick={() => setMenuItem("saved")}
                >
                  <ListItemDecorator sx={{ color: "neutral.500" }}>
                    <BookmarkAddRoundedIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Marcate</ListItemContent>
                  {isLoading && (
                    <Skeleton
                      animation={import.meta.env.VITE_SKELETON_ANIMATION_TYPE}
                      variant="circular"
                      width={20}
                      height={20}
                    />
                  )}
                  {!isLoading &&
                    false && ( // TODO: replace false and {0} with "events.savedEvents.length > 0"
                      <Chip variant="soft" color="primary" size="sm">
                        {0}
                      </Chip>
                    )}
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box width="100%">
            {!errorObj.isError && menuItem === "saved" && (
              <EventCards
                maxItemsInRow={3}
                isBookmarkIcon={false}
                isEditIcon={false}
                isLoading={isLoading}
              ></EventCards>
            )}
            {!errorObj.isError && menuItem === "participant" && (
              <EventCards
                maxItemsInRow={3}
                isBookmarkIcon={false}
                isEditIcon={false}
                isLoading={isLoading}
              ></EventCards>
            )}
            {!errorObj.isError && menuItem === "organizer" && (
              <EventCards
                eventsObject={sendObj}
                maxItemsInRow={3}
                isBookmarkIcon={false}
                isEditIcon={true}
                isLoading={isLoading}
              ></EventCards>
            )}
            {errorObj.isError && (
              <Alert
                startDecorator={<ReportIcon />}
                variant="soft"
                color="danger"
                endDecorator={
                  <IconButton
                    variant="soft"
                    color="danger"
                    onClick={() => setErrorObj({ isError: false, message: "" })}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                }
              >
                <div>
                  <div>Error</div>
                  <Typography level="body-sm" color="danger">
                    {errorObj.message}
                  </Typography>
                </div>
              </Alert>
            )}
          </Box>
        </Stack>
      </CssVarsProvider>
    </div>
  );
}
