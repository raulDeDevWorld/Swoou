
import { useRouter } from 'next/router'
import Button from '../components/Button'
import PageLayout from '../layouts/PageLayout'
import styles from '../styles/Home.module.css'
import style from '../styles/Premium.module.css'

function Premium() {
    const router = useRouter()
    function nextClick () {
        router.push('/Home')
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }



    return (
    <PageLayout>
        <div className={styles.container}>
            <div className={style.box}>
                <h1 className={style.title}>Swoou Premium</h1>fvju
                <h4 className={style.subtitle}>hazlo simple</h4>
            </div>
             <ul className={style.list}>
                <li className={style.li}>Play ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Pdf de practica diario <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>No publicidad <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Soporte Tecnico <img src='/right.svg' className={style.right} alt='rigth'></img></li>
             </ul>
              
             <imput type='text' placeholder='Ingresar Codigo'></imput>
             <Button style='buttonPrimary' click={nextClick}>Solicitar Codigo</Button><Button style='buttonSecondary' click={backClick}>Atras</Button>
             <a>Terminos y condiciones Swoou Premium</a> 
        </div>
    </PageLayout>
    )
}

export default Premium