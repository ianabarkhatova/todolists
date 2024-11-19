import Paper from "@mui/material/Paper"
import s from "./TodolistSkeleton.module.css"
import Skeleton from "@mui/material/Skeleton"
import { TasksSkeleton } from "../TasksSkeleton/TasksSkeleton"

export const TodolistSkeleton = () => {
  return (
    <Paper className={s.todolist}>
      <div className={s.todolistTitle}>
        <Skeleton width={150} height={50} />
        <Skeleton width={20} height={40} />
      </div>

      <div className={s.addItemForm}>
        <Skeleton width={230} height={60} />
        <Skeleton width={20} height={40} />
      </div>

      <>
        <TasksSkeleton />
      </>

      <div className={s.common}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Skeleton key={id} width={80} height={60} />
          ))}
      </div>
    </Paper>
  )
}
