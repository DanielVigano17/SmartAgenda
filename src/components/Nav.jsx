import { useContext, useEffect, useState } from 'react'
import styles from '../CSS/nav.module.css'
import { TimeContext } from '../App';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebaseConfig";

function Nav(props) {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);
  let timersValues = JSON.parse(localStorage.getItem('timers'));
  const segundos = useContext(TimeContext)
  
  async function logout(){
    try {
      await auth.signOut();
      console.log('Logout realizado com sucesso');
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:'+error);
    }
  }

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
          <Link to="/" reloadDocument className={styles.list_button}><img src="/home-icon.svg" alt="" /></Link>
          </li>
          <li>
          <Link to="/agenda" className={styles.list_button}><img src="/calendar-icon.svg" alt="" /></Link>
          </li>
          <li>
          <Link to="/estatisticas/1" className={styles.list_button}><img src="/grafico-icon.svg" alt="" /></Link>
          </li>
          <li>
          <Link to="/lista-materias/" className={styles.list_button}><img src="/book-icon.svg" alt="" /></Link>
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
         
            <button className={styles.button_modal} type="submit">Salvar</button>
            
          </form>
          <button className='header_btn' onClick={logout}>Sair</button>
          </Modal>
        )

        }

     </div>
    </div>
  )
}

export default Nav