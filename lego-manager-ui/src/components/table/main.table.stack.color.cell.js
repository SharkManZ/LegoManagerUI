import {Stack, TableCell, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";

const COLORS_IN_ROW = 6;

/**
 * Формирование содержимого колонки содержащей перечень цветов. Формирует строки из квадратов соответствующих цветов с хинтом в виде названия цвета.
 */
function MainTableStackColorCell({row, column}) {
    let rowArrays = row[column.field].chunk(COLORS_IN_ROW);

    return (
        <TableCell key={column.key ? column.key : column.field}>
            {rowArrays.map((row) => (
                <Stack direction="row" spacing={0.5} paddingBottom={1}>
                    {row.map((column) => (
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                width: 15,
                                height: 15,
                            }
                        }}>
                            <Tooltip title={column.name}>
                                <Paper style={{backgroundColor: '#' + column.hexColor}} elevation={10}/>
                            </Tooltip>
                        </Box>
                    ))
                    }
                </Stack>
            ))}
        </TableCell>
    )
}

export default MainTableStackColorCell