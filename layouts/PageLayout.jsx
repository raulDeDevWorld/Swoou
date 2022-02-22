import Head from 'next/head'
import Navbar from '../components/Navbar'
import style from '../styles/PageLayout.module.css'

export default function PageLayout ({ children }) {
  return (
<>
     <Head>
        <title>Swoou</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" /> 
    </Head>
    <div className={style.container}>
        <Navbar />
        <main className={style.mainContainer}> { children } </main>
        <div className={style.vector}>
          <button className={style.button}><a href="https://api.whatsapp.com/send?phone=+59173447725&text=buenas,%20me%20gustaria%20comunicarme%20con%20un%20%20operador(a)%20">Operador(a)</a></button>
        </div>
    </div>
</>
  )
}
