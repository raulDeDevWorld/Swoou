import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Progress.module.css'

function Progress() {
    const { userDB } = useUser()
    
    return (
    <PageLayout>
        <div className={style.container}>
            <div className={style.progressbar}>
                <div className={style.halfCircle}></div>
                <div className={style.halfCircle}></div>
                <div className={style.halfCircleTop}></div>
                <div className={style.progressbarCircle}>
                {userDB.progress == null ?'' : `${Math.floor(userDB.progress/3)}%`}
                </div>
            </div>
        </div>
    </PageLayout>
    )
}

export default WithAuth(Progress)
