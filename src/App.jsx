
import './CSS/App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import { createContext,useEffect,useState }  from 'react';
import Pomo from './Task'
import { Outlet,useLoaderData, useNavigation } from 'react-router-dom';
import Loading from './components/Loading';
export const TimeContext = createContext(null);
export const MateriaSelecionada = createContext(null);
import { Toaster } from "@/components/ui/toaster"

function App() {

  const navigation = useNavigation();
  const user = useLoaderData();

  const [segundos, setSegundos] = useState(localStorage.getItem('timers') ? JSON.parse(localStorage.getItem('timers')) : [1500,300,900]);
  const [materia, setMateria]= useState(null);
  
  useEffect(()=>{
    localStorage.setItem('timers', JSON.stringify(segundos));
  },[segundos])

  return (
  <TimeContext.Provider value={segundos}>
    <MateriaSelecionada.Provider value={materia}>
      <div className='grid-container'>

      <Nav setSegundos={setSegundos}/>

      <div className='content'>
 
      <Header setMateria={setMateria}/>
      <Toaster/>

      {navigation.state === "loading" ? <Loading/> : <Outlet context={[user.uid]} />}
      
      </div>

      </div>
    </MateriaSelecionada.Provider>
  </TimeContext.Provider>
  )
}


export default App
   