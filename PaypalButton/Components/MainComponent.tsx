import * as React from 'react'
import { loadScript, PayPalNamespace } from '@paypal/paypal-js'

interface Props {
    paypalClientId: string

}



export const MainComponent = (props: Props) => {
    const [paypalNameSpace, setPaypalNameSpace] = React.useState<PayPalNamespace | null>(null);
    React.useMemo(() => {
        const loadPaypalScript = async () => {
            const paypalScript = await loadScript({ "client-id": props.paypalClientId })
                .catch(error => console.error('Error ocurred while loading paypalscript', error));
            if (paypalScript) {
                setPaypalNameSpace(paypalScript as PayPalNamespace);
            }
        }
        loadPaypalScript();
    }, [])

    React.useEffect(() => {
        const loadPayPalButton = async () => {
            if (paypalNameSpace) {
                await paypalNameSpace.Buttons!({
                    style: {
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'pill',
                        label: 'paypal',
                        tagline: false
                    }}).render('#btnPaypal');
            }
        }
        loadPayPalButton();

    }, [paypalNameSpace])



    return (
        <div id="btnPaypal">

        </div>
    )
}
