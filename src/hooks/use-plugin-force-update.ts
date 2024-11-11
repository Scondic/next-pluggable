import { useCallback, useState } from 'react';

export type usePluginForceUpdateReturn = {
  forceUpdate: () => void;
};

export const usePluginForceUpdate = (): usePluginForceUpdateReturn => {
  const [, dispatch] = useState<{}>(Object.create(null));

  const memoCallback = useCallback((): void => {
    dispatch(Object.create(null));
  }, [dispatch]);

  return { forceUpdate: memoCallback };
};
