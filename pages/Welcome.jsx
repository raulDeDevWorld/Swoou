import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { dataUser } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Home.module.css'
import Error from '../components/Error'


function Welcome () {
    const router = useRouter()
    const { avatar, success, setUserSuccess } = useUser()


    function nextClick (e) {
        e.preventDefault()
        const aName = e.target.form[0].value
        const grade = e.target.form[1].value
        const school = e.target.form[2].value
        const cell = null
        const profesor = false

        if(aName.length > 2 && grade.length > 2 && school.length >2){
            dataUser(aName, grade, school, avatar, cell, profesor)  
            router.push('/Home')
            console.log('log pro')
        } else {
            setUserSuccess(false)
        }

    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }

    return (
    <>
    <PageLayout>
        
        {avatar !== null &&
            <div className={style.containerTwo}>
                <img src={`/${avatar}.png`} className={style.perfil} alt="avatar" />
                <Subtitle> Ya casi terminas! <br /> llena el siguiente formulario </Subtitle>
                <form className={style.form}>
                    <label>
                        Nombre y apellido:
                        <input className={style.input} type="text" placeholder='Alex Choque'/>
                    </label>
                    <label>
                        Grado: 
                        <input className={style.input} type="text" placeholder='Cuarto B'/>
                    </label>
                    <label>
                        Colegio: 
                        <input className={style.input} type="text" placeholder='Guido Villagomez B'/>
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonSecondary' click={backClick}>Atras</Button>
                        <Button style='buttonPrimary' click={nextClick}>Continuar</Button>
                    </div>
                </form>
            </div>
            }
    </PageLayout>
    {success ==false && <Error>Llene todo formulario correctamente</Error>}
    </>
    )
}

export default WithAuth(Welcome)

