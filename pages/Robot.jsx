import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { progressUpdate, errorsUpdate } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Robot.module.css'
import styleH from '../styles/Home.module.css'



function Play () {
    const { userDB, avatar } = useUser()
    const [mode, setMode] = useState('multiplicacion')
    const [values, setValues] = useState({firstValue: '', secondValue: ''})
    const [res, setRes] = useState([])



    const router = useRouter()
    
 
    function multiplicacion () {
        setMode('multiplicacion')
    }
    function division () {
        setMode('division')
    }
    function handleInputChange (e) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name] : value})
    }
    function resolver () {
        const secondLength = values.secondValue.length 
        for (var i = 0; i < secondLength; i++ ) {
            const item = values.secondValue.substring(i, 1)
            const product = item * values.firstValue
            setRes([...res, product])

         }
    }
console.log(res)
  

    return (
        <div className={style.main}>
        {userDB !== 'loading' &&
            <>
            <div className={style.container}>

                <img src="/robot.png" className={style.perfil} alt="user photo" />
                <p className={style.greeting}> Hola, {`${userDB.aName.toUpperCase()}`} dime en que te ayudo...</p>
             
                <div className={style.box}>
                <button className={`${style.button} ${mode == 'multiplicacion' ? style.right: '' }`} onClick={multiplicacion}>Multiplicación</button>
                <button className={`${style.button} ${mode == 'division' ? style.right: '' }`} onClick={division}>División</button>
                </div>
                <p className={style.greeting}>Ingresa los datos</p>
              
                    <div className={style.box}>
                        <input className={style.input} type="number" name="firstValue" onChange={handleInputChange} placeholder={mode == 'division'? 'Dividendo':'Multiplicando' } />
                        <input className={style.input} type="number" name="secondValue" onChange={handleInputChange} placeholder={mode == 'division'? 'Divisor':'Multiplicador' } />
                    </div>
                    <div className={style.boxMain}>
                        <div>
                            <span className={style.p}>{values.firstValue} </span>
                            <span className={`${style.p} ${style.border}`}><span className={style.red}>{values.secondValue !== ''? 'X':''}</span> {values.secondValue}</span>
                        </div>
                    </div>
                    <button className={style.buttonGreen} onClick={resolver}>Resolver</button> 
              
                </div>
                
           </>}
        </div>

    )


}
export default WithAuth(Play)