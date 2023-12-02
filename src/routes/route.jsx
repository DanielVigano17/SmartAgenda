import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import { auth } from "../utils/firebaseConfig";
import App from '../App'
import Pomo from '../Task'
import Stats from '../Pages/Stats'
import { statsLoader } from '../Pages/Stats'
import {Login, loginAction, loginLoader} from '../Pages/Login'
import {PageCadastro, cadastroAction, cadastroLoader} from '../Pages/Cadastro'
import { authVerification } from '../utils/authVerification';


async function paternLoader({params, request}){

  const isLogged = await authVerification()
  if(isLogged){
    return isLogged
  }else{
    return redirect('/login')
  }



}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: paternLoader,
        children: [
            {
                path: '/',
                element: <Pomo />,
            },
            {
                path: '/agenda',
                element: <h1>Agenda</h1>,
            },
            {
                path: '/estatisticas/:date',
                element: <Stats />,
                loader: statsLoader,
               
            },
        ],
    },{
        path: '/login',
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
    },{
        path: '/cadastro',
        element: <PageCadastro />,
        action: cadastroAction,
        loader: cadastroLoader,

    }
])

export default router
