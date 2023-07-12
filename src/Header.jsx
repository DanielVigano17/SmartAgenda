import { useState,useEffect } from 'react'
import './CSS/Header.css'


function Header() {
const [isRendered, setIsRendered] = useState(false);
const [tarefas, setTarefas] = useState([])
const [inputValue, setInputValue] = useState('');


const toggle = () => {
  setIsRendered(!isRendered)
   
}  

const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

function handleSubmit(event){
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



  return (
    <div className='main'>
     <div className="container">
      <h3>Bem-Vindo de volta ao SmartStudy</h3>


    <button onClick={toggle} className='header_btn'>Adicionar</button>

 

     </div>
    </div>
  )
}

export default Header