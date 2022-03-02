import {useDispatch, useSelector} from "react-redux";
import {USER_SETS_BRANCH} from "../../constants/pages/page.constants";
import {Box, Stack, TextField} from "@mui/material";
import FindTextField from "../../components/fields/find.text.field.component";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {searchSet} from "../../service/sets.service";

const branch = USER_SETS_BRANCH;

function UserSetForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.app.userId);
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);
    const [currentSetNumber, setCurrentSetNumber] = useState();

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            set: {
                id: null,
                name: ""
            },
            count: 0
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                count: values.count,
                set: {id: values.set.id},
                user: {id: currentUser}
            }, branch));
        }
    })

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues({
                id: currentRow.id,
                count: currentRow.count,
                set: {
                    id: currentRow.set.id,
                    name: currentRow.set.name
                }
            })
            setCurrentSetNumber(currentRow.set.number);
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    const onSelectSet = (id) => {
        formik.setValues({
            ...formik.values,
            set: {
                ...formik.values.set,
                id: id
            }
        })
    }

    const afterSearchSuccess = () => {
        document.getElementById("setCountField").focus();
    }

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <FindTextField label="Набор" name="set"
                               searchFunc={searchSet}
                               searchParam="searchValue"
                               evalName={(res) =>
                                   res.name
                               }
                               itemId={formik.values.set.id}
                               itemName={formik.values.set.name}
                               onSelectItem={onSelectSet}
                               textValue={currentSetNumber}
                               afterSearchSuccess={afterSearchSuccess}
                               imgPath="sets"
                               autoFocus
                />
                <TextField id="setCountField" required name="count" fullWidth label="Количество"
                           onChange={formik.handleChange}
                           value={formik.values.count}/>
            </Stack>
        </Box>
    )
}

export default UserSetForm;