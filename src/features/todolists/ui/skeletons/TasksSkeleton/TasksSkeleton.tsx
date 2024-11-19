import Skeleton from "@mui/material/Skeleton"
import s from "./TasksSkeleton.module.css"

export const TasksSkeleton = () => {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, id) => (
          <div key={id} className={s.common}>
            <div className={s.tasks}>
              <Skeleton width={20} height={40} />
              <Skeleton width={150} height={40} />
            </div>
            <Skeleton width={20} height={40} />
          </div>
        ))}
    </>
  )
}
