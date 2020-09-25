import style from '../styles/Home.module.css'

export default function Loader () {
    return (
    <div className={style.spinnerContainer}>
        <div className={style.spinner}>
            <div>
            </div>
            <div>
            </div>
        </div>
    </div>
    )
}
