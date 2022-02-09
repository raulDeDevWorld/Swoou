import style from '../styles/ProgressC.module.css'

export default function ProgressC (props) {
    return (
        <div className={style.progressbar}>
            <div className={style.halfCircle}></div>
            <div className={style.halfCircle}></div>
            <div className={style.halfCircleTop}></div>
            <div className={style.progressbarCircle}>
                {props.progress == null ? 'hola' : `${props.progress / 3 - props.errors < 0 ? '0' : Math.floor(props.progress / 3 - props.errors)}%`}
            </div>
        </div>
    )
}