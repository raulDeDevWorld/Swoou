import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { progressUpdate, errorsUpdate } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Error from '../components/Error'
import style from '../styles/Robot.module.css'
import styleH from '../styles/Home.module.css'
import {rob} from '../utils/robot'



function Robot() {
    const { userDB, avatar, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState('multiplicacion')
    const [values, setValues] = useState({ firstValue: '', secondValue: '' })
    const [res, setRes] = useState(false)
    const [obj, setObj] =useState(null)

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
        setRes(true)
    }
  
    
    useEffect(() => {
        values.firstValue !== '' && values.secondValue !== '' ? setObj(rob(values.firstValue, values.secondValue)): ''
    },[values]);   
  console.log(obj)
    return (
        <div className={style.main}>
            {userDB !== 'loading' &&
                <>
                    <div className={style.container}>

                        <img src="/robot.png" className={style.perfil} alt="user photo" />
                        <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} dime en que te ayudo...</p>

                        <div className={style.box}>
                            <button className={`${style.button} ${mode == 'multiplicacion' ? style.right : ''}`} onClick={multiplicacion}>Multiplicación</button>
                            <button className={`${style.button} ${mode == 'division' ? style.right : ''}`} onClick={division}>División</button>
                        </div>
                        <p className={style.greeting}>Ingresa los datos</p>

                        <div className={style.box}>
                            <input className={style.input} type="number" name="firstValue" onChange={handleInputChange} placeholder={mode == 'division' ? 'Dividendo' : 'Multiplicando'} />
                            <input className={style.input} type="number" name="secondValue" onChange={handleInputChange} placeholder={mode == 'division' ? 'Divisor' : 'Multiplicador'} />
                        </div>
                        <div className={style.boxMain}>
                            {mode == 'multiplicacion' ?
                                <div>
                                    <span className={style.p}>{values.firstValue} </span>
                                    <span className={`${style.p} ${res == true && values.secondValue.length < 2 ? '' : style.border}`}><span className={style.red}>{values.secondValue !== '' ? 'X' : ''}</span> {values.secondValue}</span>
                                    {res == true && values.secondValue.length > 1 ? values.secondValue.split('').reverse().map((i, index) => <span className={style.p} key={index}>{i * values.firstValue}<span className={style.hide}>{values.secondValue.substring(0, index)} </span></span>) : ''}
                                    {res == true && values.secondValue.length > 0 ? <span className={`${style.p} ${style.borderTop}`}>{values.firstValue * values.secondValue} </span> : ''}
                                </div> :
                                <div className={`${style.divisionBox} ${values.firstValue !== '' || values.secondValue !== '' ? style.display : ''}`}>
                                    <span className={`${style.dividendo} ${values.firstValue !== '' || values.secondValue !== '' ? style.vertical : ''}`}>
                                        <span>{values.firstValue}</span> 
                                       {obj !== null && res == true ? obj.cifra.map((i, index)=> <span className={style.residuo} key={index}><span>{obj.zero[index]}</span>{i}<span className={style.hideDiv}>{Math.trunc(values.firstValue / values.secondValue).toString().replace(/,/g,"").substring(0, (obj.space[index+1]))}</span></span>): ''} 
                                    </span>
                                    { values.secondValue !== '' ? <span className={style.divisor}><span className={`${values.firstValue !== '' || values.secondValue !== '' ? style.horizontal : ''}`}>{values.secondValue}</span><span className={style.span}>{values.firstValue !== '' && values.secondValue !== '' && res == true ? Math.trunc(values.firstValue / values.secondValue): ''}</span></span> : ''}
                                </div>}
                        </div>
                        <button className={style.buttonGreen} onClick={resolver}>Resolver</button>

                    </div>

                </>}
                {success == false && <Error>Agotaste tu modo prueba</Error>}
        </div>

    )


}
export default WithAuth(Robot)