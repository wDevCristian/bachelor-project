import React from "react";
import Hero from "../../components/Hero/Hero";
import "../../common.scss";
import "./Home.scss";
import { Box, Stack, Typography } from "@mui/joy";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="about container" id="about">
        <Stack
          direction="row"
          paddingBlock="9em 13em"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          rowGap={8}
          columnGap={5}
        >
          <Box
            alignSelf="center"
            sx={{
              flex: {
                sm: 1,
                xs: "0 1 auto",
              },
            }}
          >
            <Typography level="h2">Despre noi</Typography>
            <Typography level="body-lg" mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              illum voluptatem debitis cumque ducimus quia ullam consectetur,
              sint pariatur ipsum ipsam, totam, commodi eveniet quis laudantium
              quaerat maiores quidem! Accusamus aperiam vitae totam harum ex
              quam pariatur assumenda, commodi deserunt.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: {
                sm: 1,
                xs: "0 1 auto",
              },
              textAlign: {
                sm: "right",
                xs: "center",
              },
            }}
          >
            <img src="./src/assets/img/about-img.jpeg" alt="about" />
          </Box>
        </Stack>
      </div>
    </>
  );
}
