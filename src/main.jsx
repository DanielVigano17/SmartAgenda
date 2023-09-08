import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/main.css'
import router from './routes/route.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
