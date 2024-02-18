import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './CSS/main.css'
import router from './routes/route.jsx'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './routes/route.jsx'
import {
  QueryClientProvider,
} from 'react-query'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </React.StrictMode>,
)
