import { useState, useEffect, useRef} from 'react'
import styles from './CSS/body.module.css'

function Timer(){
/*UseState*/ 
const [isActive, setIsActive] = useState(false);
const [segundos, setSegundos] = useState(1500);


function criaHora(segundos){
    const data = new Date(segundos*1000); 
  
    return data.toLocaleTimeString('pt-BR',{
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'GMT'
    })
  }



function teste(){
  const audioElement = document.querySelector('#audio')
    
 

    audioElement.play();




}

useEffect(() => {
   
    if(isActive){
      const interval = setInterval(()=>{
        setSegundos(segundos => segundos - 1);
    
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }
    
     }, [isActive]);
    
    
if(segundos === 0){
  teste()
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
              <li><span className={`minutes_select ${styles.selected_timer}`} onClick={(e)=>{select(1500,e)}}>Pomodoro</span></li>
              <li><span className={`minutes_select `} onClick={(e)=>{select(300,e)}}>Short Brake</span></li>
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