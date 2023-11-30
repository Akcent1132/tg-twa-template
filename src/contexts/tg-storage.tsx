import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCloudStorage } from '@vkruglikov/react-telegram-web-app';
import toast from 'react-hot-toast';
export const TgStorageContext = createContext(undefined);

export const TgStorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useCloudStorage();
  const [watchList, setWatchList] = useState<number[]>([]);
  const addToWatchList = (id: number) => {
    setWatchList(() => [...watchList, id]);
    store.setItem('watchlist', JSON.stringify([...watchList, id]));
    toast.success('Successfully added');
  };
  const removeFromWatchList = (id: number) => {
    let data = Array.from(new Set(watchList));
    delete data[watchList.indexOf(id)];
    setWatchList(data);
    toast.error('Removed from watchlist');
    store.setItem('watchlist', JSON.stringify(data));
  };
  const cleanStorage = () => {
    store.setItem('watchlist', JSON.stringify([]));
  };

  useEffect(() => {
    store.getItem('watchlist').then((data) => {
      if (data) {
        setWatchList(JSON.parse(data));
      } else {
        store.setItem('watchlist', JSON.stringify([]));
        setWatchList([]);
      }
    });
  }, []);

  return (
    <TgStorageContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList, cleanStorage }}
    >
      {children}
    </TgStorageContext.Provider>
  );
};
export const useTgStorage = () => {
  const ctx = useContext(TgStorageContext);

  if (!ctx) {
    throw new Error('useTgStorage should be used inside TgStorageContext');
  }

  return ctx;
};
