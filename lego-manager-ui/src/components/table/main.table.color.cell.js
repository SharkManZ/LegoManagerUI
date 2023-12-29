import {TableCell, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import {fetchFromObject} from "../../utils/object.utils";
import Paper from "@mui/material/Paper";
import React from "react";

function MainTableColorCell({row, column}) {
    const getColor = (row, column) => {
        if (column.type === 'color') {
            return '#' + fetchFromObject(row, column.field);
        }
        return 'white';
    }

    return (
        <TableCell key={column.key ? column.key : column.field} width="10%">
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    width: 150,
                    height: 40,
                }
            }}>
                <Tooltip title={column.additionalField ? fetchFromObject(row, column.additionalField) : ""}>
                    <Paper style={{backgroundColor: getColor(row, column)}} elevation={10}/>
                </Tooltip>
            </Box>

        </TableCell>
    )
}

export default MainTableColorCell