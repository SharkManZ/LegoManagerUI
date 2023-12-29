import {TableCell} from "@mui/material";
import React from "react";
import {fetchFromObject} from "../../utils/object.utils";

function MainTableTextCell({row, column}) {
    /**
     * Возвращает значение для текстовой колонки. Поддерживает вывод из основного и дополнительного поля (в скобках).
     * Поддерживает раскрашивание значения числовой колонки. Сравнивает значение основной и дополнительной колонок.
     * Раскрашивает в настроенные в зависимости от результата сравнения цвета.
     */
    const getRowValue = (row, column) => {
        if (column.type === 'color') {
            return '';
        }
        let mainValue = fetchFromObject(row, column.field);
        let additionalValue;
        let combineValue;
        if (column.additionalField && fetchFromObject(row, column.additionalField)) {
            additionalValue = fetchFromObject(row, column.additionalField);
            combineValue = mainValue + ' (' + additionalValue + ')';
        } else {
            combineValue = mainValue;
        }
        if (column.colorDiff) {
            let color;
            let secondValue = additionalValue ? additionalValue : 0;
            if (mainValue < secondValue) {
                color = column.colorDiff.lower;
            } else if (mainValue > secondValue) {
                color = column.colorDiff.greater
            } else {
                color = column.colorDiff.equals;
            }
            return (<div style={{color: color}}>{combineValue}</div>);
        }
        return combineValue;
    }

    return (
        <TableCell key={column.key ? column.key : column.field}>
            {getRowValue(row, column)}
        </TableCell>
    )
}

export default MainTableTextCell