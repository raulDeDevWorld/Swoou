// import { useState, useEffect } from 'react'
import style from '../styles/InitialLayout.module.css'

export default function InitialLayout ({ children }) {
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
  return (
    <div className={style.container}>
      {/* <span className={style.msg}>{msg}</span>  */}
      <img src="logo-hazlo-simple-two.svg" className={style.logo} alt="logo" />
      <main> { children } </main>
    </div>
  )
}