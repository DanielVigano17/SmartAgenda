import { useState,useEffect } from 'react'
import '../CSS/Header.css'
import style from '../CSS/select.module.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

function Header(props) {
const { toast } = useToast()




function toastActive(e){
  props.setMateria(e)
  return toast({
    title: "Mudança na máteria ",
    description:<span>Você mudou a matéria que está sendo estudada para <span className={style.text_toast}>{e}</span> </span>,
  })
}

  return (
    <div className='main'>
     <div className="container-header">
      <h3>Bem-Vindo de volta ao SmartStudy</h3>


    <Select onValueChange={(e)=>{toastActive(e)}}>
    <SelectTrigger className={style.select}>
        <SelectValue placeholder="Matéria" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="Programação">Programação</SelectItem>
        <SelectItem value="Leitura">Leitura</SelectItem>
        <SelectItem value="Empreendedorerismo">Empreendedorismo</SelectItem>
        <SelectItem value="Finanças">Finanças</SelectItem>
    </SelectContent>
    </Select>

 

     </div>
    </div>
  )
}

export default Header