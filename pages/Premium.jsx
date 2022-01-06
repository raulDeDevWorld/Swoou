import PageLayout from '../layouts/PageLayout'
import styles from '../styles/Home.module.css'
import style from '../styles/Premium.module.css'

function Premium() {
    return (
    <PageLayout>
        <div className={styles.container}>
            <div className={style.box}>
                <h1 className={style.title}>Swoou Premium</h1>fvju
                <h4 className={style.subtitle}>hazlo simple</h4>
            </div>
             <ul className={style.list}>
                <li className={style.li}>Banco con mas de 2500 preguntas <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Simulacros Ilimitados <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>No publicidad <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                <li className={style.li}>Soporte Tecnico <img src='/right.svg' className={style.right} alt='rigth'></img></li>
             </ul>
              
             <imput type='text' placeholder='Ingresar Codigo'></imput>
             <button>Solicitar Codigo</button><button>Atras</button>
             <a>Terminos y condiciones Swoou Premium</a>
        </div>
    </PageLayout>
    )
}

export default Premium