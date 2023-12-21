import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);




const Grafico_circulo = (props) =>{

  const transformarEmMinutos = (arraySegundos = []) =>{

    let arrayEmMinutos = []

    if(arraySegundos[0]){
      
      for(let i=0; i<arraySegundos.length;i++){
        
        arrayEmMinutos.push(Math.round(arraySegundos[i]/60))

        arrayEmMinutos[i] < 1 ? arrayEmMinutos[i] = 1 : null
        

      }

      return arrayEmMinutos
    }else{
      return arraySegundos
    }

  }

 const data = {
    labels: [],
    datasets: [
      {
        label: 'Minutos de estudo',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        
        borderWidth: 1,
        borderRadius:8,
        
        layout: {
          padding: 20
      }
      },
    ],
  };

    data.labels = props.nomeMaterias
    data.datasets[0].data = transformarEmMinutos(props.tempoMaterias)

    return <Doughnut data={data} />;
    
}

export default Grafico_circulo