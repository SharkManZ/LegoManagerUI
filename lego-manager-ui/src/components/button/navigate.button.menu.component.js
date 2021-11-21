import {usePopupState} from "material-ui-popup-state/es/hooks";
import {useHistory} from "react-router-dom";
import {bindHover, bindMenu} from "material-ui-popup-state";
import {Button, Link, MenuItem} from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";

function NavigateButtonMenu({text, items, ...otherProps}) {
    const popupState = usePopupState({variant: 'popover', popupId: 'demoMenu'})
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path);
        popupState.close();
    }

    return (
        <Button {...bindHover(popupState)} {...otherProps}>{text}
            <HoverMenu {...bindMenu(popupState)}
                       anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                       transformOrigin={{vertical: 'top', horizontal: 'left'}}>
                {items.map((item) => (
                    <MenuItem key={item.link} onClick={() => navigateTo(item.link)} to={item.link}
                              component={Link}>{item.title}</MenuItem>
                ))}
            </HoverMenu>
        </Button>
    )
}

export default NavigateButtonMenu;