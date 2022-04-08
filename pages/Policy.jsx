import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'

import Link from 'next/link'
import style from '../styles/About.module.css'

function Policy() {
    return (
        <PageLayout>
         <div className={style.container}>
         <img src="logo-hazlo-simple.svg" className={style.logo} alt="logo" />
            <h3 className={style.subtitle}>Polica De Privacidad Y Servicios</h3>
            <h4>Informacion Personal</h4>
            <p>Swoou Mathematics requiere acceder a la informacion basica de su cuenta en Google o Facebook simplemente para mejorar la experiencia de usuario de manera personazalida, no se usara dicha informacion para fines diferentes del ya mencionado cometido.</p>
            <h4>Licencia de servicio Swoou Premium</h4>
            <p>Cuando usted adquiere Swoou Premium para Swoou Mathematics podra acceder a la plataforma con todos los beneficios como ser: Play Ilimitado, Robot matematico ilimitado, Cuadernillo de practicas en pdf, no publicidad y soporte Tecnico.</p>
            {/* <h4>Licencia de servicio Swoou Premium+</h4>
            <p>La unica diferencia entre Swoou Premium y Swoou Premium+ es que usted recibe el cuadernillo de practicas en fisico muy aparte del pdf</p> */}
            <h4>Vigencia de la Licencia</h4>
            <p>Al adquirir Swoou Premium se le otorga una licencia para disfrutar de la aplicacion con todos los beneficios, dicha licencia tiene una vigencia unicamente para el año en en curso, LA LICENCIA NO ES PARA SIEMPRE, debido al coste que supone el consumo de datos en nuestros servidores.</p>
         </div>
        </PageLayout>
    )
}

export default WithAuth(Policy)