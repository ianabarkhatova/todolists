import {SxProps} from "@mui/material";
import {TaskStatuses} from "../api/todolists-api";


export const filterButtonsContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSx = (status: TaskStatuses): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: status === TaskStatuses.Completed ? 0.5 : 1,
})
