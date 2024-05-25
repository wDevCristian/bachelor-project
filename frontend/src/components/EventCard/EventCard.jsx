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

export default function EventCard({ eventTitle }) {
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
              src="./src/assets/img/about-img.jpeg"
              // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt="event"
            />
          </Link>
        </AspectRatio>
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
      </CardOverflow>
      <CardContent sx={{ gap: 1 }}>
        <Typography level="title-lg">{eventTitle}</Typography>
        <Typography level="body-sm">Organizator eveniment</Typography>
      </CardContent>

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmojiPeopleRoundedIcon color="neutral" fontSize="sm" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              Participanți
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
              Data și oră
            </Typography>
          </Stack>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
