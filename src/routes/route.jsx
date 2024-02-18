import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
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
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Habilita o recarregamento automático quando a janela volta a ter foco para todas as queries
        staleTime:"Infinity"
    },
    },
  });

async function paternLoader({params, request}){

  const isLogged = await authVerification()
  console.log('Patern Loader')
  if(isLogged){
    console.log(window.location.pathname)
    if(window.location.pathname == "/" || window.location.pathname.includes("/materia/")){
        const {listMaterias} =useMateria();
        const materias = await listMaterias();
        return materias
    }

    return null
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
                loader: statsLoader(queryClient),
               
            },
            {
                path:'/lista-materias/',
                element:<ListaMaterias/>,
                loader:LoaderMateria(queryClient),
            },
            {
                path:'materia/:idMateria/delete',
                action:deleteMateria(queryClient),

            },
            {
                path:'/materia/create',
                action:createMateria(queryClient),

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
