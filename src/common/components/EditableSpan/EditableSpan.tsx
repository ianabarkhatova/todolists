import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  title: string
  onChange: (newValue: string) => void
  disabled: boolean
}

export const EditableSpan = memo(({ title, onChange, disabled }: Props) => {
  console.log("EditableSpan")
  let [editMode, setEditMode] = useState(false)
  let [spanTitle, setSpanTitle] = useState("")

  const activateEditMode = () => {
    !disabled && setEditMode(true)
    setSpanTitle(title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    onChange(spanTitle)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSpanTitle(e.currentTarget.value)
  }

  const keyDownChangeTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode()
    }
  }

  return editMode ? (
    <TextField
      variant={"standard"}
      value={spanTitle}
      size={"small"}
      onChange={onChangeHandler}
      onBlur={activateViewMode}
      autoFocus
      disabled={disabled}
      onKeyDown={keyDownChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
})
