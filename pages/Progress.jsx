import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Subtitle from '../components/Subtitle'
import { getIds } from '../firebase/utils'
import style from '../styles/Progress.module.css'
import styleH from '../styles/Home.module.css'
import Button from '../components/Button'
import { useState } from 'react'



function Progress() {
    const { user, userDB, id, setTeacherId } = useUser()
    const [mode, setMode] = useState(false)
    const router = useRouter()

    function x () {
        setMode(!mode)
    }
    function nextClick (e) {
        e.preventDefault()
        const idInput = e.target.form[0].value
        getIds(idInput, setTeacherId, user.uid)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }

    return (
    <PageLayout>
        {userDB !== 'loading' && 
            <>
            <div className={styleH.containerTwo}>
                <img src={`/${userDB.avatar}.png`} className={styleH.perfil} alt="user photo" />
                <div>
                    <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido,': 'Bienvenida,'}  {`${userDB.aName.toUpperCase()}`}</span><br/> 
                    <span>Comparte tus progresos con tu profe.</span><br/>
                </div>
               
                <div className={style.progressbar}>
                    <div className={style.halfCircle}></div>
                    <div className={style.halfCircle}></div>
                    <div className={style.halfCircleTop}></div>
                    <div className={style.progressbarCircle}>
                    {userDB.progress == null ?'' : `${userDB.progress/3-userDB.errors < 0 ? '0': Math.floor(userDB.progress/3-userDB.errors)}%`}
                    </div>
                </div>
                <div>                
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={x}>Compartir progreso</Button>
                </div>
            </div> 
            <div className={`${style.modalContainer} ${mode == true ?style.true: ''}`}>
                <div className={style.contBlue}>
                    <span onClick={x} className={style.x}>X</span>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <span className={style.textModal}>Ingresa el id de tu profe...</span>
                    <form className={style.form}>      
                        <input className={style.modalInput} type="text" placeholder='alex73447725' />
                        <button className={style.modalButton} onClick={nextClick}>ok</button>
                    </form>
                </div>
            </div>
            </>}
    </PageLayout>
    )
}

export default WithAuth(Progress)
