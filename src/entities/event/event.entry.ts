export class EventEntry {
  name: string;

  constructor(name: string) {
    this.name = name;
    this._propagate = true;
    this._defaults = true;
  }

  private _propagate: boolean;

  get propagate() {
    return this._propagate;
  }

  private _defaults: boolean;

  get defaults() {
    return this._defaults;
  }

  stopPropagation() {
    this._propagate = false;
  }

  preventDefault() {
    this._defaults = false;
  }
}
