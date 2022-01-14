export function fetchFromObject(obj, prop) {
    if(typeof obj === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

export function transformFilters(filterObject) {
    let values = [];
    for (const [key, value] of Object.entries(filterObject)) {
        if (value.value !== null && value.value !== undefined && value.value !== '') {
            values.push({
                field: value.field ? value.field : key,
                operator: value.operator,
                value: value.value
            })
        }
    }

    return values;
}