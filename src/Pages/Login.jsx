import React from 'react'
import style from '../CSS/login.module.css'
import { Form } from 'react-router-dom'

export async function loginAction(){
    
    
}

const Login = () => {
  return (
    <div className={style.container}>

        <Form method='post' className={style.form_login}>

            <label>Email :</label>
            <input type="email" name='email' />
            
            <label>Password :</label>
            <input type="text" name='password' />

            <button type='submit'>Login</button>

            <p>Não possui login? <span>Cadastre-se</span></p>
        </Form>

    </div>
  )
}

export default Login