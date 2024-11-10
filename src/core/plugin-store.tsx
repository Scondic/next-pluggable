import { EventEntry, EventRegistry } from '~/entities';
import { dependencyValidation } from '~/utils';

import { PluginStoreProps } from './plugin-store.types';

export class PluginStore {
  private functionArray: Map<string, any>;
  private pluginMap: Map<string, PluginStoreProps>;
  private _eventCallableRegistry: EventRegistry = new EventRegistry();

  constructor() {
    this.functionArray = new Map<string, any>();
    this.pluginMap = new Map<string, PluginStoreProps>();
  }

  install(plugin: PluginStoreProps) {
    const pluginNameAndVer = plugin.getPluginName();
    const [pluginName] = pluginNameAndVer.split('@');
    const pluginDependencies = plugin.getDependencies() || [];

    let installationErrors: string[] = [];
    pluginDependencies.forEach((dep: string) => {
      const [depName, depVersion] = dep.split('@');
      const installedNameAndVer = this.getInstalledPluginNameWithVersion(depName);
      const [, installedVersion] = installedNameAndVer
        ? installedNameAndVer.split('@')
        : [null, ''];
      if (!installedNameAndVer) {
        installationErrors.push(
          `Error installing ${pluginNameAndVer}. Could not find dependency ${dep}.`,
        );
      } else if (!dependencyValidation(installedVersion, depVersion)) {
        installationErrors.push(
          `Error installing ${pluginNameAndVer}.\n${installedNameAndVer} doesn't satisfy the required dependency ${dep}.`,
        );
      }
    });

    if (installationErrors.length === 0) {
      this.pluginMap.set(pluginName, plugin);
      plugin.init(this);
      plugin.activate();
    } else {
      installationErrors.forEach(err => {
        console.error(err);
      });
    }
  }

  getInstalledPluginNameWithVersion(name: string) {
    const plugin = this.pluginMap.get(name);
    if (!plugin) {
      return null;
    }

    return plugin.getPluginName();
  }

  addFunction(key: string, fn: any) {
    this.functionArray.set(key, fn);
  }

  executeFunction(key: string, ...args: any): any {
    let fn = this.functionArray.get(key);
    if (fn) {
      return fn(...args);
    }
    console.error('No function added for the key ' + key + '.');
  }

  removeFunction(key: string): void {
    this.functionArray.delete(key);
  }

  uninstall(key: string) {
    let plugin = this.pluginMap.get(key);

    if (plugin) {
      plugin.deactivate();
      this.pluginMap.delete(key);
    }
  }

  addEventListener<EventType = EventEntry>(name: string, callback: (event: EventType) => void) {
    this._eventCallableRegistry.addEventListener(name, callback);
  }

  removeEventListener<EventType = EventEntry>(name: string, callback: (event: EventType) => void) {
    this._eventCallableRegistry.removeEventListener(name, callback);
  }

  dispatchEvent<EventType = EventEntry>(event: EventType) {
    // @ts-ignore
    this._eventCallableRegistry.dispatchEvent(event);
  }
}
