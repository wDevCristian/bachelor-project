import React from "react";

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
} from "@mui/joy";

// MUI icons
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapComponent from "../../components/MapComponent/MapComponent";

export default function EventDetails() {
  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <Typography component="h3" level="h2" sx={{}}>
        Titlul evenimentului
      </Typography>
      <Stack direction="row" marginTop={2}>
        <Avatar alt="logo" src="https://i.pravatar.cc/40?img=2" />
        <Box marginLeft={2}>
          <Typography level="body-xs">Organizator</Typography>
          <Typography level="title-md">Nume Prenume</Typography>
        </Box>
      </Stack>
      <Grid container mt={{ md: "5em", xs: "3em" }} columnSpacing={5}>
        <Grid xs={12} md={8}>
          <AspectRatio sx={{ maxWidth: "100%" }}>
            <img
              src="/src/assets/img/students.jpg"
              loading="lazy"
              alt="event image"
            />
          </AspectRatio>
          <Typography component="h3" level="h4" mt={3}>
            Detalii
          </Typography>
          <Typography level="body-md" mt={1}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            asperiores est ex vitae neque officia aliquam aut esse possimus
            cumque ipsum eveniet, hic id aperiam nam laborum ducimus nihil
            debitis iure voluptatibus nemo veritatis non laboriosam. Tempore
            consequatur minima eius quae officiis quod, reiciendis voluptas,
            error quos ea ipsam nisi? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Non necessitatibus vel vero quo praesentium cumque
            sunt? Perspiciatis vel iure impedit maiores explicabo dolor officiis
            dolore, tempora laboriosam, quos sunt doloribus labore corrupti cum
            sed cupiditate quia quis animi quas, id nemo! Sed hic magni laborum
            tenetur neque unde illum minus, aut sunt repellat? Necessitatibus
            dolorum nesciunt voluptates magni, repellendus nisi mollitia odio
            eius non ratione saepe, pariatur sed ducimus quisquam cupiditate
            consequuntur eveniet laudantium modi sequi aliquid! Voluptatem velit
            modi tenetur cupiditate illo suscipit eum eveniet laborum laboriosam
            saepe unde repellat, non incidunt dignissimos, vel, at et. Hic,
            laudantium ratione?
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            paddingTop: {
              xs: "2em",
              md: "0em",
            },
          }}
        >
          <Card variant="soft">
            <CardContent>
              <Stack direction="row" spacing={2}>
                <AccessTimeIcon
                  variant="soft"
                  fontSize="medium"
                  color="neutral"
                />
                <Box>
                  <Typography level="body-md">18:00 - 21:00</Typography>
                  <Typography level="body-sm">Joi, 06.06.2024</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <PlaceIcon variant="soft" fontSize="medium" color="neutral" />
                <Box>
                  <Typography level="body-md">
                    Facultatea de Automatică și Calculatoare
                  </Typography>
                  <Typography level="body-sm">
                    Bulevardul Vasile Pârvan 2, Timișoara 300223
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
            <CardOverflow
              sx={{
                padding: ".5em 0 0 0",
              }}
            >
              <MapComponent />
            </CardOverflow>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
