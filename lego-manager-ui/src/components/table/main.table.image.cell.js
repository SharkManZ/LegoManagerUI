import Box from "@mui/material/Box";
import {addDefaultImg} from "../../utils/common.funcs";
import React from "react";
import {fetchFromObject} from "../../utils/object.utils";
import {makeStyles} from "@mui/styles";
import {Tooltip} from "@mui/material";

const useStyles = makeStyles({
    root: {
        height: "auto",
        width: "auto",
        maxHeight: 50,
        maxWidth: 60,
        objectFit: 'cover'
    }
});

function MainTableImageCell({row, column}) {
    const classes = useStyles();

    let fileName = getImageFileName(row, column);

    /**
     * Возвращает имя файла изображения. Поддерживается формирование имени из одного или нескольких полей данных, перечисленных через +.
     */
    function getImageFileName(row, column) {
        if (column.field.includes('+')) {
            return column.field.split('+').map(val => fetchFromObject(row, val)).join('_');
        } else {
            return fetchFromObject(row, column.field);
        }
    }

    function getCellData() {
        return (
            <Box
                style={{overflow: "hidden", textAlign: "center"}}>
                <img src={`/${column.imageSource}/${fileName}.png`}
                     alt={`Деталь /${column.imageSource}/${row[column.field]}.png`}
                     loading="lazy"
                     onError={addDefaultImg}
                     className={classes.root}
                />
            </Box>
        )
    }

    return column.tooltipField ? (
        <Tooltip title={row[column.tooltipField]}>
            {getCellData()}
        </Tooltip>
    ) : getCellData()
}

export default MainTableImageCell