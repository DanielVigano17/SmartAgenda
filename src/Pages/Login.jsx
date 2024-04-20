import React from 'react'
import style from '../CSS/login.module.css'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { postLogin } from '../utils/auth'
import { authVerification } from '../utils/authVerification'

export async function loginLoader({params, request}){

  const isLogged = await authVerification()
  if(isLogged){
    return redirect('/home')
  }else{
    return null
  }


}

export async function loginAction({params,request}){
    
const formData = await request.formData()


try{
  await postLogin(formData.get('email'), formData.get('password'))
}catch(err){
  console.error(err)
  return "Email ou senha inválido"
}


return redirect('/home')
    
}

export const Login = () => {
  const possivelLoginErro = useActionData()

  return (
    <div className={style.container}>

        <Form method='post' className={style.form_login}>

            <label>Email :</label>
            <input type="email" name='email' />
            
            <label>Password :</label>
            <input type="password" name='password' />
            {
              possivelLoginErro ? <p className={style.login_erro}>{possivelLoginErro}</p> : null
            }
            <button type='submit'>Login</button>

            <p>Não possui login? <Link to="/cadastro">Cadastre-se</Link></p>
        </Form>

    </div>
  )
}

export default Login