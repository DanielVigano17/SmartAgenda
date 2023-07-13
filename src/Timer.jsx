import { useState, useEffect, useRef} from 'react'
import './CSS/main.css'
import styles from './CSS/Timer.module.css'
import MyWorker from './worker?worker'

function Timer(){
/*UseState*/ 
const [isActive, setIsActive] = useState(false);
const [segundos, setSegundos] = useState(3000);
const workerRef = useRef(null);

function criaHora(segundos){
    const data = new Date(segundos*1000); 
  
    return data.toLocaleTimeString('pt-BR',{
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'GMT'
    })
  }


function activeAudio(){
const audioElement = document.querySelector('#audio')
audioElement.play();
}

useEffect(() => {
  workerRef.current = new MyWorker();


  workerRef.current.postMessage({startTime:1500});


  return () => {
    workerRef.current.terminate();
  };
}, []);

useEffect(()=>{

  if(isActive){
     workerRef.current.postMessage({isActive:'start', seconds:segundos});
     workerRef.current.onmessage = function(event) {
      console.log(event.data)
      setSegundos(event.data);
    };
  }else{
    workerRef.current.postMessage('stop');
  }
  
},[isActive])
    
    
if(segundos === 0){
  activeAudio()
  const spans = document.querySelectorAll('.minutes_select')
      setIsActive(!isActive)
      setSegundos(1500)
      spans.forEach(element => {
        element.classList.remove(styles.selected_timer)
      });
      spans[0].classList.add(styles.selected_timer)   
}


const toggle = () => {
      setIsActive(!isActive) 
}

function select(num,event){
  const spans = document.querySelectorAll('.minutes_select')
  const selected_span = event.target
  spans.forEach(element => {
    element.classList.remove(styles.selected_timer)
  });

  selected_span.classList.add(styles.selected_timer)
  setSegundos(num)
  setIsActive(false)
}

    return(
        <div className={styles.pomo}>

        <div className= {styles.timer}>
        <ul>
              <li><span className={`minutes_select ${styles.selected_timer}`} onClick={(e)=>{select(3000,e)}}>Pomodoro</span></li>
              <li><span className={`minutes_select `} onClick={(e)=>{select(600,e)}}>Short Brake</span></li>
              <li><span className={`minutes_select `} onClick={(e)=>{select(900,e)}}>Long Brake</span></li>
          </ul>

    
          <h1>{criaHora(segundos)}</h1>

          <audio id='audio'>
          <source src="alarm-clock.mp3" type="audio/mpeg"></source>
          </audio>
    
          <button  className={isActive ? styles.inactive_button : styles.active_button} onClick={toggle}>{isActive ? "PAUSE" : "START"}</button>
        </div>
        
        </div>

    )
}

export default Timer