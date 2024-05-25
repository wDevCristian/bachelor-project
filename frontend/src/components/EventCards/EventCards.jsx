import React from "react";
import { Grid } from "@mui/joy";

import EventCard from "../EventCard/EventCard";

export default function EventCards() {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8];
  const cards = new Array(8)
    .fill("Titlu eveniment")
    .map((item, index) => `${item} ${ids[index]}`);
  const preloadedCards = cards.map((eventTitle, i) => (
    <Grid xs={12} sm={6} md={4} lg={3} key={ids[i]}>
      <EventCard eventTitle={eventTitle}></EventCard>
    </Grid>
  ));

  return (
    <Grid container mt={6} pb={14} spacing={3.5}>
      {preloadedCards}
    </Grid>
  );
}
