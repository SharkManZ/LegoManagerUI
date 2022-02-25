import {usePopupState} from "material-ui-popup-state/es/hooks";
import {useHistory} from "react-router-dom";
import {bindHover, bindMenu} from "material-ui-popup-state";
import {Button, Link, MenuItem} from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";

function NavigateButtonMenu({text, items, ...otherProps}) {
    const dispatch = useDispatch();
    const popupState = usePopupState({variant: 'popover', popupId: 'demoMenu'})
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path);
        popupState.close();
    }

    const onClick = (item) => {
        if (item.link) {
            navigateTo(item.link);
        } else if (item.onClick) {
            item.onClick(dispatch);
        }
    }

    return (
        <Button {...bindHover(popupState)} {...otherProps}>{text}
            <HoverMenu {...bindMenu(popupState)}
                       anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                       transformOrigin={{vertical: 'top', horizontal: 'left'}}>
                {items.map((item) => (
                    <MenuItem key={item.link} onClick={() => onClick(item)} to={item.link}
                              component={Link}>{item.title}</MenuItem>
                ))}
            </HoverMenu>
        </Button>
    )
}

NavigateButtonMenu.propTypes = {
    text: PropTypes.string.isRequired
}

export default NavigateButtonMenu;