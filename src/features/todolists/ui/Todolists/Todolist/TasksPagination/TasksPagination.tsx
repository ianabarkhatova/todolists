import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import { PAGE_SIZE } from "../../../../api/tasksApi"
import s from "../TasksPagination/TasksPagination.module.css"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePageHandler}
        shape="rounded"
        color="primary"
        className={s.pagination}
      />
      <div className={s.totalCount}>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </div>
    </>
  )
}
