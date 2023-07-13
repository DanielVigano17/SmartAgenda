import { useState } from 'react'
import styles from './CSS/nav.module.css'


function Nav() {
  

  return (
    <div id={styles.Nav}>
     <div className={styles.container}>
        <ul>
          <li>
          <button><img src="home-icon.svg" alt="" /></button>
          </li>
          <li>
          <button><img src="calendar-icon.svg" alt="" /></button>
          </li>
          <li>
          <button><img src="grafico-icon.svg" alt="" /></button>
          </li>
        </ul>

        <button className={styles.btn_config}><img src="config-icon.svg" alt="" /></button>

     </div>
    </div>
  )
}

export default Nav