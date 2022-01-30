import { useRouter } from 'next/router'
import style from '../styles/PremiumC.module.css'
import { useUser } from '../context/Context.js'

function PremiumC() {

    const {  userDB } = useUser()
    const router = useRouter()
    function next () {
        router.push('/Premium')
    }  
    return (
            <div className={style.box} onClick={next}>
                <span className={style.title}>Swoou Premium</span>
                <div className={style.cont}>
                    <span className={style.subtitle}>{(`${userDB.premium}`).length > 16 ? 'Felicidades!!!': 'hazlo simple'}</span>
                    <span className={style.subtitleTwo}>{(`${userDB.premium}`).length > 16 ? 'Eres PREMIUM': 'hazte premium'}</span>
                </div>
            </div>
           )}
export default PremiumC
