import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import { TextField } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

export type AddItemFormProps = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: AddItemFormProps) => {
  console.log("AddItemForm was called")
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value)
  }

  const keyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItemHandler()

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={error ? "error" : ""}
        value={title}
        size={"small"}
        onChange={changeTitleHandler}
        onKeyDown={keyDownAddItemHandler}
        error={!!error}
        helperText={error}
        disabled={disabled}
      />
      <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})
