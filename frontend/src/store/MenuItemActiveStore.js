import { makeAutoObservable } from "mobx";

export default class MenuItemActiveStore {
  constructor() {
    this._activeItem = null;
    makeAutoObservable(this);
  }

  get activeItem() {
    return this._activeItem;
  }

  setActiveItem(menuItemActive) {
    this._activeItem = menuItemActive;
  }
}
