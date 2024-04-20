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
import { listMateriasQuery } from '../Pages/ListaMaterias'

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Habilita o recarregamento automático quando a janela volta a ter foco para todas as queries
        staleTime:"Infinity"
    },
    },
  });

async function homeLoader({params, request, ListaMateriasQuery}){

  const isLogged = await authVerification()

  if(isLogged){

        const query = listMateriasQuery();
        return (
            queryClient.getQueryData(query.queryKey) ??
            (await queryClient.fetchQuery(query))
          )
  }else{
    return redirect('/login')
  }

}

async function authLoader({params, request}){

    const isLogged = await authVerification()
    console.log('Auth Loader')
    if(isLogged){
      return null
    }else{
      return redirect('/login')
    }
  
  }

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader:authLoader,
        children: [
            {
                path: '/home',
                element: <Pomo />,
                loader: homeLoader,
                id: 'homeLoader',
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
                id:'listMaterias',
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
