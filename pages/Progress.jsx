import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Subtitle from '../components/Subtitle'
import style from '../styles/Progress.module.css'
import styleH from '../styles/Home.module.css'
import styleP from '../styles/Play.module.css'

function Progress() {
    const { userDB } = useUser()
    
    return (
    <PageLayout>
        {userDB !== 'loading' && 
            <>
            <div className={styleH.containerTwo}>
                <img src={`/${userDB.avatar}.png`} className={styleH.perfil} alt="user photo" />
                <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido,': 'Bienvenida,'}  {`${userDB.aName.toUpperCase()}`} <br/> Monitorea tus progresos </Subtitle><br />
                <div className={style.progressbar}>
                    <div className={style.halfCircle}></div>
                    <div className={style.halfCircle}></div>
                    <div className={style.halfCircleTop}></div>
                    <div className={style.progressbarCircle}>
                    {userDB.progress == null ?'' : `${userDB.progress/3-userDB.errors < 0 ? '0': Math.floor(userDB.progress/3-userDB.errors)}%`}
                    </div>
                </div>
            </div> 
            </>}
    </PageLayout>
    )
}

export default WithAuth(Progress)
