import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import socketIO from 'socket.io-client';
import { server } from './constants';

const socketId = socketIO(server, { transports: ['websocket'] });

const App = () => {
  
  useEffect(() => {
    socketId.on('connection', () => {
    });
  }, []);
  return (
    <>
      {/* <Header /> */}
      <div className="">
        <Outlet />
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 1000,
          style: {
            background: '#fff',
            color: '#363636',
          },
        }}
      />
    </>
  );
};

export default App;
