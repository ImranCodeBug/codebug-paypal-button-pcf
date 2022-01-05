import * as React from 'react'

interface Props {
    valueRef : React.MutableRefObject<HTMLInputElement | null>
}

export const PriceComponent = (props: Props) => {
    return (
    <div className="d-flex flex-row">
        <div className="p-2">Total Payable</div>
        <div className="p-2 flex-grow-1"><input type="number" ref={props.valueRef} /></div>
    </div>
    )
}
