import { EventEntry } from '~/entities';
import { EventAction } from '~/enums';

export class ComponentEvent extends EventEntry {
  position: string;

  constructor(eventAction: EventAction | string, position: string) {
    super(eventAction);

    this.position = position;
  }
}
