import axios from "axios";
import { $authHost } from "../api/index.js";

/**
 * Handles the form submission for creating a new event.
 *
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<AxiosResponse<any, any>>}
 */

export default async function submitFormHandler(
  event,
  organizerId,
  file,
  isCreated,
  eventId = null
) {
  event.preventDefault();
  console.log(event);

  const startDateTime = formatStartDateTime(
    event.target[3].value,
    event.target[4].value
  );

  const endDateTime = formatEndDateTime(
    startDateTime,
    event.target[6].value,
    event.target[8].value
  );

  const eventObject = {
    title: event.target[0].value,
    type: formatType(event.target[2].value),
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    maxNrOfParticipants: event.target[9].value,
    description: event.target[11].value,
    picture: event.target[10].files[0] ?? null,
  };

  if (typeof file === "string") {
    eventObject.picture = file;
  }

  const lat = localStorage.getItem("humanReadableCoords").split(",")[0];
  const lon = localStorage.getItem("humanReadableCoords").split(",")[1];
  eventObject.latitude = lat;
  eventObject.longitude = lon;

  let response;
  try {
    response = await axios.get(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${
        import.meta.env.VITE_GC_API_KEY
      }`
    );
  } catch (error) {
    console.log(error);
  }

  console.log(response.data);

  eventObject.street = response.data.address.road;
  eventObject.city = response.data.address.city;
  eventObject.building = response.data.display_name.split(",")[0];

  if (eventObject.building === eventObject.street) {
    eventObject.building = null;
  }

  eventObject.addressNr = response.data.address.house_number ?? null;

  console.log(eventObject);

  let formData = new FormData();

  for (let key in eventObject) {
    if (eventObject[key] === null) {
      continue;
    }

    if (key === "type") {
      for (let t of eventObject[key]) formData.append(key, t);
    } else {
      formData.append(key, eventObject[key]);
    }
  }

  formData.append("organizerId", organizerId.toString());

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  console.log("Picture: ", eventObject.picture);

  if (isCreated) {
    const createResponse = await $authHost.post(`/api/event/create`, formData);
    return createResponse;
  } else {
    formData.append("id", eventId);
    const updateResponse = await $authHost.put(`/api/event/update`, formData);
    return updateResponse;
  }
}

/**
 * This function formats the type string from a string format to an array of strings.
 *
 * @param {string} stringFormat - The string format of the type, which is a comma-separated string enclosed in square brackets.
 * @returns {string[]} An array of strings representing the types.
 *
 * @example
 * formatType('["culture","entertainment","music"]')
 * returns ['culture', 'entertainment', 'music']
 */
function formatType(stringFormat) {
  // "["culture","entertainment","music"]"
  return stringFormat
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map((item) => item.replace(/"/g, ""));
}

/**
 * This function formats a local date and time string into an ISO 8601 formatted string.
 *
 * @param {string} stringLocalStartDate - The local start date in the format 'YYYY-MM-DD'.
 * @param {string} stringLocalStartTime - The local start time in the format 'HH:mm'.
 * @returns {string} The ISO 8601 formatted date and time string.
 */
function formatStartDateTime(stringLocalStartDate, stringLocalStartTime) {
  const dateArr = stringLocalStartDate
    .split("-")
    .map((e, i) => (i === 1 ? e - 1 : e));
  const timeArr = stringLocalStartTime.split(":");

  const date = new Date(...dateArr, ...timeArr);
  return date.toISOString();
}

/**
 * This function formats the end date and time of an event.
 *
 * @param {string} stringISOTimestamp - The start date and time of the event in ISO 8601 format.
 * @param {string} stringHours - The number of hours to add to the start date and time.
 * @param {string} stringMinutes - The number of minutes to add to the start date and time.
 * @returns {string} The end date and time of the event in ISO 8601 format.
 *
 * @example
 * formatEndDateTime('2022-01-01T12:00:00.000Z', '2', '30')
 * returns '2022-01-01T14:30:00.000Z'
 */
function formatEndDateTime(stringISOTimestamp, stringHours, stringMinutes) {
  let date = new Date(stringISOTimestamp);

  date.setMilliseconds(
    date.getMilliseconds() +
      +stringHours * 60 * 60 * 1000 +
      +stringMinutes * 60 * 1000
  );

  return date.toISOString();
}
