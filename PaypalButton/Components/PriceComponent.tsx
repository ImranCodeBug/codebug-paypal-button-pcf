import * as React from 'react'

interface Props {

}

export const PriceComponent = (props: Props) => {
    return (
    <div className="d-flex flex-row">
        <div className="p-2">Total Payable</div>
        <div className="p-2 flex-grow-1"><input type="number" /></div>
    </div>
    )
}
