import MainTable from "../../components/table/main.table.component";
import {PART_COLORS_BRANCH} from "../../constants/pages/page.constants";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {getAllColors} from "../../service/colors.service";
import useCrudActions from "../../components/action/crud.actions";
import PartColorsForm from "./part.colors.form.component";

const branch = PART_COLORS_BRANCH;

function PartColor({partId}) {
    const {editAction, deleteAction} = useCrudActions(branch);

    // grid
    const [colors, setColors] = useState([]);
    const [colorFetched, setColorFetched] = useState(false);
    const [colorFetchByAdd, setColorFetchByAdd] = useState(false);

    const fetchAllColors = (byAdd) => {
        setColorFetched(false);
        setColorFetchByAdd(byAdd)
        getAllColors()
            .then(res => {
                setColors(res);
            })
    }

    // запрос всех серий - один раз
    useEffect(() => {
        fetchAllColors(false);
    }, [])

    useEffect(() => {
        if (colorFetchByAdd === true) {
            // второй вариант обновления общего списка - добавление категории из формы добавления детали
            setColorFetched(true);
        }
        setColorFetchByAdd(false);
    }, [colors])

    return (
        <Box>
            <MainTable branch={branch}
                       rowActions={[editAction, deleteAction]}
                       fetchRequest={{partId: partId}}
                       noPagination={true}>
                <PartColorsForm partId={partId} colors={colors} fetchAllColors={fetchAllColors}
                                colorFetched={colorFetched}/>
            </MainTable>
        </Box>
    )
}

export default PartColor;