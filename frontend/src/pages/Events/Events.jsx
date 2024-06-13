import { React, useContext, useEffect, useState } from "react";
import { getAll } from "../../api/eventAPI";
import { Context } from "../../main";

// Own components
import Filter from "../../components/Filter/Filter";
import EventCards from "../../components/EventCards/EventCards";

// MUI Components
import { Alert, IconButton, Typography } from "@mui/joy";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Events() {
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorObj, setErrorObj] = useState({ isError: false, message: "" });
  const { events } = useContext(Context);
  const limit = 16;
  const page = 1;

  useEffect(() => {
    getAll(limit, page)
      .then((fetchedEvents) => {
        events.setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.log(error);
        setErrorObj({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, []);

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
      {!errorObj.isError && (
        <EventCards
          filters={filters}
          isBookmarkIcon={true}
          isEditIcon={false}
          maxItemsInRow={4}
          isLoading={isLoading}
        />
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
    </div>
  );
}
