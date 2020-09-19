import { useEffect } from 'react'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'
import { useRouter } from 'next/router'
import InitialLayout from '../layouts/InitialLayout'
import style from '../styles/Auth.module.css'
import Link from 'next/link'

export default function Login () {
    const { user, setUserProfile, setUserProfileNull } = useUser()
    const router = useRouter()
    useEffect(() => {
        onAuth(setUserProfile, setUserProfileNull)
        if (user) {
          router.replace('/Home')
        }else{
          router.replace('/Login')
        }
      }, [user]);
      
    return (
        <InitialLayout>
            <div className={style.container}>
                <h3 className={style.subtitle}>Iniciar Sesion</h3>
                <div className={style.buttonsContainer}>
                    <button className={style.withFacebook}>continuar con Facebook</button>
                    <button className={style.withGoogle}>continuar con Google</button>
                </div>
                <div className={style.linkContainer}>Crear una cuenta? <Link href="/SignUp" ><a className={style.link}>Registrate</a></Link></div>
            </div>
        </InitialLayout>
    )
}