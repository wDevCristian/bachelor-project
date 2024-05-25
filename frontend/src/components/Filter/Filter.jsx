import React, { useState } from "react";

// MUI Components
import {
  Typography,
  Stack,
  Select,
  Option,
  selectClasses,
  Box,
  Chip,
  Slider,
  Checkbox,
  Button,
} from "@mui/joy";

// MUI Icons
import { KeyboardArrowDown, Check as CheckIcon } from "@mui/icons-material";

export default function Filter() {
  const [value, setValue] = useState([0, 100]);
  const [selectedVariant, setSelectedVariant] = useState([]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="start"
        flexWrap="wrap"
        alignItems="left"
        rowGap={2}
        marginTop={4}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <div>
            <Typography level="body-md" id="event-type" mb={2}>
              Tipuri de evenimente
            </Typography>
            <Box
              role="group"
              aria-labelledby="event-type"
              size="sm"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "start",
              }}
            >
              {["Sport", "Cultură", "Distracție", "Muzică"].map((name) => {
                const checked = selectedVariant.includes(name);
                return (
                  <Chip
                    size="sm"
                    key={name}
                    variant="plain"
                    color={checked ? "primary" : "neutral"}
                    startDecorator={
                      checked && (
                        <CheckIcon
                          sx={{
                            zIndex: 1,
                            pointerEvents: "none",
                            scale: "75%",
                          }}
                        />
                      )
                    }
                  >
                    <Checkbox
                      size="sm"
                      variant="outlined"
                      color={checked ? "primary" : "neutral"}
                      disableIcon
                      overlay
                      label={name}
                      checked={checked}
                      onChange={(event) => {
                        setSelectedVariant((names) =>
                          !event.target.checked
                            ? names.filter((n) => n !== name)
                            : [...names, name]
                        );
                      }}
                    />
                  </Chip>
                );
              })}
            </Box>
          </div>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
          flexWrap="wrap"
          columnGap={3}
          rowGap={1}
        >
          <Select
            placeholder="Perioadă…"
            indicator={<KeyboardArrowDown />}
            sx={{
              height: "50%",
              width: 240,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="today">Azi</Option>
            <Option value="tomorrow">Maine</Option>
            <Option value="week">Săptămâna aceasta</Option>
            <Option value="month">Luna aceasta</Option>
            <Option value="other">...</Option>
          </Select>
          <Box
            width={"max(20ch, 30%)"}
            sx={{
              paddingInline: "12px",
              margin: {
                xs: "8px 0 0 11px",
              },
            }}
          >
            <Typography gutterBottom level="body-xs">
              Participanți
            </Typography>
            <Slider
              onChange={handleChange}
              valueLabelDisplay="on"
              size="sm"
              value={value}
              marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 100,
                  label: "100",
                },
              ]}
              sx={{
                "--Slider-markSize": "0px",
              }}
            />
          </Box>
          <Button
            size="md"
            variant="soft"
            sx={{
              width: "min(25%, 150px)",
            }}
          >
            Aplică
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

{
  /* <Select
          multiple
          placeholder="Tipul evenimentului…"
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 270,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s ease",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: "0.25rem" }}>
              {selected.map((selectedOption) => (
                <Chip variant="soft" color="primary">
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>
          )}
        >
          <Option value="culture">Cultură</Option>
          <Option value="sport">Sport</Option>
          <Option value="entertainment">Distracție</Option>
        </Select> */
}
