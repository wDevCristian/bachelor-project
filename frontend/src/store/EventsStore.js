import { makeAutoObservable } from "mobx";

export default class EventsStore {
  constructor() {
    this._events = [];
    this._organizedEventsHasChanged = true;
    this._organizedEvents = [];
    this._eventDetails = {};
    this._savedEventsHasChanged = true;
    this._savedEvents = [];
    this._participantEventsHasChanged = true;
    this._participantEvents = [];
    makeAutoObservable(this);
  }

  get events() {
    return this._events;
  }

  get organizedEventsHasChanged() {
    return this._organizedEventsHasChanged;
  }

  get organizedEvents() {
    return this._organizedEvents;
  }

  get eventDetails() {
    return this._eventDetails;
  }

  get savedEventsHasChanged() {
    return this._savedEventsHasChanged;
  }

  get savedEvents() {
    return this._savedEvents;
  }
  get participantEventsHasChanged() {
    return this._participantEventsHasChanged;
  }

  get participantEvents() {
    return this._participantEvents;
  }

  setEvents(events) {
    this._events = events;
  }

  setOrganizedEventsHasChanged(bool) {
    this._organizedEventsHasChanged = bool;
  }

  setOrganizedEvents(organizedEvents) {
    this._organizedEvents = organizedEvents;
  }

  setEventDetails(eventDetails) {
    this._eventDetails = eventDetails;
  }

  setSavedEventsHasChaged(bool) {
    this._savedEventsHasChanged = bool;
  }

  setSavedEvents(savedEvents) {
    this._savedEvents = savedEvents;
  }
  setParticipantEventsHasChaged(bool) {
    this._participantEventsHasChanged = bool;
  }

  setParticipantEvents(participantEvents) {
    this._participantEvents = participantEvents;
  }
}
