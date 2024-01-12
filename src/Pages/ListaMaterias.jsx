import style from  "../CSS/listaMateria.module.css"
import { listMaterias } from "../utils/getForLoaders";
import { Link, useLoaderData } from "react-router-dom";

export const LoaderMateria = async ({params}) =>{
     const materias = await listMaterias()

     return materias || null
}

const ListaMaterias = ()=>{

    const materias = useLoaderData()
 
    return(
        <div >
        <ul className={style.lista}>
           
           {
            materias.map((objeto,index)=>(
            
            <li key={index}>
                <h2>{objeto.nameMateria}</h2>

                <div className={style.lista_botao}> 
                    <span className={style.trash}><img src="/trash-icon.svg" alt="" /></span>
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