
import './CSS/App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import { createContext,useEffect,useState }  from 'react';
import Pomo from './Task'
import { Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
export const TimeContext = createContext(null);


function App() {

  const user = useLoaderData();
  console.log(user.uid)
  const [segundos, setSegundos] = useState(localStorage.getItem('timers') ? JSON.parse(localStorage.getItem('timers')) : [1500,300,900]);
  
  useEffect(()=>{
    localStorage.setItem('timers', JSON.stringify(segundos));
  },[segundos])

  return (
  <TimeContext.Provider value={segundos}>
      
      <div className='grid-container'>

      <Nav setSegundos={setSegundos}/>

      <div className='content'>

      <Header />
      <Outlet context={[user.uid]}/>
      
      </div>

      </div>
      
  </TimeContext.Provider>
  )
}


export default App
   