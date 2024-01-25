import { useEffect, useState } from "react";
import style from "../CSS/materia.module.css"
import useMateria from "../customHooks/useMateria"
import useTask from "../customHooks/useTask";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useFetchers,useFetcher,useLoaderData, useParams } from "react-router-dom";
import { Grafico_line } from "../components/Grafico_line";


export const createTask = async ({params,request})=>{
 const {createTask} = useTask();
 const formData = await request.formData() 

 let response
 try{
 response = await createTask(formData.get('description'),formData.get('materiaId'));

 }catch(error){
    console.log(error)
    return error
 }

 return response
}

export const deleteTask = async ({params})=>{
    const {deleteTask} = useTask();
    let response
    console.log(params.taskId)
    try{
    response =  await deleteTask(params.taskId);
    }catch(error){
        console.error(error)
        return error
    }
    

    return response
}

export const loaderTaskData = async  ({params})=>{
    const {listTasks} = useTask();
    const {getLastWeekTime} = useMateria();
    let response = { lista:{}, time:{} }
      
    try{
    response.lista = await listTasks(params.materiaId);

    response.time = await getLastWeekTime(params.materiaId)

    }catch(error){
    return error
    }
    return response
}


const DialogButton = () =>{
    const {materiaId} = useParams();
    const fetcher = useFetcher();

    return(
      <>
      <Dialog>
      <DialogTrigger  style={{marginTop:20}} className={"execShadcn " + style.novaMateria}>+</DialogTrigger>
      <DialogContent>
        <div className={style.contentForm}>
      <DialogHeader>
          <DialogTitle>Criando nova tarefa</DialogTitle>
          <DialogDescription>
            Preencha o campo abaixo com a descrição da tarefa que deseja criar e depois clique no botão criar.
          </DialogDescription>
      </DialogHeader>
      <fetcher.Form method='post' action='/createTask'>
        <label>Nome da matéria</label>
        <input type="text" name='description'/>
        <input style={{display:"none"}} type="text" defaultValue={materiaId} name="materiaId" />
        <button type='submit'>Criar</button>
      </fetcher.Form>
        </div>
    </DialogContent>
  </Dialog>
  </>
  
    )
  }

const Materia = () =>{

    const fetchers = useFetchers();
    const fetcher = useFetcher();
    const loaderData =  useLoaderData();
    console.log(loaderData)

    const relevantFetchers = fetchers.filter((fetcher) => {
        return fetcher.formAction?.startsWith(
          `/createTask`
        );
      });


      const myFetchers = new Map(
        relevantFetchers.map(({ formData }) => [
          "description",
          formData.get("description"),
        ])
      );
      
    return(
        <div className={style.container}>
            <div className={style.infos}>
                <div className={style.meta}>
                    <div>
                        <p>Média semanal</p>
                        <button><img src="/lapis-icon.svg" alt="" /></button>
                    </div>
                    <h2>7h</h2>
                </div>

                <div className={style.grafico}>
                    <p>Atividade da semana</p>

                    <div className={style.chartComponent}>
                    <Grafico_line timeInfo={loaderData.time}/>
                    </div>
                    
                </div>
            </div>

            <div className={style.checkList}>
                <p>Checklist da matéria</p>

                <ul>
                    <span className={style.lineCheckList}></span>
                 
                    {
                        loaderData.lista.map((objeto,index)=>(
                            <div key={objeto.id}>
                            <li >
                                <button></button>
        
                                <div className={style.itemList}>
                                    <h2>{objeto.description}</h2>
        
                                    <fetcher.Form method='post' action={`/deleteTask/${objeto.id}`}><button type="submit" className={style.trash}><img src="/trash-icon.svg" alt="" /></button></fetcher.Form>
                                </div>
                            </li>
                            <span className={style.lineCheckList}></span>
                        </div>
                        ))
                        

                    }{
                        myFetchers.get('description') && (
                            <div key={"ui"}>
                            <li >
                                <button></button>
        
                                <div className={style.itemList}>
                                    <h2>{myFetchers.get('description')}</h2>
        
                                    <fetcher.Form method='post' action={`/deleteTask/${"ui"}`}><button type="submit" className={style.trash}><img src="/trash-icon.svg" alt="" /></button></fetcher.Form>
                                </div>
                            </li>
                            <span className={style.lineCheckList}></span>
                        </div>
                        )
                    }
                    <DialogButton />
        
                </ul>
            </div>
        </div>
    )
}

export default Materia