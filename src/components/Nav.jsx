import { useContext, useEffect, useState } from 'react'
import styles from '../CSS/nav.module.css'
import { TimeContext } from '../App';
import Modal from '../Modal';
import { Link } from 'react-router-dom';

function Nav(props) {
  const [isRendered, setIsRendered] = useState(false);
  let timersValues = JSON.parse(localStorage.getItem('timers'));
  const segundos = useContext(TimeContext)
  

  const handleInputChange = (event,index) => {
    timersValues[index] = Number(event.target.value)*60
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.setSegundos(timersValues)
    
    
  }

  function toggle() {
    setIsRendered(!isRendered)
  }

  return (
    <div id={styles.Nav}>
     <div className={styles.container}>
        <ul>
          <li>
          <Link to="/" className={styles.list_button}><img src="/home-icon.svg" alt="" /></Link>
          </li>
          <li>
          <Link to="/agenda" className={styles.list_button}><img src="/calendar-icon.svg" alt="" /></Link>
          </li>
          <li>
          <Link to="/estatisticas/1" className={styles.list_button}><img src="/grafico-icon.svg" alt="" /></Link>
          </li>
        </ul>

        <button className={styles.list_button} onClick={toggle}><img src="/config-icon.svg" alt="" /></button>

        { isRendered && (

          <Modal toggle={toggle}>
          <form  onSubmit={(e)=>{handleSubmit(e)}}>

            <label>Tempo Pomodoro :</label>
            <input type="number" max={60} min={1} onChange={(e)=> {handleInputChange(e,0)}} />

            <label>Tempo intervalo curto :</label>
            <input type="number" max={60} min={1} onChange={(e)=> {handleInputChange(e,1)}} />

            <label>Tempo intervalo longo :</label>
            <input type="number" max={60} min={1} onChange={(e)=> {handleInputChange(e,2)}} />

            <button type="submit">Salvar</button>

          </form>
          </Modal>
        )

        }

     </div>
    </div>
  )
}

export default Nav