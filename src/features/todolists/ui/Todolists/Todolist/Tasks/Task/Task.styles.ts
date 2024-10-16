import {SxProps} from "@mui/material";
import {TaskStatus} from "../../../../../../../common/enums/enums";


export const filterButtonsContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSx = (status: TaskStatus): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: status === TaskStatus.Completed ? 0.5 : 1,
})
