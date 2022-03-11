import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../layouts/PageEspecial'
import { useUser } from '../context/Context.js'
import { progressUpdate, errorsUpdate } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Error from '../components/Error'
import style from '../styles/PlayConfig.module.css'
import {rob} from '../utils/robot'



function PlayConfig() {
    const { userDB, avatar, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState('multiplicacion')
    const [values, setValues] = useState({ firstValue: '', secondValue: '' })
    const [mouse, setMouse] = useState(false)
    const [x, setX] =useState(0)
    const [cifDiv, setCifDiv] =useState('')

    const router = useRouter()

    function multiplicacion() {
        setMode('multiplicacion')
    }
    function division() {
        setMode('division')
    }
    function handleInputChange(e) {
        e.preventDefault()
        if (userDB.premium === false && userDB.progress + userDB.errors == 30) {
            setUserSuccess(false) 
        return}
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
        setObj(null)
    }
    function resolver() {
        if (userDB.premium === false && userDB.progress + userDB.errors == 30) {
            setUserSuccess(false) 
        return}
        setRes(true)
    }
  
    function mouseDown () {
        setMouse(true)
    }
    function mouseUp () {
        setMouse(false)
    }
    function mouseMove (e) {

        let x = e.clientX
        let vw = e.target.clientWidth
        mouse == true ? setX(x) : ''
       
     
    }

    return (
        <PageEspecial>
        <div className={style.main}>
            {userDB !== 'loading' &&
                <>
                    <div className={style.container}>

                        <img src="/robot.png" className={style.perfil} alt="user photo" />
                        <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} configura el Play de tus estudiantes desde aqui...</p>




                        <div className={style.box}>
                            <button className={`${style.button} ${mouse == true ? style.right : ''}`} onClick={multiplicacion}>Suma</button>
                            <button className={`${style.button} ${mouse == true ? style.right : ''}`} onClick={division}>Resta</button>
                        </div>
                        <p className={style.greeting}>Selecciona una cifra...</p>
                        <div className={`${style.boxSelect} ${style.jleft} ${style.jright}`} onTouchStart={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} ><span style={{left: `${x}px`}}>{x}</span></div>

                        <div className={style.box}>
                            <button className={`${style.button} ${mode == 'multiplicacion' ? style.right : ''}`} onClick={multiplicacion}>Multiplicación</button>
                            <button className={`${style.button} ${mode == 'division' ? style.right : ''}`} onClick={division}>División</button>
                        </div>
                        <p className={style.greeting}>Selecciona una o mas tablas...</p>
                      

             
      
                        <button className={style.buttonGreen} onClick={resolver}>Resolver</button>

                    </div>

                </>}
                {success == false && <Error>Agotaste tu modo prueba</Error>}
        </div>
        </PageEspecial>
    )
}
export default WithAuth(PlayConfig)