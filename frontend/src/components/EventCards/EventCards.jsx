import { React, useState } from "react";
import { Grid, Typography, Button } from "@mui/joy";

import EventCard from "../EventCard/EventCard";
import { eventTypes } from "../Filter/Filter";

import events from "../../model/mock_data";
import { CenterFocusStrong } from "@mui/icons-material";

export default function EventCards({ filters = {}, bookmark = true }) {
  const [isLoading, setIsLoading] = useState(true);

  let filteredEvents = events;

  if (Object.keys(filters).length !== 0) {
    filteredEvents = events.filter((e) => {
      const currentDate = new Date();
      const eventDateConfig = [
        ...e.date.split(".").reverse(),
        ...e.time.split(":"),
      ];
      eventDateConfig[1]--;
      const eventDate = new Date(...eventDateConfig);

      let endDate;

      switch (filters.periodSelect) {
        case "today":
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          );
          break;
        case "tomorrow":
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 2
          );
          break;
        case "week":
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 7
          );

          break;
        case "month":
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          );

          break;
        case "season":
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 3,
            currentDate.getDate()
          );

          break;

        default:
          console.log("Check the period filtration logic");
          break;
      }

      let checkSubset = (parentArray, subsetArray) => {
        let res = subsetArray.find((i) => parentArray.includes(i));
        res = res === undefined ? false : true;
        return res;
      };

      if (filters.typeEvents.length === 0)
        filters.typeEvents = eventTypes.map((i) => i.name);

      return (
        e.nrOfParticipants > filters.participantsRange[0] &&
        e.nrOfParticipants < filters.participantsRange[1] &&
        currentDate <= eventDate &&
        eventDate < endDate &&
        checkSubset(filters.typeEvents, e.type)
      );
    });
  }

  const preloadedCards = filteredEvents.map((event) => (
    <Grid xs={12} sm={6} md={4} lg={3} key={event.id}>
      <EventCard bookmark={bookmark} event={event}></EventCard>
    </Grid>
  ));

  return (
    <Grid container mt={6} pb={14} spacing={3.5}>
      {/* {isLoading && (
        <Button
          loading
          size="lg"
          variant="plain"
          sx={{
            margin: "2em auto",
          }}
        ></Button>
      )} */}
      {filteredEvents.length !== 0 && preloadedCards}
      {filteredEvents.length === 0 && (
        <Grid xs={12}>
          <Typography level="title-lg" textAlign="center">
            No events found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
