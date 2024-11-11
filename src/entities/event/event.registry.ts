import { EventAction } from '~/enums';

import { EventEntry } from './event.entry';

export class EventRegistry {
  registry: Map<EventAction | string, Array<(event: EventEntry | string) => {}>>;

  constructor() {
    this.registry = new Map();
  }

  addEventListener(eventAction: EventAction | string, callback: any) {
    let callbacks = this.registry.get(eventAction);
    if (callbacks) {
      callbacks.push(callback);
    } else {
      this.registry.set(eventAction, [callback]);
    }
  }

  removeEventListener(eventAction: EventAction | string, callback: any) {
    let callbacks = this.registry.get(eventAction);
    if (callbacks) {
      const indexOf = callbacks.indexOf(callback);
      if (indexOf > -1) {
        callbacks.splice(indexOf, 1);
      }
    }
  }

  dispatchEvent(event: EventEntry) {
    let callbacks = this.registry.get(event.eventAction);
    for (let i in callbacks) {
      callbacks[i as any](event);
      if (!event.propagate) break;
    }
  }
}
