import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import React from 'react';
import { WatchList } from '../screens/watchlist/WatchList';
import { Search } from '../screens/find/Search';
import eruda from 'eruda';
import { TgStorageProvider } from '@src/contexts/tg-storage';
import { Detail } from '../screens/detail/Detail';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Feed } from '../screens/feed/Feed';
import { Toaster } from './toaster';
import { MovieStorageProvider } from '@src/contexts/movies-storage';

if (process.env.NODE_ENV === 'development') {
  eruda.init();
}
export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Feed />,
    },
    {
      path: '/feed/:id',
      element: <Detail />,
    },
    {
      path: '/feed',
      element: <Feed />,
    },
    {
      path: '/watch',
      element: <WatchList />,
    },
    {
      path: '/watch/:id',
      element: <Detail />,
    },
    {
      path: '/search',
      element: <Search />,
    },
  ]);
  return (
    <WebAppProvider>
      <TgStorageProvider>
        <MovieStorageProvider>
          <RouterProvider router={router} />
          <Toaster />
        </MovieStorageProvider>
      </TgStorageProvider>
    </WebAppProvider>
  );
};
