import React from 'react';
import { SocketProvider } from './context/SocketContext';
import HomePage from './pages/HomePage';

export const BandNameApp = () => {
    return(
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}