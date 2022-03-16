import Head from 'next/head'


export default function PageEspecial ({ children }) {
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
        <main> { children } </main>
  
    </>
  )
}
