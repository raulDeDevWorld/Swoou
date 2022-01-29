
import { useRouter } from 'next/router'
import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import PageLayout from '../layouts/PageLayout'
import { getCode } from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import Error from '../components/Error'
import styles from '../styles/Home.module.css'
import style from '../styles/Premium.module.css'

function Premium() {
    const router = useRouter()
    const { user, userDB, setUserSuccess, success } = useUser()

    function nextClick (e) {
        e.preventDefault()
        const code = e.target.form[0].value
        getCode(code, user.uid, setUserSuccess)

console.log(user.uid)
   

    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }



    return (
        <>
    <PageLayout>
        <div className={style.container}>
            <PremiumC></PremiumC>
             <ul className={style.list}>
                <li className={style.li}>Play ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Robot ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Pdf de practica diario <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>No publicidad <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Soporte Tecnico <img src='/right.svg' className={style.right} alt='rigth'></img></li>
            </ul>
                {userDB.premium === false && <form className={style.form}>
                    <input className={style.input} type="text" placeholder='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' />
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={nextClick}>Continuar</Button>
                </form>}
                {userDB.premium !== false && <div className={style.form}>
                    <span className={style.span}> Premium Code:</span>
                    <span className={style.code}> {userDB.premium} </span>
                    <Button style='buttonPrimary' click={backClick}>atras</Button>
                </div>}
             
         <a className={style.enlace}>Terminos y condiciones Swoou Premium</a> 
        </div>
    </PageLayout>
     {success ==true && <Success>Correcto</Success>}
     {success ==false && <Error>Error</Error>}
     </>
    )
}

export default WithAuth(Premium)