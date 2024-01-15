import { redirect } from "react-router-dom"
import style from "../CSS/materia.module.css"
import useMateria from "../customHooks/useMateria"

export const createMateria = async ({params,request}) =>{

    const {createMateria} = useMateria();

    const formData = await request.formData()

        
        console.log(formData.get('nameMateria'))
        await createMateria(formData.get('nameMateria'))


    return redirect('/lista-materias/')
 
}

export const deleteMateria = async ({params}) =>{
    const {deleteMateria} =  useMateria();

        console.log(params.idMateria)
        await deleteMateria(Number(params.idMateria))

    return redirect('/lista-materias/')
 
}

const Materia = () =>{

    return(
        <>
            <div className={style.infos}>
                <div className={style.meta}>
                    <div>
                        <p>Meta semanal</p>
                        <button><img src="/lapis-icon.svg" alt="" /></button>
                    </div>
                    <h2>7h</h2>
                </div>

                <div className={style.grafico}>
                    <p>Atividade da semana</p>
                </div>
            </div>

            <div className={style.checkList}>
                <p>Checklist da matéria</p>

                <ul>
                    <span className={style.lineCheckList}></span>
                    <li>
                        <button></button>

                        <div className={style.itemList}>
                            <h2>Fazer lição de casa</h2>

                            <span className={style.trash}><img src="/trash-icon.svg" alt="" /></span>
                        </div>
                    </li>
                    <span className={style.lineCheckList}></span>
                    <li>
                        <button></button>

                        <div className={style.itemList}>
                            <h2>Fazer lição de casa</h2>

                            <span className={style.trash}><img src="/trash-icon.svg" alt="" /></span>
                        </div>
                    </li>
                    <span className={style.lineCheckList}></span>

                </ul>
            </div>
        </>
    )
}

export default Materia