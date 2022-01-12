import { useRouter } from 'next/router'
import style from '../styles/PremiumC.module.css'

function PremiumC() {
const router = useRouter()
function next () {
    router.push('/Premium')
}  
    return (
            <div className={style.box} onClick={next}>
                <span className={style.title}>Swoou Premium</span>
                <div className={style.cont}>
                    <span className={style.subtitle}>hazlo simple</span>
                    <span className={style.subtitleTwo}>hazte premium</span>
                </div>
            </div>
           )}
export default PremiumC
