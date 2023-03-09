import React from 'react';
import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {useEffect, useState} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {useDispatch, useSelector} from "react-redux";
import {Box, Stack, TextField} from "@mui/material";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {SETS_BRANCH} from "../../constants/pages/page.constants";

const branch = SETS_BRANCH;

function SetsForm({series, seriesId}) {
    const dispatch = useDispatch();
    const [selectedSeries, setSelectedSeries] = useState({});
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);

    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            number: '',
            year: null
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                name: values.name,
                number: values.number,
                year: values.year,
                series: selectedSeries
            }, branch));
        }
    })
    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            if (seriesId !== undefined && seriesId !== null) {
                setSelectedSeries(series.find(item => item.id == seriesId));
            } else {
                setSelectedSeries({});
            }
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues(currentRow);
            setSelectedSeries(series.find(item => item.id == currentRow.series.id));
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <AutocompleteControl options={series} selectedValue={selectedSeries}
                                     disabled={seriesId !== undefined}
                                     label="Серия" setOption={setSelectedSeries}/>
                <TextField required name="number" fullWidth label="Номер" onChange={formik.handleChange}
                           value={formik.values.number}/>
                <TextField required name="name" fullWidth label="Название"
                           onChange={formik.handleChange}
                           value={formik.values.name}/>
                <TextField required name="year" fullWidth label="Год выпуска"
                           onChange={formik.handleChange}
                           type="number" value={formik.values.year}/>
            </Stack>
        </Box>
    )
}

export default SetsForm;