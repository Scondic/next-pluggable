import { EventEntry } from '~/entities';

export class ComponentEvent extends EventEntry {
  position: string;

  constructor(name: string, position: string) {
    super(name);
    this.position = position;
  }
}
