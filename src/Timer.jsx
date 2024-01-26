import { useState, useEffect, useRef, useContext} from 'react'
import './CSS/main.css'
import styles from './CSS/Timer.module.css'
import criaHora from './utils/criaHora'
import { MateriaSelecionada, TimeContext } from './App'
import MyWorker from './worker?worker'
import { axiosInstance }  from './utils/axiosConfig'
import { authVerification } from './utils/authVerification'
import { useOutletContext } from 'react-router-dom'
import initAOS from './utils/aosConfig'
import useTime from './customHooks/useTime'

function Timer(props){

const [userId] = useOutletContext()
const [isActive, setIsActive] = useState(false);
const segundos = useContext(TimeContext);
const materia = useContext(MateriaSelecionada)
const [quantidadeSec, setQuantidadeSec] = useState(segundos[0]);
const workerRef = useRef(null);



function activeAudio(){
  
const audioElement = document.querySelector('#audio')
audioElement.play();
}

useEffect(()=>{
  select(0,null,false)
},[segundos])

useEffect(()=>{

  const spans = document.querySelectorAll('.minutes_select')

  if(spans[0].classList.contains(styles.selected_timer) && quantidadeSec === 1){
    const {updateTime} = useTime();
    updateTime({segundos:segundos[0],nameMateria:materia});
 
   }
  
},[quantidadeSec])

useEffect(() => {
  workerRef.current = new MyWorker();


  workerRef.current.postMessage({startTime:1500});
  setQuantidadeSec(segundos[0])
  initAOS()
  return () => {
    workerRef.current.terminate();
  };
}, []);

useEffect(()=>{

  if(isActive){
    
     workerRef.current.postMessage({isActive:'start', seconds:quantidadeSec});
     workerRef.current.onmessage = function(event) {
     setQuantidadeSec(event.data);

    };
  }else{
    workerRef.current.postMessage('stop');


  }
  
},[isActive])
    
    
if(quantidadeSec === 0){

  activeAudio()
  const spans = document.querySelectorAll('.minutes_select')
      setIsActive(!isActive)
      setQuantidadeSec(segundos[0])
      spans.forEach(element => {
        element.classList.remove(styles.selected_timer)
      });
      spans[0].classList.add(styles.selected_timer)   

}

const toggle = () => {
      setIsActive(!isActive) 


}

function select(num,event, flagSeFoiExecutadoPeloBotão){
  const {updateTime} = useTime();

  const spans = document.querySelectorAll('.minutes_select')


  const selected_span = event ? event.target : spans[num]

  if(spans[0].classList.contains(styles.selected_timer) && quantidadeSec !== segundos[0] && quantidadeSec !== 1 && flagSeFoiExecutadoPeloBotão){
    updateTime({segundos: segundos[0] - quantidadeSec,nameMateria:materia});
   
  }
  
  spans.forEach(element => {
    element.classList.remove(styles.selected_timer)
  });

  selected_span.classList.add(styles.selected_timer)
  setQuantidadeSec(segundos[num])
  setIsActive(false)

}

    return(
        <div data-aos="fade-right" className={styles.pomo}>

        <div className= {styles.timer}>
        <ul>
              <li><span className={`minutes_select ${styles.selected_timer}`} onClick={(e)=>{select(0,e,true)}}>Pomodoro</span></li>
              <li><span className={`minutes_select `} onClick={(e)=>{select(1,e,true)}}>Short Brake</span></li>
              <li><span className={`minutes_select `} onClick={(e)=>{select(2,e,true)}}>Long Brake</span></li>
          </ul>

    
          <h1>{criaHora(quantidadeSec)}</h1>

          <audio id='audio'>
          <source src="alarm-clock.mp3" type="audio/mpeg"></source>
          </audio>
    
          <button  className={isActive ? styles.inactive_button : styles.active_button} onClick={toggle}>{isActive ? "PAUSE" : "START"}</button>
        </div>
        
        </div>

    )
}

export default Timer