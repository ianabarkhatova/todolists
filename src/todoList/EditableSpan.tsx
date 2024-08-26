import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(({title, onChange}: EditableSpanPropsType) => {
    console.log('EditableSpan')
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
        <TextField
            variant={'standard'}
            value={spanTitle}
            size={'small'}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus/> :
        <span onDoubleClick={activateEditMode}>{title}</span>
})

