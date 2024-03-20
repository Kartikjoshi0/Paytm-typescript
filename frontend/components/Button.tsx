import React from 'react'

interface Props{
    label: string;
    className: string;
    onClick: ()=>void;
}


const Button: React.FC<Props> = ({label,className,onClick})=>{
    return (
        <button onClick={onClick} className={className}>{label}</button>
    )
}

export default Button