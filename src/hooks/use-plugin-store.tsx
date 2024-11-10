import { useContext } from 'react';

import { PluginStoreContext } from '~/core';

export function usePluginStore() {
  return useContext(PluginStoreContext);
}
