import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'

export function WithAuth(Component) {
    return () => {
        const { user, setUserProfile } = useUser()
        const router = useRouter()

        useEffect(() => {
            onAuth(setUserProfile)
            if (!user) router.replace('/')
        }, [user])
        return (
            <>
                {!user && <Loader />}
                {user && <Component {...arguments} />}
            </>
        )
    }
}
