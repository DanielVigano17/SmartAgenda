import style from "../CSS/materia.module.css"

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