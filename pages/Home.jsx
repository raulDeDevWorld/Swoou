import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { useUser } from '../context/Context.js'
import style from '../styles/Home.module.css'

function Home () {
    console.log('Home')
    const { user, setUserProfile } = useUser()
    console.log(user)

    return (
    <PageLayout>
        <div className={style.container}>
            <p className={style.subtitle}>Bienvenido: <br/> {`${user.displayName.toUpperCase()}`}</p>  
            <p className={style.paragraph}>Nuestra página está en rediseño si desea algún producto contáctese directamente con el operador.</p>
            <button className={style.buttonPrimary}> Test </button>
            <button className={style.buttonSecondary}> Omitir </button>
        </div>
    </PageLayout>
    )
}

export default WithAuth(Home)
