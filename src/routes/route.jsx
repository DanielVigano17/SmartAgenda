import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import { auth } from "../utils/firebaseConfig";
import App from '../App'
import Pomo from '../Task'
import Stats from '../Pages/Stats'
import ListaMaterias, { LoaderMateria,deleteMateria,createMateria } from '../Pages/ListaMaterias';
import { statsLoader } from '../Pages/Stats'
import {Login, loginAction, loginLoader} from '../Pages/Login'
import {PageCadastro, cadastroAction, cadastroLoader} from '../Pages/Cadastro'
import { authVerification } from '../utils/authVerification';
import Materia, { createTask, deleteTask, loaderTaskData } from '../Pages/materia';
import useMateria from '../customHooks/useMateria';


async function paternLoader({params, request}){

  const isLogged = await authVerification()
  if(isLogged){
    const {listMaterias} =useMateria();

    const materias = await listMaterias();
    return materias
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
                path: '/estatisticas/:intervaloDeDias',
                element: <Stats />,
                loader: statsLoader,
               
            },
            {
                path:'/lista-materias/',
                element:<ListaMaterias/>,
                loader:LoaderMateria,
            },
            {
                path:'materia/:idMateria/delete',
                action:deleteMateria,

            },
            {
                path:'/materia/create',
                action:createMateria,

            },
            {
                path:'/materia/:materiaId',
                element:<Materia/>,
                loader:loaderTaskData,
            },
            {
                path:'/createTask',
                action:createTask,
            },
            {
                path:"/deleteTask/:taskId",
                action:deleteTask,
            }

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
