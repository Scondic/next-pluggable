import React from 'react';

import { PluginStoreContext } from './plugin-store.context';
import { PluginProviderProps } from './plugin-store.types';

export const PluginStoreProvider: React.FC<PluginProviderProps> = ({
  pluginStore,
  children,
}) => {
  return (
    <PluginStoreContext.Provider value={pluginStore}>
      {children}
    </PluginStoreContext.Provider>
  );
};
