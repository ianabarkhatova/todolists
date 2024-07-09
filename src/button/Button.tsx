import React from "react";

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    className?: string
};

export const Button = ({title, onClickHandler, disabled, className}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler}
                className={className}
        >{title}</button>
    );
};