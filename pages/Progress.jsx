import PageLayout from '../layouts/PageLayout'
import style from '../styles/Progress.module.css'

function Progress() {
    return (
    <PageLayout>
        <div className={style.container}>
            <div className={style.progressbar}>
                <div className={style.halfCircle}></div>
                <div className={style.halfCircle}></div>
                <div className={style.halfCircleTop}></div>
                <div className={style.progressbarCircle}>
                0%
                </div>
            </div>
        </div>
    </PageLayout>
    )
}

export default Progress
