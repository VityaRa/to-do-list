import React from 'react'

interface IProps {
    type?: string,
}

export const Input = ({type}: IProps) => {
    return (
        <input type={type ? type : "text"}>
            
        </input>
    )
}
