import React, { useEffect } from 'react';

import { usePluginForceUpdate, usePluginStore } from '~/hooks';
import { ComponentEvent } from '~/entities';

import { PluginStoreRendererProps } from './plugin-store.types';

export const PluginStoreRenderer: React.FC<PluginStoreRendererProps> = ({ placement }) => {
  const pluginStore = usePluginStore();
  const forceUpdate = usePluginForceUpdate();

  useEffect(() => {
    const eventListener = (event: ComponentEvent) => {
      if (event.position === placement) {
        forceUpdate();
      }
    };
    pluginStore.addEventListener('Renderer.componentUpdated', eventListener);

    return () => {
      pluginStore.removeEventListener('Renderer.componentUpdated', eventListener);
    };
  }, [pluginStore, placement, forceUpdate]);

  let components = pluginStore.executeFunction('Renderer.getComponentsInPosition', placement);

  return (
    <>
      {components.map((compObject: { component: React.ComponentClass; key: string }) => (
        <compObject.component key={compObject.key} />
      ))}
    </>
  );
};
