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
} from "@mui/joy";

// MUI icons import
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";

export default function EventCard({ event, bookmark }) {
  return (
    <Card
      sx={{
        transition: "0.2s all ease",

        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
      // onClick={}
    >
      <CardOverflow>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Link
            to="/events/eventId"
            style={{
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src={event.picture}
              // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt="event"
            />
          </Link>
        </AspectRatio>
        {bookmark && (
          <IconButton
            aria-label="Like minimal photography"
            size="lg"
            variant="solid"
            color="primary"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            <BookmarkAddRoundedIcon fontSize="md" />
          </IconButton>
        )}
      </CardOverflow>
      <CardContent sx={{ gap: 1 }}>
        <Typography level="title-lg">{event.title}</Typography>
        <Typography level="body-sm">{event.organizer}</Typography>
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
              {event.nrOfParticipants}
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
              {event.date}, {event.time}
            </Typography>
          </Stack>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}

// eventTitle = "Title",
//   organizer = "Author",
//   nrOfParticipants = 25,
//   date = "04.06.2024",
//   time = "14:45",
//   bookmark = true,
//   picture = "./src/assets/img/about-img.jpeg",
