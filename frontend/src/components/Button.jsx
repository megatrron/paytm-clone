/* eslint-disable react/prop-types */
const variantStyles = {
    "primary": "bg-black text-white",
    "secondary": "bg-purple-300 text-purple-600 ",
    "tertiary": "bg-blue-500 text-white",
}
const defaultStyles = "rounded-md font-[500] cursor-pointer"
const sizeStyles = {
    "sm": "py-1 px-23 mx-7",
    "md": "py-2 px-23 mx-7",
    "lg": "py-3 px-23 mx-7",
    "mdmd": "py-2 px-8 mx-7",
}
export const Button = (props) => {
    return <button
        onClick={props.onClick}
        className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles} flex items-center`}>
        {props.startIcon} {props.text} {props.endIcon}
    </button>
}