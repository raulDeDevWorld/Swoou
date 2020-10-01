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
        <img src="logo-hazlo-simple-two.svg" className={style.logo} alt="logo" />
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
      <Link href="/Test">
        <a className={`${style.link} ${pathname == "/Test" ? style.active : ''}`}>Test</a>
      </Link>
      <Link href="/Universidades">
        <a className={`${style.link} ${pathname == "/Universidades" ? style.active : ''}`}>Universidades</a>
      </Link>
      <Link href="/BancoDePreguntas">
        <a className={`${style.link} ${pathname == "/BancoDePreguntas" ? style.active : ''}`}>Banco de Preguntas</a>
      </Link>
      <Link href="/Simulacro">
        <a className={`${style.link} ${pathname == "/Simulacro" ? style.active : ''}`}>Simulacro</a>
      </Link>
      <Link href="/Materiales">
        <a className={`${style.link} ${pathname == "/Materiales"? style.active : ''}`}>Materiales</a>
      </Link>
      <button className={style.button} onClick={handleSignOut}>Cerrar Sesion</button> 
    </nav>
  </header>
  )}