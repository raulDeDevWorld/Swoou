import Button from '../../components/Button'
import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import Subtitle from '../../components/Subtitle'
import Paragraph from '../../components/Paragraph'
import style from '../../styles/Home.module.css'

function Home() {
    const { setUserAvatar, avatar, user, userDB } = useUser()
    const router = useRouter()

    function avatarClick(a) {
        setUserAvatar(a)
    }
    function nextClick() {
        if(avatar !== null){router.push('/Welcome')}
        console.log('click')
    }
    function avance() {
        router.push('/Home/Avance')
    }
    function promedio() {
        router.push('/Home/Promedio')
    }
    console.log(userDB)
    console.log(user)
    console.log(avatar)
    console.log('Home')
    return (
        <PageLayout>
            {userDB === 'loading' && ''}
            {userDB === null &&
                <div className={style.containerTwo}>
                    <img src={user.photoURL} className={style.perfil} alt="user photo" />
                    <Subtitle> Bienvenido (a): <br /> {`${user.displayName.toUpperCase()}`}</Subtitle>
                    <Paragraph className={style.paragraph}>Elige un avatar para tu hijo o hija</Paragraph>
                    <div className={style.avatarsContainer}>
                        <img src="/ab1.png" alt="avatar" className={style.avatarb1} onClick={(e)=>{avatarClick('ab1')}}/>
                        <img src="/ab2.png" alt="avatar" className={style.avatarb2} onClick={(e)=>{avatarClick('ab2')}}/>
                        <img src="/ag3.png" alt="avatar" className={style.avatar} onClick={(e)=>{avatarClick('ag3')}}/>
                        <img src="/ag2.png" alt="avatar" className={style.avatar} onClick={(e)=>{avatarClick('ag2')}}/>
                    </div> 
                    <div className={style.buttonsContainer}>
                    <Button style='buttonPrimary' click={nextClick}>Continuar</Button>

                    </div>
                </div>
            }
           
            {userDB !== null && userDB !== 'loading' &&
                <div className={style.containerTwo}>
                    {userDB.premium === true && <p className={style.subtitle}> Premium</p>}
                    {userDB.premium === false && <p className={style.subtitle}> Premium Yaa </p>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle> Bienvenido (a): <br /> {`${userDB.aName.toUpperCase()}`}</Subtitle>
                    <Button style='buttonPrimary' click={avance}>Play</Button>
                    <Button style='buttonPrimary'click={promedio}>Progreso</Button>
                    <Button style='buttonPrimary' click={avance}>Practica pdf</Button>
                </div>
            }
        </PageLayout>
    )
}

export default WithAuth(Home)
