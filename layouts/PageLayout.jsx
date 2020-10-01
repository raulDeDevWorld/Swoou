import Navbar from '../components/Navbar'
import style from '../styles/PageLayout.module.css'

export default function PageLayout ({ children }) {
  return (
    <div className={style.container}>
        <Navbar />
        <main> { children } </main>
        <div className={style.vector}>
          <button className={style.button}>Comunidad</button>
        </div>
    </div>
  )
}