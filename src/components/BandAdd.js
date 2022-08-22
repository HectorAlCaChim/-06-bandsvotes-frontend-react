import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = ({createBand}) => {
    const [value, setValue] = useState('');
    const {socket} = useContext(SocketContext);

    const onSubmit = (ev) =>{
        ev.preventDefault();

        if(value.trim().length > 0) {
            socket.emit('create-band', {name: value});
            setValue('')
        }
    }
    return (
    <>
        <h3>Agregar Banda</h3>
        <form onSubmit={onSubmit}>
            <input
                className='form-control'
                placeholder='Nuevo Nombre de Banda'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </form>
    </>
    )
}