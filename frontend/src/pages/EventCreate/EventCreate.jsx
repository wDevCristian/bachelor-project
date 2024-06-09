import { React, useState, useRef, Fragment } from "react";
import submitFormHandler from "../../helper/submitFormHandler.js";

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
  Chip,
  FormHelperText,
} from "@mui/joy";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import MapComponent from "../../components/MapComponent/MapComponent";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const MAX_DESC_LENGTH = 3000;
const MAX_TITLE_LENGTH = 80;

export default function EventCreate() {
  const [charsTitle, setCharsTitle] = useState(MAX_TITLE_LENGTH);
  const [charsDescription, setCharsDescription] = useState(MAX_DESC_LENGTH);
  const stringDate = new Date()
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");

  const inputHandlerChars = (e) => {};

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      <Typography level="h2">Crează un eveniment</Typography>
      <form style={{ marginTop: "3em" }} onSubmit={submitFormHandler}>
        <Stack rowGap={3}>
          <Box>
            <FormLabel>Titlul *</FormLabel>
            <Input
              onChange={(e) =>
                setCharsTitle(MAX_TITLE_LENGTH - e.target.value.length)
              }
              slotProps={{
                input: {
                  maxlength: { MAX_TITLE_LENGTH },
                },
              }}
              required
              endDecorator={
                <Typography level="body-xs">{charsTitle}</Typography>
              }
            ></Input>
          </Box>
          <Box>
            <FormLabel>Tip *</FormLabel>
            <Select
              required
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  {selected.map((selectedOption, index) => (
                    <Chip key={index} variant="soft" color="primary">
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              )}
              sx={{
                minWidth: "15rem",
              }}
              slotProps={{
                listbox: {
                  sx: {
                    width: "100%",
                  },
                },
              }}
            >
              <Option value="sport">Sport</Option>
              <Option value="culture">Cultură</Option>
              <Option value="entertainment">Distracție</Option>
              <Option value="music">Muzică</Option>
            </Select>
          </Box>
          <Stack direction="row" columnGap={2}>
            <Box>
              <FormLabel>Dată *</FormLabel>
              <Input
                required
                type="date"
                slotProps={{
                  input: {
                    min: `${stringDate}`,
                  },
                }}
              ></Input>
            </Box>
            <Box>
              <FormLabel>Oră *</FormLabel>
              <Input required type="time"></Input>
            </Box>
          </Stack>
          <Box>
            <FormLabel>Durată</FormLabel>
            <Stack direction="row" alignItems="center" columnGap={2}>
              <Select
                sx={{
                  width: "7ch",
                }}
              >
                {new Array(24)
                  .fill(0)
                  .map((i, index) => index)
                  .map((i) => {
                    return (
                      <Option key={i} value={i}>
                        {i}
                      </Option>
                    );
                  })}
              </Select>
              <Typography>oră(e)</Typography>
              <Select
                sx={{
                  width: "7ch",
                }}
              >
                <Option value="0">0</Option>
                <Option value="15">15</Option>
                <Option value="30">30</Option>
                <Option value="45">45</Option>
              </Select>
              <Typography>minute</Typography>
            </Stack>
          </Box>
          <Box>
            <FormLabel>Număr maxim de participanți * (max. 250)</FormLabel>
            <Input
              required
              type="number"
              defaultValue="20"
              slotProps={{
                input: {
                  min: 1,
                  max: 250,
                  step: 1,
                },
              }}
            />
          </Box>
          <Box>
            <FormLabel>Imagine sugestivă</FormLabel>
            <Box
              sx={{
                border: "2px #a3a5a8 dashed",
                borderRadius: 8,
                textAlign: "center",
                paddingBlock: 4,
              }}
            >
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Încarcă imagine
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
            </Box>
          </Box>
          <Box>
            <FormLabel>Descriere *</FormLabel>
            <Textarea
              onChange={(e) =>
                setCharsDescription(MAX_DESC_LENGTH - e.target.value.length)
              }
              minRows={3}
              required
              endDecorator={
                <Typography ml="auto" level="body-xs">
                  {charsDescription}
                </Typography>
              }
            />
          </Box>
          <Box>
            <FormLabel>Locație *</FormLabel>
            <FormHelperText>
              Glisați markerul roșu în locația în care va fi organizat
              evenimentul.
            </FormHelperText>
            <MapComponent></MapComponent>
          </Box>
          <Button type="submit">Crează eveniment</Button>
        </Stack>
      </form>
    </div>
  );
}
// TODO: write the logic to check if user has inputted the location of the event
