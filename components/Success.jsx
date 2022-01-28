import style from '../styles/Success.module.css'

export default function Success (props) {
    return (
        <span className={style.success}>{props.children}</span>
    )
}