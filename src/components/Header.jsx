import '../CSS/Header.css'
import style from '../CSS/select.module.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from "@/components/ui/use-toast"
import { DialogFooter } from './ui/dialog'
import { Form, useLoaderData } from 'react-router-dom'


const DialogButton = () =>{

  return(
  <Dialog>
    <DialogTrigger className={"execShadcn " + style.novaMateria}>Nova matéria</DialogTrigger>
    <DialogContent>
      <div className={style.contentForm}>
    <DialogHeader>
        <DialogTitle>Criando nova matéria</DialogTitle>
        <DialogDescription>
          Preencha o campo abaixo com o nome da matéria que deseja criar e depois clique no botão criar.
        </DialogDescription>
    </DialogHeader>
    <Form method='post' action='/materia/create'>
      <label>Nome da matéria</label>
      <input type="text" name='nameMateria'/>
      <button type='submit'>Criar</button>
    </Form>
      </div>
  </DialogContent>
</Dialog>
  )
}

const SelectButton = (props) =>{
const { toast } = useToast();

const materias = useLoaderData();

function toastActive(e){
  props.setMateria(e)
  return toast({
    title: "Mudança na máteria ",
    description:<span>Você mudou a matéria que está sendo estudada para <span className={style.text_toast}>{e}</span> </span>,
  })
}

  return(
    <Select onValueChange={(e)=>{toastActive(e)}}>
    <SelectTrigger className={style.select}>
        <SelectValue placeholder="Matéria" />
    </SelectTrigger>
    <SelectContent>
        {
          materias.map((objeto)=>(

            <SelectItem value={objeto.nameMateria} key={objeto.id}>{objeto.nameMateria}</SelectItem>
          ))
        }

    </SelectContent>
    </Select>
  )
}


function Header(props) {


  return (
    <div className='main'>
     <div className="container-header">
      <h3>Bem-Vindo de volta ao SmartStudy</h3>

      {
        window.location.pathname === "/lista-materias/" ? <DialogButton>Nova matéria</DialogButton> : <SelectButton setMateria={props.setMateria}/>
      }


     </div>
    </div>
  )
}

export default Header