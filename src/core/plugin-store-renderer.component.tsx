import React, { useEffect } from 'react';

import { usePluginForceUpdate, usePluginStore } from '~/hooks';
import { ComponentEvent } from '~/entities';
import { EventAction } from '~/enums';

import { PluginStoreRendererProps } from './plugin-store.types';

export const PluginStoreRenderer: React.FC<PluginStoreRendererProps> = ({ placement }) => {
  const pluginStore = usePluginStore();
  const { forceUpdate } = usePluginForceUpdate();

  useEffect(() => {
    const eventListener = (event: ComponentEvent) => {
      if (event.position === placement) {
        forceUpdate();
      }
    };
    pluginStore.addEventListener(EventAction.COMPONENT_UPDATE, eventListener);

    return () => {
      pluginStore.removeEventListener(EventAction.COMPONENT_UPDATE, eventListener);
    };
  }, [pluginStore, placement, forceUpdate]);

  let components = pluginStore.executeFunction(EventAction.COMPONENT_MOUNT, placement);

  return (
    <>
      {components.map((compObject: { component: React.ComponentClass; key: string }) => (
        <compObject.component key={compObject.key} />
      ))}
    </>
  );
};
