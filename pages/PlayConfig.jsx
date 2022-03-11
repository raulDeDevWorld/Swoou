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
    const [mode, setMode] = useState('suma')
    const [modeTwo, setModeTwo] = useState('multiplicacion')
    const [controller, setController] = useState(false)
    const [sumaConfig, setSumaConfig] =useState(2)
    const [restaConfig, setRestaConfig] =useState(2)
    const [plantillaConfig, setPlantillaConfig] =useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [multiplicacionConfig, setMultiplicacionConfig] =useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const [divisionConfig, setDivisionConfig] =useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])


    const router = useRouter()



    function suma () {
        setMode('suma')
    }
    function resta () {
        setMode('resta')
    }
    function multiplicacion() {
        setModeTwo('multiplicacion')
    }
    function division() {
        setModeTwo('division')
    }


  
    function cHandler (n) {
        mode == 'suma' ? setSumaConfig(n) : setRestaConfig(n)
    }
    function clickHandler (n) {
        let late = multiplicacionConfig.length-1

        console.log(late)
        if (n < multiplicacionConfig[0]) {
            let u = plantillaConfig.length
            let i = plantillaConfig.findIndex(i => i == n)
            let arr = plantillaConfig.slice(i, u)
            setMultiplicacionConfig(arr)
        } 
        if (n > multiplicacionConfig[0])  {
            let i = plantillaConfig.findIndex(i => i == n)
            let arr = plantillaConfig.slice(multiplicacionConfig[0], i)
            setMultiplicacionConfig(arr)
        }
    }
    console.log(multiplicacionConfig)
    function back () {
        router.back()
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
                            <button className={`${style.button} ${ mode== 'suma' ? style.right : ''}`} onClick={suma}>Suma</button>
                            <button className={`${style.button} ${ mode == 'resta' ? style.right : ''}`} onClick={resta}>Resta</button>
                        </div>
                        <p className={style.greeting}>Selecciona una cifra...</p>
                        <div className={`${style.boxSelect}`}>
                            <span className={`${sumaConfig == 1 && mode == 'suma'? style.green : ''} ${restaConfig == 1 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(1)}>1 Cifra</span>
                            <span className={`${sumaConfig == 2 && mode == 'suma'? style.green : ''} ${restaConfig == 2 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(2)}>2 Cifras</span>
                            <span className={`${sumaConfig == 3 && mode == 'suma'? style.green : ''} ${restaConfig == 3 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(3)}>3 Cifras</span>
                        </div>
                        
                        
                        
                        
                        <div className={style.box}>
                            <button className={`${style.button} ${modeTwo == 'multiplicacion' ? style.right : ''}`} onClick={multiplicacion}>Multiplicación</button>
                            <button className={`${style.button} ${modeTwo == 'division' ? style.right : ''}`} onClick={division}>División</button>
                        </div>
                        <p className={style.greeting}>Selecciona una o mas tablas...</p>
                        <div className={`${style.boxSelect}`}>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(0) ? style.green : ''}`} onClick={() => clickHandler(0)}>0</span> 
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(1) ? style.green : ''}`} onClick={() => clickHandler(1)}>1</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(2) ? style.green : ''}`} onClick={() => clickHandler(2)}>2</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(3) ? style.green : ''}`} onClick={() => clickHandler(3)}>3</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(4) ? style.green : ''}`} onClick={() => clickHandler(4)}>4</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(5) ? style.green : ''}`} onClick={() => clickHandler(5)}>5</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(6) ? style.green : ''}`} onClick={() => clickHandler(6)}>6</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(7) ? style.green : ''}`} onClick={() => clickHandler(7)}>7</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(8) ? style.green : ''}`} onClick={() => clickHandler(8)}>8</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(9) ? style.green : ''}`} onClick={() => clickHandler(9)}>9</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(10) ? style.green : ''}`} onClick={() => clickHandler(10)}>10</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig.includes(11) ? style.green : ''}`} onClick={() => clickHandler(11)}>11</span>
                        </div>

                        <div className={style.buttonContainer}>         
                            <button className={style.buttonGreen} onClick={back}>Atras</button>
                            <button className={style.buttonGreen} onClick={clickHandler}>Guardar</button>
                        </div>

               
                    </div>

                </>}
                {success == false && <Error>Agotaste tu modo prueba</Error>}
        </div>
        </PageEspecial>
    )
}
export default WithAuth(PlayConfig)