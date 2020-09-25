import { WithAuth } from '../HOCs/WithAuth'
import { handleSignOut } from '../firebase/utils'

function Home () {
    return (
    <div>
        bienvenido
        <button onClick={handleSignOut}>sign out</button>
    </div>
    )
}

export default WithAuth(Home)
