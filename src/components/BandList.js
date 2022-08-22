import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
export const BandList = () => {
    const [bands, setBands] = useState([]);
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        });
        return () => socket.off('current-bands');
      }, [socket]);

    const changeName = (event, id) => {
        const newName = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }));

    }

    const onBlurName = (id, nombre) => {
        socket.emit('change-name', {id, name: nombre});
    }

    const vote = (id) => {
        socket.emit('vote-band', id);
    }
    const deleteBand = (id) => {
        socket.emit('delete-band', id);
    }
    const createRows = () => {
        const rows = bands.map((band) => (
            <tr key={band.id}>
                <td>
                    <button onClick={() => vote(band.id)}
                            className='btn btn-primary'>+1
                    </button>
                </td>
                <td>
                    <input className='form-control'
                            onBlur={() => onBlurName(band.id, band.name )}
                            onChange={(event) => changeName(event, band.id)} 
                            value={band.name} />
                </td>
                <td>
                    <h3>{band.votes}</h3>
                </td>
                <td>
                    <button onClick={() => deleteBand(band.id)}
                    className='btn btn-danger'>
                        Eliminar
                    </button>
                </td>
            </tr>
        ));
        return (rows);
    }
    return(
        <>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}