/* eslint-disable react/prop-types */
export const Balance = ({ value, id }) => {
    return <div className="flex mt-6">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
        <div className="ml-24 font-bold text-lg">
            UPI ID
        </div>
        <div className="font-semibold ml-4 text-lg">
            {id}
        </div>
    </div>
}