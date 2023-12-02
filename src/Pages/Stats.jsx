import React from 'react'
import styles from '../CSS/stats.module.css'
import { PieChart } from '@mui/x-charts/PieChart';
import { NavLink, useLoaderData } from 'react-router-dom'
import { getTime } from '../utils/getForLoaders';
import criaHora from '../utils/criaHora';

export async function statsLoader(){

    const response = await getTime()

    console.log(response)
    return response || null
}

const Stats = () => {
    
  const {segundos, segundosDiaAnterior, materiaMaisEstudada} = useLoaderData() || {segundos:0, segundosDiaAnterior:0}

  function calculaRelacaoDiaAnterior(segundos, segundosDiaAnterior){
        let segundosDiaAnterior2 = segundosDiaAnterior
        if(segundosDiaAnterior2 < 60){
            segundosDiaAnterior2 = 60
        }
      
      if(segundos === segundosDiaAnterior2 || segundos < 60){
            return "0"
      }

      const valor = ((segundos-segundosDiaAnterior2) / segundos) 
      console.log(valor)
      if(valor < 1){
            return valor.toFixed(2) * 100
      }


      return segundos > segundosDiaAnterior2 ? valor.toFixed(0) : valor.toFixed(0) 
  }

  return (
    <div className={styles.container}>

           <ul className={styles.links_stats}>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/1'>Hoje</NavLink></li>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/7'>Semana</NavLink></li>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/30'>Mês</NavLink></li>
            </ul>

        <div className={styles.stats1}>

            <ul className={styles.info}>
                <li>
                    <p>Tempo de estudo :</p>
                    <h3>{segundos >= 3600 ? criaHora(segundos,false,true) + "h" : criaHora(segundos,false,false)+ "min"}</h3>
                </li>
                <li>
                    <p>Relação com ontem:</p>
                    <h3 className={calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) > 0 ? styles.positive : styles.negative}>{calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) > 0 ? "+"+calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) : calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior)}%</h3>
                </li>
                <li>
                    <p>Mais estudado :</p>
                    <h3>{materiaMaisEstudada}</h3>
                </li>
            </ul>
        </div>

        <div className={styles.grafico}>

            
        </div>

    </div>
  )
}

export default Stats