import { createContext } from 'react';

import { PluginStore } from './plugin-store';

export const PluginStoreContext = createContext(new PluginStore());
