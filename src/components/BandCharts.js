import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BandChart = () => {

    const [data, setData] = useState({datasets: []});
    const [options, setOptions] = useState({});
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setData({
                labels: bands.map(x => x.name),
                datasets: [
                    {
                        data: bands.map(x => x.votes),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            })
            setOptions({
                responsive: true,
                plugins: {

                }
            })
        });
        return () => socket.off('current-bands');
      }, [socket]);
    return (<Bar options={options} data={data} />);
}
