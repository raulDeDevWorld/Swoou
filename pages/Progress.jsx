import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import Error from '../components/Error'
import { getIds } from '../firebase/utils'
import style from '../styles/Progress.module.css'
import styleH from '../styles/Home.module.css'
import Button from '../components/Button'
import { useState, useEffect } from 'react'



function Progress() {
    const { user, userDB, id, setTeacherId, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState(false)

    const router = useRouter()

    function x () {
        setMode(!mode)
    }
    function nextClick (e) {
        e.preventDefault()
        const idInput = e.target.form[0].value
        getIds(idInput, setTeacherId, user.uid, userDB.aName, setUserSuccess)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    console.log(userDB.id)
    useEffect(() => {
        success == true ? x() : ''
    }, [success]);
    return (
        <>
    <PageLayout>
        {userDB !== 'loading' && 
            <>
            <div className={styleH.containerTwo}>
                <img src={`/${userDB.avatar}.png`} className={styleH.perfil} alt="user photo" />
                <div>
                    <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido,': 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span><br/> 
                    <span className={style.subtitle}>Comparte tus progresos con tu profe.</span><br/>
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
    {mode &&        <div className={`${style.modalContainer} ${mode == true ?style.true: ''}`}>
                <div className={style.contBlue}>
                    <span onClick={x} className={style.x}>X</span>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <span className={style.textModal}>Ingresa el id de tu profe...</span>
                    <form className={style.form}>      
                        <input className={style.modalInput} type="text" placeholder='alex73447725' />
                        <button className={style.modalButton} onClick={nextClick}>ok</button>
                    </form>
                </div>
            </div>}
          
            </>}
    </PageLayout>
    {success ==true && <Success>Correcto</Success>}
    {success ==false && <Error>Error</Error>}
    </>
    )
}

export default WithAuth(Progress)
