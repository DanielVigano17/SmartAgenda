import styles from './CSS/body.module.css'
import { useState, useEffect} from 'react'
import './CSS/main.css'
import Timer from './Timer'

function Pomo() {
 let tarefas

/*Buscar Tarefa no Local Storage*/
function buscaTarefas(){
  if(localStorage.getItem('tarefas')){
    tarefas=(JSON.parse(localStorage.getItem('tarefas')))
  }else{
    return null
  }
}

buscaTarefas()

 /*Return do Componente*/
    return (
     <div className= 'container'>

        <Timer/>  
        <div className={styles.task}>
            <h1>Taks</h1>

            <ul>
             {  
                tarefas.map((item, index) => (
                  <li key={index}><input type="checkbox" /><span>{item}</span></li>
                ))
             }
            </ul>
        </div>
        
    </div>
    )
  }
  
  export default Pomo