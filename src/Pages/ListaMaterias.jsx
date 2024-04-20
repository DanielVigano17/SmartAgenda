import style from  "../CSS/listaMateria.module.css"
import { Link, useLoaderData, useFetcher } from "react-router-dom";
import useMateria from "../customHooks/useMateria";
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";


const {listMaterias} = useMateria();

export const listMateriasQuery = () => ({
    queryKey: 'materias',
    queryFn: async () => listMaterias(),
    staleTime: "Infinity",

  })
  
export const createMateria = (queryClient) =>async ({params,request}) =>{

    const {createMateria} = useMateria();
    const query = listMateriasQuery();
    const formData = await request.formData()

        
        console.log(formData.get('nameMateria'))
        let result
        try{
            result = await createMateria(formData.get('nameMateria'))
            
        }catch(error){
            return error
        }
        
    await queryClient.fetchQuery(query)
    return result
 
}

export const deleteMateria = (queryClient) => async ({params}) =>{
    const {deleteMateria} =  useMateria();
    const query = listMateriasQuery();
    let result
    try{
        result = await deleteMateria(Number(params.idMateria))
       
    }catch(error){
        console.log(error)
        return error
    }
    
await queryClient.fetchQuery(query)
return result
 
}


export const LoaderMateria = (queryClient) => async ({params}) =>{
     const query = listMateriasQuery();
     return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
      )
}


const ListaMaterias = ()=>{
    
    const {toast} = useToast();
    const fetcher = useFetcher();
    const materias = useLoaderData();

    function toastActive(){
        
        if(fetcher.data && fetcher.state === "idle"){
            return toast({
              title: "Matéria excluida com sucesso",
              description:<span>Você excluiu uma  matéria com o nome de <span className={style.text_toast}>{fetcher.data.nameMateria}</span> </span>,
            })
          }
          return null
        
    }

    useEffect(()=>{
        toastActive();
    },[fetcher])

    
    return(
        <div >
        <ul className={style.lista}>
           
           {
            materias.map((objeto,index)=>(
            
            <li key={index}>
                <h2>{objeto.nameMateria}</h2>

                <div className={style.lista_botao}> 
                    <fetcher.Form method="post" action={`/materia/${objeto.id}/delete`} onSubmit={(e)=>{
                        if(!confirm("Tem certeza que deseja excluir essa matéria ?")){
                            e.preventDefault();
                        }
                    }}>
                    <button className={style.trash}><img src="/trash-icon.svg" alt="" /></button>
                    </fetcher.Form>
                    <Link to={`/materia/${objeto.id}`}><img src="/arrow-right-icon.svg" alt="" /></Link>
                </div>
            </li>
            
            ))
           }
  
        </ul>
        </div>
    );
}


export default ListaMaterias;