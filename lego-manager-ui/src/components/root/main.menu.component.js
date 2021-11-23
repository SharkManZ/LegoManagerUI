import {Button, ButtonGroup, Grid, Paper} from "@mui/material";
import NavigateButtonMenu from "../button/navigate.button.menu.component";
import {COLORS_BRANCH, PART_CATEGORIES_BRANCH, SERIES_BRANCH, SETS_BRANCH} from "../../constants/pages/page.constants";

const catalogMenu = [
    {title: 'Серии', link: '/' + SERIES_BRANCH},
    {title: 'Наборы', link: '/' + SETS_BRANCH},
    {title: 'Категории деталей', link: '/' + PART_CATEGORIES_BRANCH},
    {title: 'Детали', link: '/parts'},
    {title: 'Цвета', link: '/' + COLORS_BRANCH}
]

function MainMenu() {
    return (
        <Paper sx={{p: 2}}>
            <Grid container justifyContent="center">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <NavigateButtonMenu text="Каталог" items={catalogMenu}/>
                    <Button>Мои наборы</Button>
                    <Button>Мои детали</Button>
                    <Button>Подбор наборов</Button>
                </ButtonGroup>
            </Grid>
        </Paper>
    )
}

export default MainMenu;