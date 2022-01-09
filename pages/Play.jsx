import Button from '../components/Button'
import { useState, useEffect } from 'react'
import Subtitle from '../components/Subtitle'
import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { dataUser } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Play.module.css'



function Play () {
    const [objet, setObjet] = useState(null)

    const router = useRouter()
    const { avatar } = useUser()

    function obj (){
        const nOne = Math.floor(Math.random()*(11-0))+0
        const nTwo = Math.floor(Math.random()*(11-0))+0
        const ale = () => Math.floor(Math.random()*(11-1))+1
        const nFour = Math.floor(Math.random()*(5-1))+1
        const res = nOne*nTwo
        const errO = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nOne
        const errT = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nTwo

        setObjet({
            nOne,
            nTwo,
            nFour,
            res,
            errO,
            errT,
            correct: null,
            selected: null,
        })
      
    }
 
    function select (n) {
        const o ={
            correct: true, selected: n,
        }
        setObjet({...objet, ...o,})
        setTimeout(obj, 1500)
    }

    function nextClick () {
        router.push('/Home')
    }

    useEffect(() => {
        obj()
    }, []);
console.log(objet)   
if (objet !== null) {console.log(objet.nOne)}
    return (
        <div className={style.main}>
        <div className={style.container}>

            {objet !== null &&
            <>
             <div className={style.boxMain}>
                <span>{objet.nOne}</span>
                <span>X</span>
                <span>{objet.nTwo}</span> 
            </div>
             <div className={`${style.box} ${objet.selected == 1 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected == 1 && objet.selected == objet.nFour? style.green: ''}`} onClick={(e)=>{select(1)}} >{objet.nFour == 1? objet.res: objet.errO * ( objet.errT + 1)} </div>
             <div className={`${style.box} ${objet.selected == 2 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected == 2 && objet.selected == objet.nFour? style.green: ''}`} onClick={(e)=>{select(2)}} >{objet.nFour == 2? objet.res: objet.errT * ( objet.errO - 1)} </div>
             <div className={`${style.box} ${objet.selected == 3 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected == 3 && objet.selected == objet.nFour? style.green: ''}`} onClick={(e)=>{select(3)}} >{objet.nFour == 3? objet.res: objet.errO * ( objet.errT - 1)} </div>
             <div className={`${style.box} ${objet.selected == 4 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected == 4 && objet.selected == objet.nFour? style.green: ''}`} onClick={(e)=>{select(4)}} >{objet.nFour == 4? objet.res: objet.errT * ( objet.errO + 1)} </div>
             <Button style='buttonPrimary' click={nextClick}>Finalizar</Button>
             </>}

        </div>
        </div>

    )


}
export default Play