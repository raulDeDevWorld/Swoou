import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Subtitle from '../components/Subtitle'
import { getProgress } from '../firebase/utils'
import style from '../styles/Progreso.module.css'
import Button from '../components/Button'
import { useEffect, useState } from 'react'

function Progreso() {
    const { user, userDB, id, setTeacherId, setStudentsProgress, progress } = useUser()
    const [mode, setMode] = useState(false)
    const router = useRouter()

    function x () {
        setMode(!mode)
    }
    function nextClick (e) {
        e.preventDefault()
        const idInput = e.target.form[0].value
        getIds(idInput, setTeacherId, user.uid, userDB.aName)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    function getDataProgress () {
        getProgress(setStudentsProgress, user.uid)
    }
    console.log(progress)
    useEffect(() => {
        getDataProgress()
    }, []);
    return (
        <div className={style.main}>
            {userDB !== 'loading' &&
                       <div className={style.container}>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} controla el progreso de tus alumnos desde aqui...</p>

                    {progress !== null ? progress.map((item, i) => <div className={style.item} key={i}>{item.name} {`${item.progress/3-item.errors < 0 ? '0': Math.floor(item.progress/3-item.errors)}%`}</div>) : ''
                    }


                 </div>
                }
        </div>
    )
}

export default WithAuth(Progreso)