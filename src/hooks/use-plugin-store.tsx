import { useContext } from 'react';

import { PluginStore, PluginStoreContext } from '~/core';

export const usePluginStore = (): PluginStore => {
  const context = useContext<PluginStore>(PluginStoreContext);

  if (!context) {
    throw new Error('usePluginStore must be used within SignalRProvider');
  }

  return context;
};
