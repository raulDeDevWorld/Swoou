import { useEffect } from 'react'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { user, setUserProfile, setUserProfileNull } = useUser()
  const router = useRouter()

  useEffect(() => {
    onAuth(setUserProfile, setUserProfileNull)

    if (user) {
      router.replace('/Home')
    }else{
      router.replace('/Login')
    }
  }, [user]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="logo-hazlo-simple-two.svg" alt="logo"/>  
    </div>
  )
}
