import Navbar from '../components/Navbar'
import style from '../styles/PageLayout.module.css'

export default function PageLayout ({ children }) {
  return (
    <div className={style.container}>
        <Navbar />
        <main> { children } </main>
        <div className={style.vector}>
          <button className={style.button}><a href="https://api.whatsapp.com/send?phone=+59173447725&text=buenas,%20me%20gustaria%20comunicarme%20con%20un%20%20operador(a)%20">Operador(a)</a></button>
        </div>
    </div>
  )
}
