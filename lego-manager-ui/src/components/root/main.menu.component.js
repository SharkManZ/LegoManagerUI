import {Button, ButtonGroup, Grid, Paper} from "@mui/material";
import NavigateButtonMenu from "../button/navigate.button.menu.component";
import {
    COLORS_BRANCH,
    PART_CATEGORIES_BRANCH,
    PARTS_BRANCH,
    SERIES_BRANCH,
    SETS_BRANCH, USER_SETS_BRANCH,
    USERS_BRANCH
} from "../../constants/pages/page.constants";
import {exportAll} from "../../service/export.service";
import {setInfoAction, setSuccessAction} from "../../store/reducer/app.actions";

const catalogMenu = [
    {title: 'Серии', link: '/' + SERIES_BRANCH},
    {title: 'Наборы', link: '/' + SETS_BRANCH},
    {title: 'Категории деталей', link: '/' + PART_CATEGORIES_BRANCH},
    {title: 'Виды деталей', link: '/' + PARTS_BRANCH},
    {title: 'Цвета', link: '/' + COLORS_BRANCH}
]
const exportMenu = [
    {
        title: 'Все', onClick: function (dispatch) {
            dispatch(setInfoAction("Начат экспорт всех данных"));
            exportAll().then(res => {
                dispatch(setSuccessAction("Экспорт всех данных успешно завершен!"));
            });
        }
    }
]
const collectionsMenu = [
    {title: 'Владельцы', link: '/' + USERS_BRANCH},
    {title: 'Мои наборы', link: '/' + USER_SETS_BRANCH},
    {title: 'Мои детали', link: '/'},
]

function MainMenu() {
    return (
        <Paper sx={{p: 2}}>
            <Grid container justifyContent="center">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <NavigateButtonMenu text="Каталог" items={catalogMenu}/>
                    <NavigateButtonMenu text="Коллекция" items={collectionsMenu}/>
                    <Button>Подбор наборов</Button>
                    <NavigateButtonMenu text="Экспорт" items={exportMenu}/>
                </ButtonGroup>
            </Grid>
        </Paper>
    )
}

export default MainMenu;