import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleSignOut } from '../firebase/utils'
import style from '../styles/Navbar.module.css'

export default function Navbar () {
  const [menu, setMenu] = useState(false)
  const { pathname } = useRouter() 
  console.log(menu)
  function handleMenu(){
    setMenu(!menu)
  }
  return (
    <header>
    <div className={style.navbar}>
        <img src="/logo-hazlo-simple-two.svg" className={style.logo} alt="logo" />
         <div className={style.menu} onClick={handleMenu}>
            <span className={style.span}></span>
            <span className={style.span}></span>
            <span className={style.span}></span>
        </div>   
    </div>
    <nav className={`${style.nav} ${menu === true ? style.top : ''}`}>
      <Link href="/Home">
        <a className={`${style.link} ${pathname == "/Home" ? style.active : ''}`}>Home</a>
      </Link>
      <Link href="/Cursos">
        <a className={`${style.link} ${pathname == "/Cursos" ? style.active : ''}`}>Cursos</a>
      </Link>
      <Link href="/Materiales">
        <a className={`${style.link} ${pathname == "/Materiales" ? style.active : ''}`}>Materiales</a>
      </Link>
      <Link href="/UnProfesor">
        <a className={`${style.link} ${pathname == "/UnProfesor" ? style.active : ''}`}>Un profesor</a>
      </Link>
      <Link href="/About">
        <a className={`${style.link} ${pathname == "/About"? style.active : ''}`}>Acerca de</a>
      </Link>
      <button className={style.button} onClick={handleSignOut}>Cerrar Sesion</button> 
    </nav>
  </header>
  )}