import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import style from '../styles/InitialLayout.module.css'

export default function InitialLayout ({ children }) {
  const  router = useRouter()
  // const [msg, setMsg] = useState('')
	// const [i, setI] = useState(0)
	// const [text] = useState('Hazlo Simple flow.')

  // useEffect(() => {
	// 	const interval = setTimeout(() => {
	// 		i < text.length
	// 			? setI(i => i + 1)
	// 			: clearTimeout(interval)
	// 		setMsg(msg => msg + text.charAt(i))
	// 	}, 100)
	// 	return () => clearTimeout(interval)
	// }, [i, text]);


  useEffect(() => {

    var sUsrAg = navigator.userAgent;

if (( sUsrAg.indexOf("FBAN") > -1) || (sUsrAg.indexOf("FBAV") > -1 )) {
  alert("math.swoou.com utiliza tecnologías modernas que FACEBOOK NAVEGATOR no reconoce aun, por favor intente desde otro navegador o establezca otro navegador como prederterminado, gracias por su comprención.");
  router.back()
}

});
  return (
<>
     <Head>
        <title>Swoou Mathematics</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" /> 
        <meta name="description" content="Desarrollando tecnología para hacer de un mundo complicado un mundo más sencillo" />
        <meta name="keywords" content="Swoou, Matemáticas, Multiplicación, Primaria, desarrollador web" />
        <meta name="author" content="Raul Choque Romero" />
    </Head>
    <div className={style.container}>
      {/* <span className={style.msg}>{msg}</span>  */}
      <img src="logo-hazlo-simple-two.svg" className={style.logo} alt="logo" />
      <main> { children } </main>
    </div>
</>
  )
}
