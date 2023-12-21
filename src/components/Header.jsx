import { useState,useEffect } from 'react'
import '../CSS/Header.css'
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Select from './Select';

function Header() {

const navigate = useNavigate();

async function logout(){
    try {
      await auth.signOut();
      console.log('Logout realizado com sucesso');
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:');
    }
  }

  return (
    <div className='main'>
     <div className="container-header">
      <h3>Bem-Vindo de volta ao SmartStudy</h3>


    {/* <button className='header_btn' onClick={logout}>Sair</button> */}
    <Select/>

 

     </div>
    </div>
  )
}

export default Header