import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Subtitle from '../components/Subtitle'
import style from '../styles/Progress.module.css'
import styleH from '../styles/Home.module.css'
import Button from '../components/Button'


function Progress() {
    const { userDB } = useUser()
    const router = useRouter()
    function nextClick () {
        router.push('/Home')
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
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={nextClick}>Compartir progreso</Button>
                </div>
            </div> 
            </>}
    </PageLayout>
    )
}

export default WithAuth(Progress)
