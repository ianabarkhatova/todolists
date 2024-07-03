import React from "react";

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
};

export const Button = ({title, onClickHandler, disabled}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler}
                disabled={disabled}>{title}</button>
    );
};