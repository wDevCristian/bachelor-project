import { $authHost, $host } from "./index.js";

const EVENT_API_URL = "/api/event";

export async function getAll(limit, page) {
  const { data } = await $host.get(
    `${EVENT_API_URL}/all?limit=${limit}&page=${page}`
  );

  return data;
}

export async function getEventsByOrganizerId(organizerId) {
  const { data } = await $authHost.get(`${EVENT_API_URL}/all/${organizerId}`);
  return data;
}

export async function getEventsDetailsById(id) {
  const { data } = await $host.get(`${EVENT_API_URL}/${id}`);
  return data;
}

export async function createSavedEvent(userId, eventId) {
  const { data } = await $authHost.post(`${EVENT_API_URL}/saved`, {
    userId,
    eventId,
  });
  return data;
}

export async function getSavedEventsByUserId(userId) {
  const { data } = await $authHost.get(`${EVENT_API_URL}/saved/${userId}`);
  return data;
}

export async function deleteSavedEvent(userId, eventId) {
  const { data } = await $authHost.delete(
    `${EVENT_API_URL}/saved?userId=${userId}&eventId=${eventId}`
  );
  return data;
}

export async function create(event) {}

export async function updateById(id, newEventRow) {}
