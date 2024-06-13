import { React, useState } from "react";

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
} from "@mui/joy";

import { CssVarsProvider } from "@mui/joy/styles";

export default function UserEvents() {
  const [menuItem, setMenuItem] = useState("saved");
  const windowWidth = window.innerWidth;

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
          spacing={2}
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
                mt: 2,
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
                  {/* <ListItemDecorator>
              <PeopleRoundedIcon fontSize="small" />
            </ListItemDecorator> */}
                  <ListItemContent>Participant</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={menuItem === "organizer" ? true : false}
                  onClick={() => setMenuItem("organizer")}
                >
                  {/* <ListItemDecorator sx={{ color: "neutral.500" }}>
              <AssignmentIndRoundedIcon fontSize="small" />
            </ListItemDecorator> */}
                  <ListItemContent>Organizator</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={menuItem === "saved" ? true : false}
                  onClick={() => setMenuItem("saved")}
                >
                  {/* <ListItemDecorator sx={{ color: "neutral.500" }}>
              <ArticleRoundedIcon fontSize="small" />
            </ListItemDecorator> */}
                  <ListItemContent>Marcate</ListItemContent>
                  <Chip variant="soft" color="danger" size="sm">
                    2
                  </Chip>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          {menuItem === "saved" && (
            <EventCards
              maxItemsInRow={3}
              isBookmarkIcon={false}
              isEditIcon={false}
            ></EventCards>
          )}
          {menuItem === "participant" && (
            <EventCards
              maxItemsInRow={3}
              isBookmarkIcon={false}
              isEditIcon={false}
            ></EventCards>
          )}
          {menuItem === "organizer" && (
            <EventCards
              maxItemsInRow={3}
              isBookmarkIcon={false}
              isEditIcon={true}
            ></EventCards>
          )}
        </Stack>
      </CssVarsProvider>
    </div>
  );
}
