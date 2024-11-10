import { PropsWithChildren } from 'react';

import { PluginStore } from './plugin-store';

export type PluginStoreProps = {
  pluginStore: PluginStore;

  getPluginName(): string;

  getDependencies(): string[];

  init(pluginStore: PluginStore): void;

  activate(): void;

  deactivate(): void;
};

export type PluginProviderProps = PropsWithChildren<{
  pluginStore: PluginStore;
}> & {};

export type PluginStoreRendererProps = {
  placement: string;
};
