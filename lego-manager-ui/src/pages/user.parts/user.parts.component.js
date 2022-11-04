import {Box, Button, FormControlLabel, FormGroup, Grid, Paper, Stack, Switch, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {USER_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import useCrudActions from "../../components/action/crud.actions";
import {useEffect, useState} from "react";
import {setNeedRefreshAction} from "../../store/reducer/crud.actions";
import UserPartForm from "./user.parts.form.component";

const branch = USER_PARTS_BRANCH;

function UserPartsPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.app.userId);
    const {editAction, deleteAction} = useCrudActions(branch);
    const [onlyIntroduced, setOnlyIntroduced] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        dispatch(setNeedRefreshAction(branch));
    }, [currentUser]);

    const handleOnlyIntroduced = (event) => {
        setOnlyIntroduced(event.target.checked);
    }

    const onFilterApply = () => {
        dispatch(setNeedRefreshAction(branch))
        // dispatch(setFiltersAction(transformFilters(filterFields), branch));
    }

    const clearFilters = () => {
        // if (seriesId === undefined || seriesId === null) {
        //     setFilterFields(initFilters);
        //     setFilterSeries({});
        //     dispatch(setFiltersAction([], branch));
        // } else {
        //     const clearedFilters = Object.assign({}, filterFields, {year: initFilters.year});
        //     setFilterFields(clearedFilters);
        //     dispatch(setFiltersAction(transformFilters(clearedFilters), branch));
        // }
    }

    return (
        <Box>
            {/*<Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>*/}
            {/*    <Typography variant="h4">Наборы владельца</Typography>*/}
            {/*</Grid>*/}
            {!currentUser ? (
                <Grid container alignItems="center" justifyContent="center" mt={3}>
                    <Typography variant="h5">Для отображения деталей необходимо выбрать текущего владельца.</Typography>
                </Grid>
            ) : (
                <Grid container>
                    <Grid container item xs={3} width="100%" pt={2} pb={2}>
                        <Paper style={{width: "100%", textAlign: "center", padding: 10}}>
                            <Typography color={"deepskyblue"} variant="h5">Фильтры</Typography>
                            <Stack direction="column" mt={2} spacing={3}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch checked={onlyIntroduced} onChange={handleOnlyIntroduced}/>}
                                                      label="Только введенные"/>
                                </FormGroup>
                            </Stack>
                            <Stack direction="row" mt={2} spacing={2} justifyContent="center">
                                <Button variant="contained" onClick={onFilterApply}>Применить</Button>
                                <Button variant="contained" onClick={clearFilters}>Очистить</Button>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid container item xs={9}>
                        <MainTable rowActions={[editAction, deleteAction]} branch={branch}
                                   fetchRequest={{userId: currentUser, onlyIntroduced: onlyIntroduced}}>
                            <UserPartForm/>
                        </MainTable>
                    </Grid>
                </Grid>
            )
            }
        </Box>
    )
}

export default UserPartsPage;