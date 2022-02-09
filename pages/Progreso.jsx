import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Subtitle from '../components/Subtitle'
import { getProgress } from '../firebase/utils'
import style from '../styles/Progreso.module.css'
import Button from '../components/Button'
import ProgressC from '../components/ProgressC'
import { useEffect, useState } from 'react'

function Progreso() {
    const { user, userDB, id, setTeacherId, setStudentsProgress, progress } = useUser()
    const [mode, setMode] = useState(false)
    const [visibility, setVisibility] = useState(null)
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
    function manageVisibility (i) {
        visibility === i ? setVisibility(null):setVisibility(i)
    }
    console.log(visibility)
    useEffect(() => {
        getDataProgress()
    }, []);
    return (
        <div className={style.main}>
            {userDB !== 'loading' &&
                       <div className={style.container}>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} controla el progreso de tus alumnos desde aqui...</p>
                    <div className={style.containerMap}>
                        {progress !== null ? progress.map((item, i) =>
                            <div onClick={()=>manageVisibility(i)} className={style.item} key={i}>{(`${item.name}`).split(' ')[0].charAt (0).toUpperCase()+(`${item.name}`).split(' ')[0].slice (1)}  {(`${item.name}`).split.length == 3 ? (`${item.name}`).split(' ')[2].charAt (0).toUpperCase()+(`${item.name}`).split(' ')[2].slice(1): (`${item.name}`).split(' ')[1].charAt (0).toUpperCase()+(`${item.name}`).split(' ')[1].slice (1)}
                                <div className={style.progressPorcent}>

                                    {Math.floor(Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed)/4) <= 0 && '0%'}

                                    {Math.floor(Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed)/4) > 0 &&

                                     <div className={style.porcent} style={{ background: '#1eff00', width: `${
                                        Math.floor(Math.floor(item.s / 3 - item.es) 
                                        + Math.floor(item.r / 3 - item.er)
                                        + Math.floor(item.m / 3 - item.em)
                                        + Math.floor(item.d / 3 - item.ed)/4) < 0 ? '0' : 
                                     Math.floor(Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed)/4)}%`, height: '15px' }}> 
                                     {`${Math.floor(Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed)/4) < 0 ? '0'

                                     : Math.floor(Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed)/4)}%`}</div>}
                                </div>
                                <div className={`${style.viewGrid} ${visibility === i ? style.visibility: ''}`}>
                                <div className={style.grid}>
                                    <ProgressC progress={item.s} errors={item.es} text={'Suma'}></ProgressC>
                                    <ProgressC progress={item.r} errors={item.er} text={'Resta'}></ProgressC>
                                    <ProgressC progress={item.m} errors={item.em} text={'Multiplicación'}></ProgressC>
                                    <ProgressC progress={item.d} errors={item.ed} text={'División'}></ProgressC>
                                </div>
                                </div>
                            </div>) : 'Aun no tiene alumnos registrados con su id...'} 

                    </div>

                    <button className={style.buttonBack} onClick={backClick}>Atras</button>

                </div>
                }
        </div>
    )
}

export default WithAuth(Progreso)