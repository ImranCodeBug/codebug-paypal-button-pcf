import * as React from 'react'
import { loadScript, PayPalNamespace } from '@paypal/paypal-js'
import { CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js/types/components/buttons';
import { PriceComponent } from './PriceComponent';
import { NotificationComponent, notificationType } from './NotificationComponent';

interface Props {
    paypalClientId: string
    payable: number
}

export const MainComponent = (props: Props) => {
    const [paypalNameSpace, setPaypalNameSpace] = React.useState<PayPalNamespace | null>(null);
    const valueRef = React.useRef<HTMLInputElement | null>(null);
    const isValueVisible = props.payable === 0;
    const [isAlertVisible, setIsAlertVisible] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<notificationType>(notificationType.Success);
    const [alertDetails, setAlertDetails] = React.useState<string>('')

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        const response = await actions.order.capture();
        if (response.status === 'COMPLETED' || response.status === 'APPROVED') {
            setAlertDetails('The payment has been successfully taken');
            setAlertType(notificationType.Success);
            setIsAlertVisible(true);
        }

        else if (response.status === 'VOIDED' || response.status === 'SAVED') {
            setAlertDetails('The payment has been voided. Please check with the payer.');
            setAlertType(notificationType.Warning);
            setIsAlertVisible(true);
        }

        else {            
            setAlertDetails('Please check with the payer.');
            setAlertType(notificationType.Warning);
            setIsAlertVisible(true);
        }



    }

    const createOrder = (data: any, actions: CreateOrderActions) => {
        const totalPayable = isValueVisible ? valueRef.current!.value : props.payable.toString()
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPayable
                    }
                }
            ]
        })
    }        

    React.useMemo(() => {
        const loadPaypalScript = async () => {
            const paypalScript = await loadScript({ "client-id": props.paypalClientId })
                .catch(error => {
                    console.error('Error ocurred while loading paypal script', error);
                    setAlertDetails('There was an while trying to load the PayPal library. Please check your browser console for more details.');
                    setAlertType(notificationType.Error);
                    setIsAlertVisible(true);
                });
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
                    createOrder: createOrder,
                    onApprove: onApprove
                }).render('#btnPaypal');
            }
        }
        loadPayPalButton();

    }, [paypalNameSpace])



    return (
        <div className='container-fluid'>
            {isValueVisible ? <PriceComponent valueRef={valueRef}></PriceComponent> : null}

            <div className="mt-3" id="btnPaypal"></div>

            <NotificationComponent details={alertDetails} alertType={alertType} 
                isAlertVisible={isAlertVisible} toggleAlertVisibility={setIsAlertVisible}></NotificationComponent>
        </div>
    )
}
