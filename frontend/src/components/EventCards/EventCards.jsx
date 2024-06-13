import { React, useContext, useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/joy";

import EventCard from "../EventCard/EventCard";
import { eventTypes } from "../Filter/Filter";

import eventsMocked from "../../model/mock_data";
import EventCardLoading from "../EventCard/EventCardLoading";
import { Context } from "../../main";

export default function EventCards({
  filters = {},
  maxItemsInRow = 4,
  isLoading = false,
  isBookmarkIcon = false,
  isEditIcon = false,
}) {
  let filteredEvents = eventsMocked;
  const { events } = useContext(Context);

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

  const preloadedCards = events.events.map((event) => (
    <Grid
      key={event.id}
      xs={12}
      sm={6}
      md={-2 * maxItemsInRow + 12}
      lg={12 / maxItemsInRow}
    >
      <EventCard
        isBookmarkIcon={isBookmarkIcon}
        isEditIcon={isEditIcon}
        event={event}
      ></EventCard>
    </Grid>
  ));

  const loadingCards = new Array(maxItemsInRow * 2).fill(1).map((e, i) => {
    return (
      <Grid
        key={i}
        xs={12}
        sm={6}
        md={-2 * maxItemsInRow + 12}
        lg={12 / maxItemsInRow}
      >
        <EventCardLoading></EventCardLoading>
      </Grid>
    );
  });

  return (
    <Grid container mt={6} pb={14} spacing={3.5}>
      {isLoading && loadingCards}
      {!isLoading && events.events.length !== 0 && preloadedCards}
      {!isLoading && events.events.length === 0 && (
        <Grid xs={12}>
          <Typography level="title-lg" textAlign="center">
            No events found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

// ---- data that EventCard attends
// let eventCardObjectSupply = {
//   title: "Title",
//   organizer: "Author",
//   nrOfParticipants: 25,
//   date: "04.06.2024",
//   time: "14:45",
// };
