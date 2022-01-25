import {Box} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import React from "react";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import useCrudActions from "../../components/action/crud.actions";
import SetPartsForm from "./set.parts.form.component";

const branch = SET_PARTS_BRANCH;

function SetPartsPage() {
    const {setId} = useParams();
    const {editAction, deleteAction} = useCrudActions(branch);

    return (
        <Box>
            <MainTable branch={branch}
                       fetchRequest={{setId: setId}}
                       rowActions={[editAction, deleteAction]}
                       noPagination={true}>
                <SetPartsForm setId={setId}/>
            </MainTable>
        </Box>
    )
}

export default SetPartsPage;