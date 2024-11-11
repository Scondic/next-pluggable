import { ComponentEvent } from '~/entities';
import { generateString } from '~/utils';

import { PluginStoreRenderer } from './plugin-store-renderer.component';
import { PluginStoreProps } from './plugin-store.types';
import { PluginStore } from './plugin-store';
import { EventAction } from '~/enums';

export class RendererPlugin implements PluginStoreProps {
  public pluginStore: PluginStore = new PluginStore();
  private componentMap = new Map<
    string,
    Array<{
      component: React.ComponentClass;
      key?: string;
    }>
  >();

  getPluginName() {
    return 'Renderer@1.0.0';
  }

  getDependencies() {
    return [];
  }

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  addToComponentMap(position: string, component: React.ComponentClass, key?: string) {
    let array = this.componentMap.get(position);
    let componentKey = key ? key : generateString(8);
    if (!array) {
      array = [{ component, key: componentKey }];
    } else {
      array.push({ component, key: componentKey });
    }
    this.componentMap.set(position, array);
    this.pluginStore.dispatchEvent(new ComponentEvent(EventAction.COMPONENT_UPDATE, position));
  }

  removeFromComponentMap(position: string, component: React.ComponentClass) {
    let array = this.componentMap.get(position);
    if (array) {
      array.splice(
        array.findIndex(item => item.component === component),
        1,
      );
    }
    this.pluginStore.dispatchEvent(new ComponentEvent(EventAction.COMPONENT_UPDATE, position));
  }

  getRendererComponent() {
    return PluginStoreRenderer;
  }

  getComponentsInPosition(position: string) {
    let componentArray = this.componentMap.get(position);
    if (!componentArray) return [];

    return componentArray;
  }

  activate() {
    this.pluginStore.addFunction(EventAction.COMPONENT_CREATE, this.addToComponentMap.bind(this));

    this.pluginStore.addFunction(
      EventAction.COMPONENT_MOUNT,
      this.getComponentsInPosition.bind(this),
    );

    this.pluginStore.addFunction(
      EventAction.GET_RENDERER_COMPONENT,
      this.getRendererComponent.bind(this),
    );

    this.pluginStore.addFunction(
      EventAction.COMPONENT_REMOVE,
      this.removeFromComponentMap.bind(this),
    );
  }

  deactivate() {
    this.pluginStore.removeFunction(EventAction.COMPONENT_CREATE);
    this.pluginStore.removeFunction(EventAction.COMPONENT_MOUNT);
    this.pluginStore.removeFunction(EventAction.GET_RENDERER_COMPONENT);
    this.pluginStore.removeFunction(EventAction.COMPONENT_REMOVE);
  }
}

export type PluginStoreRenderer = {
  executeFunction(
    functionName: EventAction.COMPONENT_MOUNT,
    position: string,
  ): Array<React.Component>;
};
