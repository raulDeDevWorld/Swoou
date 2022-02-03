
import { useRouter } from 'next/router'
import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import PremiumPluss from '../components/PremiumPluss'
import PageLayout from '../layouts/PageLayout'
import { getCode } from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import { useState, useEffect } from 'react'
import Error from '../components/Error'
import styles from '../styles/Home.module.css'
import style from '../styles/Premium.module.css'

function Premium() {
    const router = useRouter()
    const [mode, setMode] = useState(false)
    const { user, userDB, setUserSuccess, success } = useUser()
    function x () {
        setMode(!mode)
    }
    function nextClick (e) {
        e.preventDefault()
        const code = e.target.form[0].value
        getCode(code, user.uid, setUserSuccess)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    function next () {
        router.push("https://api.whatsapp.com/send?phone=+59173447725&text=buenas,%20me%20gustaria%20adquirir%20Swoou%20Premium%20%20")
    }



    return (
        <>
    <PageLayout>
        {userDB.premium !== null && <div className={style.container}>
            <PremiumC></PremiumC>
            {(`${userDB.premium}`).length < 16 && <div className={style.tiket}>9.50 BOB</div> }
             <ul className={style.list}>
                <li className={style.li}>Play ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Robot ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Cuadernillo de practica pdf <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>No publicidad <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Soporte Tecnico <img src='/right.svg' className={style.right} alt='rigth'></img></li>
            </ul>

            {(`${userDB.premium}`).length < 16 &&
            <> 
            <PremiumPluss></PremiumPluss>
             <div className={style.tiketTwo}>19.50 BOB</div>  
             <div className={style.spaceDiv}>

<Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={next}>Adquirirlo ya</Button>
<a className={style.enlace}>Terminos y condiciones Swoou Premium</a> <br />
<a className={style.enlace} onClick={x}>Ya cuento con acceso a Swoou Premium</a> 


</div>
            </>}

                {(`${userDB.premium}`).length > 16 && 
                <div className={style.form}>
                    <span className={style.span}> Premium Code:</span>
                    <span className={style.code}> {userDB.premium} </span>
                    <Button style='buttonPrimary' click={backClick}>atras</Button> <br />
                    <a className={style.enlace}>Terminos y condiciones Swoou Premium</a>
                </div>  }



                {mode &&  <div className={`${style.modalContainer} ${mode == true ?style.true: ''}`}>
 
                <div className={style.contBlue}>
                <span onClick={x} className={style.x}>X</span>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <span className={style.textModal}>Ingresa tu codigo de activación</span>
                       <form className={style.form}>
                            <input className={style.input} type="text" placeholder='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' />
                            <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={nextClick}>Continuar</Button>

                        </form>
                </div>
            </div>}

                        {userDB.premium == false &&'' }
                   
        </div>}
    </PageLayout>
     {success ==true && <Success>Correcto</Success>}
     {success ==false && <Error>Error</Error>}
     </>
    )
}

export default WithAuth(Premium)