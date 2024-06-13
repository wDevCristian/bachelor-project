import React from "react";

// React Router import
import { Link } from "react-router-dom";

// MUI framework import
import {
  Card,
  CardContent,
  Typography,
  AspectRatio,
  Stack,
  CardOverflow,
  Divider,
  IconButton,
  Avatar,
} from "@mui/joy";

// MUI icons import
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import EditIcon from "@mui/icons-material/Edit";

// Common styles
const iconButtonStyle = {
  position: "absolute",
  zIndex: 2,
  borderRadius: "50%",
  right: "1rem",
  bottom: 0,
  transform: "translateY(50%)",
};

const MAX_CHARS_TITLE = 35;

export default function EventCard({ event, isBookmarkIcon, isEditIcon }) {
  const processedTitle = (title) => {
    let spacePositions = [];
    let brakePosition;

    for (let i = 0; i < title.length; i++)
      title[i] === " " && spacePositions.push(i);

    for (let i = spacePositions.length - 1; i >= 0; i--) {
      if (spacePositions[i] < MAX_CHARS_TITLE) {
        brakePosition = spacePositions[i];
        break;
      }
    }

    return title.slice(0, brakePosition + 1) + "...";
  };

  console.log("eventID: ", event.id);

  return (
    <Card
      sx={{
        transition: "0.2s all ease",
        minHeight: {
          xs: "300px",
          md: "350px",
          lg: "320px",
        },

        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Link
            to={"/events/" + event.id}
            style={{
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {event.picture && (
              <img
                src={
                  import.meta.env.VITE_SERVER_URL + "/events/" + event.picture
                }
                loading="lazy"
                alt="event"
              />
            )}
            {!event.picture && <Avatar size="lg">N/I</Avatar>}
          </Link>
        </AspectRatio>

        {/* load bookmark icon */}
        {isBookmarkIcon && (
          <IconButton
            aria-label="Like minimal photography"
            size="lg"
            variant="soft"
            color="primary"
            sx={iconButtonStyle}
          >
            <BookmarkAddRoundedIcon fontSize="md" />
          </IconButton>
        )}

        {/* load edit icon */}
        {isEditIcon && (
          <IconButton
            aria-label="Like minimal photography"
            size="lg"
            variant="soft"
            color="danger"
            sx={iconButtonStyle}
          >
            <EditIcon fontSize="md" />
          </IconButton>
        )}
      </CardOverflow>
      <CardContent
        sx={{
          gap: 1,
          paddingTop: "7px",
          direction: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography level="title-lg">
          {event.title.length > MAX_CHARS_TITLE
            ? processedTitle(event.title)
            : event.title}
        </Typography>
        <Typography level="body-sm">
          {event.user.firstname + " " + event.user.lastname}
        </Typography>
      </CardContent>

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{
            columnGap: "0.5rem",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmojiPeopleRoundedIcon color="neutral" fontSize="sm" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {event.maxNrOfParticipants}
            </Typography>
          </Stack>
          <Divider orientation="vertical" />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TodayRoundedIcon color="neutral" fontSize="sm" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {new Date(event.startDateTime).toLocaleDateString()},{" "}
              {new Date(event.startDateTime).toLocaleTimeString().slice(0, -3)}
            </Typography>
          </Stack>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
