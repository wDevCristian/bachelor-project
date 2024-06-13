import { React, useState } from "react";

// Own components
import Filter from "../../components/Filter/Filter";
import EventCards from "../../components/EventCards/EventCards";

// MUI Components
import { Typography } from "@mui/joy";

export default function Events() {
  const [filters, setFilters] = useState({});

  return (
    <div
      className="events container"
      style={{
        paddingTop: "7em",
      }}
    >
      <Typography
        level="h2"
        sx={{
          fontSize: {
            sm: "1.875rem",
            xs: "1.3rem",
          },
        }}
      >
        Evenimente în{" "}
        <Typography
          sx={{
            p: 1,
            borderRadius: "",
            fontSize: {
              sm: "inherit",
              xs: "1.3rem",
            },
          }}
          color="primary"
          variant="soft"
          level="h2"
        >
          Timișoara
        </Typography>
      </Typography>
      <Filter setFilters={setFilters} />
      <EventCards filters={filters} bookmark={true} />
    </div>
  );
}
