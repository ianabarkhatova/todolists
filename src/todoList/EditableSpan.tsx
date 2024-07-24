import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = ({title, onChange}: EditableSpanPropsType) => {
    let[editMode, setEditMode] = useState(false)
    let[spanTitle, setSpanTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setSpanTitle(title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(spanTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value)
    }

    return editMode ?
        <input value={spanTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{title}</span>
}