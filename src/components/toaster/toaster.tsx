import React, { memo } from 'react';
import toast, { Toaster as LibToaster } from 'react-hot-toast';

export const Toaster = memo(() => {
  return (
    <LibToaster
      position='bottom-center'
      toastOptions={{
        style: {
          background: '#000',
          color: '#fff',
          borderRadius: '12px',
        },
        className: 'toaster',
      }}
      containerClassName='toaster_container'
    />
  );
});

export const runToaster = (message: string) => {
  if (process.env.NODE_ENV !== 'development') {
    toast.error('error');
    return;
  }

  const errorMessage = `Error: ${message}`;
  toast.error(errorMessage);
};

Toaster.displayName = 'Toaster';
