import { useEffect } from 'react'
import { useUser } from '../context/Context.js'
import { onAuth, withFacebook, withGoogle } from '../firebase/utils'
import { useRouter } from 'next/router'
import InitialLayout from '../layouts/InitialLayout'
import style from '../styles/Auth.module.css'
import Link from 'next/link'


export default function SignUp () {
    const { user, setUserProfile } = useUser()
    const router = useRouter()
    useEffect(() => {
        onAuth(setUserProfile)
        if (user) router.replace('/Home')
      }, [user]);
      
    return (
        <InitialLayout>
            <div className={style.container}>
                <h3 className={style.subtitle}>Registrate!!</h3>
                <div className={style.buttonsContainer}>
                    <button className={style.withFacebook} onClick={withFacebook}>continuar con Facebook</button>
                    <button className={style.withGoogle} onClick={withGoogle}>continuar con Google</button>
                </div>
                <div className={style.linkContainer}>Ya tienes una cuenta? <Link href="/" ><a className={style.link}>Iniciar Sesion</a></Link></div>
            </div>
        </InitialLayout>
    )
}