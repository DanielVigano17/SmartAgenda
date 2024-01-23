import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors
);

export const options = {
  responsive:true,
  maintainAspectRatio: false,
  
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.0)', // Cor das linhas de grade no eixo x
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)', // Cor das labels no eixo x
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Cor das linhas de grade no eixo y
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)', // Cor das labels no eixo x
      },
    },
  },
  plugins: {
    legend: false,

  },
};



export function Grafico_line({timeInfo}){

  const labels = timeInfo.map(objeto => objeto.date.slice(0,5));

  const data = {

    labels: labels,
    datasets: [{
      label: 'Tempo em minutos',
      data: timeInfo.map(objeto => Math.round(objeto.segundos/60)),
      fill: {
          target: 'origin',
          above: 'rgba(75, 192, 192,0.1)',   // Area will be red above the origin
          below: 'rgb(0, 0, 255)'    // And blue below the origin
        },
          borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

    return(
     <Line style={{height:500}} options={options} data={data} />
    )
}