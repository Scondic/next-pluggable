import { useCallback, useState } from 'react';

export type usePluginForceUpdateReturn = () => void;

export const usePluginForceUpdate = (): usePluginForceUpdateReturn => {
  const [, dispatch] = useState<{}>(Object.create(null));

  return useCallback((): void => {
    dispatch(Object.create(null));
  }, [dispatch]);
};
