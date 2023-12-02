import React from 'react'
import style from '../CSS/login.module.css'
import { Form, Link, redirect } from 'react-router-dom'
import { postCadastro } from '../utils/auth'
import { authVerification } from '../utils/authVerification'

export async function cadastroLoader({params,request}){
  
  const isLogged = await authVerification()
  if(isLogged){
    return redirect('/')
  }else{
    return null
  }
}

export async function cadastroAction({params,request}){
    
const formData = await request.formData()

try{
  const statusCadastro = await postCadastro(formData.get('email'), formData.get('password'))
}catch(err){
  console.error(err)
  return null
}

return redirect('/')
    
}

export const PageCadastro = () => {
  return (
    <div className={style.container}>

        <Form method='post' className={style.form_login}>

            <label>Email :</label>
            <input type="email" name='email' />
            
            <label>Password :</label>
            <input type="text" name='password' />

            <button type='submit'>Cadastrar</button>

            <p>Já possui uma conta cadastrada? <br /> <Link to="/login">Faça Login</Link></p>
        </Form>

    </div>
  )
}

