import * as React from 'react'

interface Props {
    details : string,
    alertType : notificationType,
    isAlertVisible : boolean
    toggleAlertVisibility : (alertState : boolean) => void    
}

export enum notificationType {Success, Error, Warning}

const getNotificationStyle = (alertType : notificationType) => {
    if(alertType == notificationType.Error){
        return{
            alertColor : "alert-danger",
            alertHeading : "Error!"
        }
    }
    else if(alertType == notificationType.Success){
        return{
            alertColor : "alert-success",
            alertHeading : "Success!"
        }
    }
    else{
        return{
            alertColor : "alert-warning",
            alertHeading : "Warning!"
        }
    }
}



export const NotificationComponent = (props: Props) => {
    const {alertColor, alertHeading} = getNotificationStyle(props.alertType);

    return (
        <>
        {props.isAlertVisible ? 
        <div className={`alert ${alertColor}`} role="alert">
            <strong>{alertHeading}</strong>{props.details}
            <button type="button" className="btn-close float-end" data-bs-dismiss="alert" 
            aria-label="Close" onClick={() => props.toggleAlertVisibility(false)}></button>
        </div>
        :null}
        </>
    )
}
