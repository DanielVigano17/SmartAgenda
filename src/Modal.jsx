import styles from './CSS/modal.module.css'
import { useState, useEffect} from 'react'

function Modal(props){

    return(
        
        <div className={styles.modal}>
            <div className={styles.modal_content}>
              <span  onClick={props.toggle} className={styles.modal_close}>&times;</span>

                <div>{props.children}</div>
            
            </div>

        </div>
    )
}

export default Modal;