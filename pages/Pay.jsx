import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Home.module.css'

function Materiales () {
    return (
    <PageLayout>
        <form id="form-checkout" >
            <span>Llena el formulario...</span>
            <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
            <input type="text" name="cardExpirationDate" id="form-checkout__cardExpirationDate" />
            <input type="text" name="cardholderName" id="form-checkout__cardholderName"/>
            <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail"/>
            <input type="text" name="securityCode" id="form-checkout__securityCode" />
            <select name="issuer" id="form-checkout__issuer"></select>
            <select name="identificationType" id="form-checkout__identificationType"></select>
            <input type="text" name="identificationNumber" id="form-checkout__identificationNumber"/>
            <select name="installments" id="form-checkout__installments"></select>
            <button type="submit" id="form-checkout__submit">Pagar</button>
            <progress value="0" class="progress-bar">Cargando...</progress>
        </form>
    </PageLayout>
    )
}

export default WithAuth(Materiales)