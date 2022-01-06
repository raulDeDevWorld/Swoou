import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../context/Context.js'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { dataUser } from '../../firebase/utils'
import Subtitle from '../../components/Subtitle'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import style from '../../styles/Facultad.module.css'
import { firebaseConfig } from '../../firebase/config.js'

function Facultad (props) {
    const router = useRouter()
    const [facI, setFacI] = useState(null)
    function continuar () {
        if(facI !== null){
            dataUser(facI)  
            router.push('/Home')
        } 
    }
    function back () {
        router.back()
    }
    console.log(facI)
    function setFacIndex (e) {
        e.preventDefault()
        setFacI(e.target.textContent)
	}
    return (
    <PageLayout className={style.container}>
        <div className={style.container}>
            <Subtitle>Elije tu facultad</Subtitle>
            <ul className={style.list}>
                {props.fac.map((f, i)=><li className={`${style.li} ${f == facI ? style.active : ''}`} key={i} onClick={setFacIndex}>{f}</li>)}   
            </ul>
            <div className={style.buttonsContainer}>
                <Button style={'buttonPrimary'} click={continuar}>continuar</Button>
                <Button style={'buttonSecondary'} click={back}>atras</Button>     
            </div>
        </div>
    </PageLayout>
    )
}
export async function getStaticProps() {

  return {
    props: {
      fac: [
                'fac de arquitectura',
                'fac de ciencias agrarias',
                'fac de ciencias economicas y empresariales',
                'fac de ciencias quimico farmaceuticas y bioquimicas',
                'fac de contadaria publica y ciencias financieras',
                'fac de derecho, ciencias sociales y politicas',
                'fac de humanidades y ciencias de la educacion',
                'fac de ingenieria civil',
                'fac de ingenieria-mecanica-electrica-electronica',
                'fac de tecnologia',
                'fac de tecnologias de la salud',
                'fac integral defensores de chaco',
                'fac medicina',
                'fac odontologia',
                'fac tecnica'
                ]
    },
  }
}

export default Facultad

