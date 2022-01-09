import PageLayout from '../layouts/PageLayout'
import style from '../styles/Progress.module.css'

function Progress() {
    return (
    <PageLayout>
        <div className={style.container}>
            <div className={style.progressbar}>
                <div className={style.half-circle}></div>
                <div className={style.half-circle}></div>
                <div className={style.half-circle-top}"></div>
                <div className={style.progressbar-circle}>
                0%
                </div>
            </div>
        </div>
    </PageLayout>
    )
}

export default Progress
