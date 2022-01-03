import * as React from 'react'
import { loadScript, PayPalNamespace } from '@paypal/paypal-js'
import { CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js/types/components/buttons';

interface Props {
    paypalClientId: string

}

const createOrder = (data: any, actions: CreateOrderActions) => {
    return actions.order.create({
        purchase_units : [
            {
                amount : {
                  value : "30.0"  
                }
            }
        ]
    })
}

const onApprove = async(data : OnApproveData, actions : OnApproveActions)  => {
    const response = await actions.order.capture();
    if(response.status === 'COMPLETED' || response.status === 'APPROVED'){
        console.log('Done deal')
    }
}


export const MainComponent = (props: Props) => {
    const [paypalNameSpace, setPaypalNameSpace] = React.useState<PayPalNamespace | null>(null);

    React.useMemo(() => {
        const loadPaypalScript = async () => {
            const paypalScript = await loadScript({ "client-id": props.paypalClientId })
                .catch(error => console.error('Error ocurred while loading paypal script', error));
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
                    },
                createOrder : createOrder,
                onApprove : onApprove
            }).render('#btnPaypal');
            }
        }
        loadPayPalButton();

    }, [paypalNameSpace])



    return (
        <div id="btnPaypal">

        </div>
    )
}
