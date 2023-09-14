import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Pomo from '../Task'
import Stats from '../Pages/Stats'
import { statsLoader } from '../Pages/Stats'
import Login from '../Pages/Login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
    }
])

export default router
