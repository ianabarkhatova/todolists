import Button from "@mui/material/Button";
import {styled} from "@mui/material";

type MenuButtonProps = {
    background?: string
}


export const MenuButton = styled(Button)<MenuButtonProps>(({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,
}))