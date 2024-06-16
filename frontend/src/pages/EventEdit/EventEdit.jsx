import {
  React,
  useState,
  useRef,
  Fragment,
  useContext,
  useEffect,
} from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";

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
  CardCover,
  IconButton,
  Alert,
} from "@mui/joy";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import MapComponent from "../../components/MapComponent/MapComponent";
import { Context } from "../../main.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getAll, getEventsDetailsById } from "../../api/eventAPI.js";

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

function fillDataHelper(event) {
  let inputArr = document.querySelectorAll("input");
  let textArea = document.querySelectorAll("textarea");
  let selectArr = document.querySelectorAll("select");

  inputArr[0].value = event.title;
  inputArr[1].value = JSON.stringify(event.type);

  const startDateEvent = new Date(event?.startDateTime);
  const dateValue = startDateEvent
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");
  const timeValue = startDateEvent.toLocaleTimeString();
  const endDateEvent = new Date(event?.endDateTime);
  const diffHours =
    (endDateEvent.valueOf() - startDateEvent.valueOf()) / (3600 * 1000);
  const diffMinutes =
    ((endDateEvent.valueOf() - startDateEvent.valueOf()) / (60 * 1000)) % 60;

  inputArr[2].value = dateValue;
  inputArr[3].value = timeValue;
  inputArr[4].value = diffHours.toString();
  inputArr[5].value = diffMinutes.toString();
  inputArr[6].value = event.maxNrOfParticipants;
  textArea[0].value = event.description;
}

export default function EventEdit() {
  const [event, setEvent] = useState(null);
  const [charsTitle, setCharsTitle] = useState(MAX_TITLE_LENGTH);
  const [charsDescription, setCharsDescription] = useState(MAX_DESC_LENGTH);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isSend, setIsSend] = useState({ send: false, message: "" });
  const [alertClose, setAlertClose] = useState(true);
  const stringDate = new Date()
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");

  const { eventId } = useParams();
  const { user, events } = useContext(Context);
  const navigate = useNavigate();
  const diffSelect = useRef();
  const eventTypeRef = useRef();

  useEffect(() => {
    getEventsDetailsById(eventId)
      .then((fetchedEvent) => {
        setEvent(fetchedEvent);
        setFile(fetchedEvent.picture);
        fillDataHelper(fetchedEvent);
        setCharsTitle(MAX_TITLE_LENGTH - fetchedEvent.title.length);
        setCharsDescription(MAX_DESC_LENGTH - fetchedEvent.description.length);
        console.log("Fetching event details events...");
        console.log(fetchedEvent);
        // throw new Error("Test events not found.");
      })
      .catch((error) => {
        console.log(error);
        // setErrorObj({ isError: true, message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleFileUpload(e) {
    console.log(e.target.files);
    const fileURL = URL.createObjectURL(e.target.files[0]);
    setFile({ filename: e.target.files[0].name, url: fileURL });
  }

  function hadleFileRemove(e) {
    console.log(e.target.files);
    setFile(null);
  }

  async function handleComponentState(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await submitFormHandler(
        e,
        user.user.id,
        file,
        false,
        eventId
      );
      console.log(response);
      setIsLoading(false);
      setIsSend({ send: true, message: "Evenimentul a fost modificat" });
      setAlertClose(false);
    } catch (error) {
      setIsSend({ send: false, message: error.message });
    }
  }

  const startDateEvent = new Date(event?.startDateTime);
  const endDateEvent = new Date(event?.endDateTime);
  const diffHours =
    (endDateEvent.valueOf() - startDateEvent.valueOf()) / (3600 * 1000);
  const diffMinutes =
    ((endDateEvent.valueOf() - startDateEvent.valueOf()) / (60 * 1000)) % 60;

  return (
    <div
      className="container"
      style={{
        paddingBlock: "6em 8em",
      }}
    >
      {!isSend.send && (
        <>
          <Typography level="h2">Editează evenimentul</Typography>
          <form style={{ marginTop: "3em" }} onSubmit={handleComponentState}>
            <Stack rowGap={3}>
              <Box>
                <FormLabel>Titlul *</FormLabel>
                <Input
                  onChange={(e) => {
                    setCharsTitle(MAX_TITLE_LENGTH - e.target.value.length);
                  }}
                  slotProps={{
                    input: {
                      maxlength: MAX_TITLE_LENGTH,
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
                  key={`select_type-${event?.type}`}
                  ref={eventTypeRef}
                  defaultValue={event?.type}
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
                  <Option value="Sport">Sport</Option>
                  <Option value="Cultură">Cultură</Option>
                  <Option value="Distracție">Distracție</Option>
                  <Option value="Muzică">Muzică</Option>
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
                    key={`select-${diffHours}`}
                    defaultValue={diffHours}
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
                    key={`selectMinutes-${diffMinutes}`}
                    ref={diffSelect}
                    defaultValue={diffMinutes.toString()}
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
                    paddingTop: 3,
                  }}
                  paddingBlock={file ? 0 : 3}
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
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {file && (
                    <Card
                      sx={{
                        minHeight: "100px",
                        width: "150px",
                        margin: "1em auto",
                        position: "relative",
                      }}
                    >
                      <CloseIcon
                        aria-label="event picture"
                        size="xs"
                        sx={{
                          position: "absolute",
                          top: "0.1rem",
                          right: "0.1rem",
                          color: "white",
                          zIndex: 20,
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={hadleFileRemove}
                      />
                      <CardCover>
                        <img
                          src={
                            typeof file === "string"
                              ? `${
                                  import.meta.env.VITE_SERVER_URL
                                }/events/${file}`
                              : file.url
                          }
                          loading="lazy"
                          alt="Event image"
                        />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                      />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Typography level="body-xs" textColor="#fff">
                          {typeof file === "string" ? file : file.filename}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
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
                  slotProps={{
                    textarea: {
                      maxLength: MAX_DESC_LENGTH,
                    },
                  }}
                />
              </Box>
              <Box>
                <FormLabel>Locație *</FormLabel>
                <FormHelperText>
                  Glisați markerul roșu în locația în care va fi organizat
                  evenimentul.
                </FormHelperText>
                <MapComponent
                  key={`map_component_${event?.latitude}`}
                  latitude={event?.latitude}
                  longitude={event?.longitude}
                  allowMarkerMovement={true}
                ></MapComponent>
              </Box>
              <Button
                loading={isLoading}
                loadingPosition="start"
                type="submit"
                onClick={() => events.setOrganizedEventsHasChanged(true)}
              >
                {isLoading ? "Modifică evenimentul..." : "Modifică evenimentul"}
              </Button>
            </Stack>
          </form>
        </>
      )}

      {!alertClose && (
        <Alert
          sx={{ alignItems: "flex-start", marginTop: 2 }}
          startDecorator={<CheckCircleIcon />}
          variant="soft"
          color="success"
          endDecorator={
            <IconButton variant="soft" color="success">
              <CloseRoundedIcon
                onClick={() => {
                  setAlertClose(true);
                  navigate("/events/" + eventId);
                }}
              />
            </IconButton>
          }
        >
          <div>
            <div>Succes</div>
            <Typography level="body-sm" color="success">
              {isSend.message}
            </Typography>
          </div>
        </Alert>
      )}
    </div>
  );
}
