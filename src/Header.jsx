import { useState,useEffect } from 'react'
import './CSS/Header.css'
import Modal from './Modal'

function Header() {
const [isRendered, setIsRendered] = useState(false);
const [inputValue, setInputValue] = useState('');

const toggle = () => {
  setIsRendered(!isRendered)
   
}  



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  let objeto = []
  
  if(localStorage.getItem('tarefas')){
    objeto=(JSON.parse(localStorage.getItem('tarefas')))
    objeto.push(inputValue)
  }else{ 
    
    objeto.push(inputValue) 
  }

  localStorage.setItem('tarefas', JSON.stringify(objeto));
  setInputValue('');
};

  return (
    <div className='main'>
     <div className="container">
      <h3>Bem-Vindo de volta, Daniel</h3>


    <button onClick={toggle} className='header_btn'>Adicionar</button>

    {isRendered && 
    ( <Modal toggle={toggle}>
        <form className='form_modal' onSubmit={handleSubmit}>

        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Salvar</button>

        </form>
      </Modal>
      )}

   

     </div>
    </div>
  )
}

export default Header