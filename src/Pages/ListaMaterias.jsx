import style from  "../CSS/listaMateria.module.css"
import { Form, Link, useLoaderData, useFetcher } from "react-router-dom";
import useMateria from "../customHooks/useMateria";

export const LoaderMateria = async ({params}) =>{
     const {listMaterias} = useMateria();

     const materias = await listMaterias()

     return materias || null
}

const ListaMaterias = ()=>{
    const fetcher = useFetcher({key:"/materia/create"});
    const materias = useLoaderData()
    console.log(fetcher)
    
    return(
        <div >
        <ul className={style.lista}>
           
           {
            materias.map((objeto,index)=>(
            
            <li key={index}>
                <h2>{objeto.nameMateria}</h2>

                <div className={style.lista_botao}> 
                    <fetcher.Form method="post" action={`/materia/${objeto.id}/delete`}>
                    <button className={style.trash}><img src="/trash-icon.svg" alt="" /></button>
                    </fetcher.Form>
                    <Link to={`/materia/${objeto.nameMateria}`}><img src="/arrow-right-icon.svg" alt="" /></Link>
                </div>
            </li>
            
            ))
           }

        </ul>
        </div>
    );
}


export default ListaMaterias;