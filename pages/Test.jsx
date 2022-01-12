import PageLayout from '../layouts/PageLayout'
import Adsense from '../components/Adsense'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Home.module.css'

function Test () {
    return (
    <PageLayout>
    <Adsense/>
        <div className={style.container}>
            Test
        </div>
    </PageLayout>
    )
}

export default WithAuth(Test)
