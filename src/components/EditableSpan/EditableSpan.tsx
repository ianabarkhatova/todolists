import React, {ChangeEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    disabled: boolean
}

export const EditableSpan = memo(({title, onChange, disabled}: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false)
    let [spanTitle, setSpanTitle] = useState('')

    const activateEditMode = () => {
        !disabled &&
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
        <TextField
            variant={'standard'}
            value={spanTitle}
            size={'small'}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus
            disabled={disabled}/> :
        <span onDoubleClick={activateEditMode}>{title}</span>
})

