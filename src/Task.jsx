import styles from './CSS/body.module.css'
import { useState, useEffect} from 'react'
import { useLoaderData,useNavigation } from 'react-router-dom'
import './CSS/main.css'
import Timer from './Timer'
import Modal from './Modal'
import initAOS from './utils/aosConfig'

function Pomo(props) {
  
 const navigation = useNavigation();
 const [tarefas,setTarefas] = useState([])
 const [isRendered, setIsRendered] = useState(false);
 const [inputValue, setInputValue] = useState('');

 
 const toggle = () => {
   setIsRendered(!isRendered)
    
 }  
 
 const handleInputChange = (event) => {
     setInputValue(event.target.value);
   };
 
 function salvarTarefa(event){
   event.preventDefault();
   let objeto = []
   
   if(localStorage.getItem('tarefas')){
     objeto=(JSON.parse(localStorage.getItem('tarefas')))
     objeto.push({text :inputValue, completed:false})
    
     
   }else{ 
     
     objeto.push({text :inputValue, completed:false})
   }
 
   localStorage.setItem('tarefas', JSON.stringify(objeto));
  
   setTarefas(JSON.parse(localStorage.getItem('tarefas')))
   
   setInputValue('');
 };
 


useEffect(()=>{

  function buscarTarefas(){

    if(localStorage.getItem('tarefas')){

      setTarefas(JSON.parse(localStorage.getItem('tarefas')))  
      
    }else{

      return null

    }
    
  }
  initAOS()
  buscarTarefas()
  
},[])




function tacharTarefa(index){
 
  const updatedTasks = [...tarefas];
  updatedTasks[index].completed = !updatedTasks[index].completed;
  setTarefas(updatedTasks);

}
const removerTarefa = (index)=>{

  let newtarefas = [...tarefas]
  newtarefas.splice(index,1)
  setTarefas(newtarefas)
  localStorage.setItem('tarefas', JSON.stringify(newtarefas));

}

    return (
     <div className={
      navigation.state === "loading" ? "desaparecer" : styles.container
    }>

        <Timer />  
        <div data-aos="fade-left" className={styles.task}>
            <h2>Task</h2>

            <ul>
            {
              tarefas.map((item, index) => (
               
              <li key={index}>

              <div className={styles.content_text}>

              <button className={styles.tachar_btn} onClick={()=>{tacharTarefa(index)}}>{item.completed ? "X" : ""}</button>

              <span className={`taf ${item.completed ? styles.tachado : ''}`}>{item.text}</span>

              </div>

              <span onClick={()=>{removerTarefa(index)}} className={styles.trash} ><img src="trash-icon.svg" alt="" /></span>
   
        
              </li>
              ))

      
             }
            </ul>

            <button onClick={toggle} className={styles.add_btn}>Adicionar</button>

            {isRendered && 
    ( <Modal toggle={toggle}>
        <form className='form_modal' onSubmit={(e)=>{salvarTarefa(e)}}>

        <input type="text" value={inputValue} onChange={handleInputChange} />
        
        <button type="submit">Salvar</button>

        </form>
      </Modal>
      )}
        </div>
        
    </div>
    )
  }
  
  export default Pomo