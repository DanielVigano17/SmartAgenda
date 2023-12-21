import React, { useEffect } from 'react'
import styles from '../CSS/stats.module.css'
import { NavLink, useLoaderData, useParams, useLocation } from 'react-router-dom'
import { getTime } from '../utils/getForLoaders';
import criaHora from '../utils/criaHora';
import Grafico_circulo from '../components/Grafico_cir';
import initAOS from '../utils/aosConfig';


export async function statsLoader({params}){

    const response = await getTime(params.intervaloDeDias)

    console.log(response)
    return response || null
}

const Stats = () => {

  const {segundos, segundosDiaAnterior, materiaMaisEstudada, nomesMaterias, tempoMaterias} = useLoaderData() || {segundos:0, segundosDiaAnterior:0}

  let {intervaloDeDias} = useParams()

  useEffect(()=>{
    initAOS()
    console.log('Passei aqui')
  },[intervaloDeDias])

  function mudarTexto(intervaloDeDias){
    if(intervaloDeDias == 7){
      return "Relação com semana passada:"
  }else if(intervaloDeDias == 30){
    return "Relação com mês passado:"
  }else{
    return "Relação com ontem:"
  }

  }


  function calculaRelacaoDiaAnterior(segundos, segundosDiaAnterior){

        let minutosDiaAnterior2 = Math.round(segundosDiaAnterior/60)
        let minutos = Math.round(segundos/60)

        minutosDiaAnterior2 < 1 ? minutosDiaAnterior2 = 1 : null
        minutos < 1 ? minutos = 1 : null

      if(minutos === minutosDiaAnterior2){
            return "0"
      }

      const valor = ((minutos-minutosDiaAnterior2) / minutosDiaAnterior2) 

      if(valor < 1){
            return valor.toFixed(2) * 100
      }else if(valor >= 1){
        return valor * 100
    }


      return minutos > minutosDiaAnterior2 ? valor.toFixed(2) : valor.toFixed(2) 
  }

  return (
    <div className={styles.container}>

           <ul className={styles.links_stats}>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/1'>Hoje</NavLink></li>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/7'>Semana</NavLink></li>
                <li><NavLink className={({isActive, isPending})=> isPending ? "" : isActive ? styles.selected : ""} to='/estatisticas/30'>Mês</NavLink></li>
            </ul>

        <div data-aos="zoom-in" className={styles.stats1}>

            <ul className={styles.info}>
                <li  data-aos="zoom-in">
                    <p>Tempo de estudo :</p>
                    <h3>{segundos >= 3600 ? criaHora(segundos,false,true) + "h" : criaHora(segundos,false,false)+ "min"}</h3>
                </li>
                <li  data-aos="zoom-in">
                    <p>{mudarTexto(intervaloDeDias)}</p>
                    <h3 className={calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) > 0 ? styles.positive : styles.negative}>{calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) > 0 ? "+"+calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior) : calculaRelacaoDiaAnterior(segundos,segundosDiaAnterior)}%</h3>
                </li>
                <li  data-aos="zoom-in">
                    <p>Matéria mais estudada :</p>
                    <h3>{materiaMaisEstudada}</h3>
                </li>
            </ul>
        </div>

        <div className={styles.stats2}>

            <div data-aos="zoom-in" className={styles.grafico}>

            <p>Matérias mais estudadas :</p>
            

          {nomesMaterias ? (
            <div className={styles.tamanho_grafico}>
            <Grafico_circulo nomeMaterias={nomesMaterias} tempoMaterias={tempoMaterias}/>
            </div>
          ) : (
          <p className={styles.no_search}>Nenhum dado disponível</p>
          )}

         

            </div>

            <div data-aos="zoom-in" className={styles.grafico}>


            </div>

        </div>

    </div>
  )
}

export default Stats