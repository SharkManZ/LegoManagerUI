import {Button, ButtonGroup, Grid, Paper} from "@mui/material";
import NavigateButtonMenu from "../button/navigate.button.menu.component";

const catalogMenu = [
    {title: 'Серии', link: '/series'},
    {title: 'Наборы', link: '/sets'},
    {title: 'Части', link: '/parts'},
    {title: 'Цвета', link: '/colors'}
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