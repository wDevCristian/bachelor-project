import { makeAutoObservable } from "mobx";

export default class EventsStore {
  constructor() {
    this._events = [];
    this._organizedEvents = [];
    this._eventDetails = {};
    makeAutoObservable(this);
  }

  get events() {
    return this._events;
  }

  get organizedEvents() {
    return this._organizedEvents;
  }

  get eventDetails() {
    return this._eventDetails;
  }
  setEvents(events) {
    this._events = events;
  }

  setOrganizedEvents(organizedEvents) {
    this._organizedEvents = organizedEvents;
  }

  setEventDetails(eventDetails) {
    this._eventDetails = eventDetails;
  }
}
