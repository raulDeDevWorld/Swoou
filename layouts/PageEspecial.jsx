import Head from 'next/head'


export default function PageEspecial ({ children }) {
  return (
    <>
        <Head>
        <title>Swoou</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#01afff" />
        <meta name="msapplication-navbutton-color" content="#01afff" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#01afff" /> 
        </Head>
        <main> { children } </main>
  
    </>
  )
}
