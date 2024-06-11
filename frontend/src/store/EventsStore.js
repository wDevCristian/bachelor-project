import { makeAutoObservable } from "mobx";

export default class EventsStore {
  constructor() {
    this._events = [];
    makeAutoObservable(this);
  }

  get events() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
  }
}
