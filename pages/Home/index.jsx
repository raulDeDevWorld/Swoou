import Button from '../../components/Button'
import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import Subtitle from '../../components/Subtitle'
import Paragraph from '../../components/Paragraph'
import style from '../../styles/Home.module.css'

function Home() {
    const { user, userDB } = useUser()
    const router = useRouter()

    function testClick() {
        router.push('/Test')
    }
    function omitirClick() {
        router.push('/Home/Edu')
    }
    function avance() {
        router.push('/Home/Avance')
    }
    function promedio() {
        router.push('/Home/Promedio')
    }
    console.log(userDB)
    console.log(user)
    console.log('Home')
    return (
        <PageLayout>
            <img src={user.photoURL} className={style.perfil} alt="user photo" />
            {userDB === 'loading' && ''}
            {userDB === null &&
                <div className={style.containerTwo}>
                    <Subtitle>Bienvenido: <br /> {`${user.displayName.toUpperCase()}`}</Subtitle>
                    <Paragraph className={style.paragraph}>Antes de elegir una carrera prueba nuestro Test de orientacion vocacional</Paragraph>
                    <div className={style.buttonsContainer}>
                    <Button style='buttonPrimary' click={testClick}>Test</Button>
                    <Button style='buttonSecondary' click={omitirClick}>Omitir</Button>
                    </div>
                </div>
            }
           
            {userDB !== null && userDB !== 'loading' &&
                <>
                    {/* {userDB.premium === true && <p className={style.subtitle}> Premium</p>}
                    {userDB.premium === false && <p className={style.subtitle}> Premium Yaa </p>} */}
                    <p className={style.paragraph}> Usuario: {`${user.displayName.toUpperCase()}`}<br />Carrera: {userDB.career.toUpperCase()}</p>
                    <Button style='buttonPrimary' click={avance}>Simulacro</Button>
                    <Button style='buttonPrimary'click={promedio}>Banco de P</Button>
                    <Button style='buttonPrimary' click={avance}>Avance</Button>
                    <Button style='buttonPrimary'click={promedio}>Promedio</Button>
                </>
            }
        </PageLayout>
    )
}

export default WithAuth(Home)
