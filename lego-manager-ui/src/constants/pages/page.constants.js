export const SERIES_BRANCH = "series";
export const SETS_BRANCH = "sets";
export const COLORS_BRANCH = "colors";
export const PART_CATEGORIES_BRANCH = "partCategories";
export const PARTS_BRANCH = "parts";
export const PART_COLORS_BRANCH = "partColors";
export const SET_PARTS_BRANCH = "setParts";
export const USERS_BRANCH = "users";
export const USER_SETS_BRANCH = "userSets";
export const USER_PARTS_BRANCH = "userParts";

export const LEGO_IMG_ROOT = "lego-images";

export const PAGE_CRUD_CONSTANTS = {
    series: {
        addFormTitle: 'Добавление серии',
        editFormTitle: 'Редактирование серии',
        deleteFormTitle: 'Удалить серию'
    },
    sets: {
        addFormTitle: 'Добавление набора',
        editFormTitle: 'Редактирование набора',
        deleteFormTitle: 'Удалить набор',
        columns: [
            {
                title: 'Серия',
                field: 'series.name',
                sortable: false
            },
            {
                title: 'Номер',
                field: 'number',
                sortable: true
            },
            {
                title: 'Название',
                field: 'name',
                sortable: true
            },
            {
                title: 'Год выпуска',
                field: 'year',
                sortable: true
            },
            {
                title: 'Кол-во деталей',
                field: 'partsCount',
                sortable: false
            }
        ]
    },
    colors: {
        addFormTitle: 'Добавление цвета',
        editFormTitle: 'Редактирование цвета',
        deleteFormTitle: 'Удалить цвет',
        columns: [
            {
                title: 'Название',
                field: 'name',
                sortable: true
            },
            {
                title: 'Цвет',
                field: 'hexColor',
                type: 'color',
                sortable: false
            }
        ]
    },
    partCategories: {
        addFormTitle: 'Добавление категории детали',
        editFormTitle: 'Редактирование категории детали',
        deleteFormTitle: 'Удалить категорию детали',
        columns: [
            {
                title: 'Название',
                field: 'name',
                sortable: true
            }
        ]
    },
    parts: {
        addFormTitle: 'Добавление детали',
        editFormTitle: 'Редактирование  детали',
        deleteFormTitle: 'Удалить деталь',
        columns: [
            {
                title: '',
                field: 'number+minColorNumber',
                imageSource: `${LEGO_IMG_ROOT}/parts`,
                key: 'imgKey',
                sortable: false,
                isImage: true
            },
            {
                title: 'Категория',
                field: 'category.name',
                sortable: false
            },
            {
                title: 'Номер',
                field: 'number',
                additionalField: 'alternateNumber',
                sortable: true
            },
            {
                title: 'Название',
                field: 'name',
                sortable: true
            },
            {
                title: 'Цвета',
                field: 'colors',
                type: 'colors'
            }
        ]
    },
    partColors: {
        addFormTitle: 'Добавление цвета детали',
        editFormTitle: 'Редактирование  цвета детали',
        deleteFormTitle: 'Удалить цвет детали',
        columns: [
            {
                title: '',
                field: 'part.number+number',
                imageSource: `${LEGO_IMG_ROOT}/parts`,
                key: 'imgKey',
                isImage: true,
                sortable: false
            },
            {
                title: 'Номер',
                field: 'number',
                additionalField: 'alternateNumber',
                sortable: true
            },
            {
                title: 'Цвет',
                field: 'color.hexColor',
                additionalField: 'color.name',
                type: 'color',
                sortable: false
            }
        ]
    },
    setParts: {
        addFormTitle: 'Добавление детали набора',
        editFormTitle: 'Редактирование детали набора',
        deleteFormTitle: 'Удалить деталь набора',
        columns: [
            {
                title: '',
                field: 'number+colorNumber',
                imageSource: `${LEGO_IMG_ROOT}/parts`,
                key: 'imgKey',
                isImage: true,
                sortable: false
            },
            {
                title: 'Номер цвета детали',
                field: 'colorNumber',
                additionalField: 'alternateColorNumber',
                sortField: 'partColor.number',
                sortable: true
            },
            {
                title: 'Номер детали',
                field: 'number',
                additionalField: 'alternateNumber',
                sortField: 'partColor.part.number',
                sortable: true
            },
            {
                title: 'Название',
                field: 'partName',
                sortField: 'partColor.part.name',
                sortable: true
            },
            {
                title: 'Количество',
                field: 'count',
                sortable: false
            },
            {
                title: 'Цвет',
                field: 'hexColor',
                type: 'color',
                sortField: 'partColor.color.name',
                additionalField: 'colorName',
                sortable: true
            }
        ]
    },
    users: {
        addFormTitle: 'Добавление владельца',
        editFormTitle: 'Редактирование владельца',
        deleteFormTitle: 'Удалить владельца',
        columns: [
            {
                title: 'Название',
                field: 'name',
                sortable: true
            }
        ]
    },
    userSets: {
        addFormTitle: 'Добавление набора',
        editFormTitle: 'Редактирование набора',
        deleteFormTitle: 'Удалить набор',
        columns: [
            {
                title: '',
                field: 'set.number',
                imageSource: `${LEGO_IMG_ROOT}/sets`,
                key: 'imgKey',
                sortable: false,
                isImage: true
            },
            {
                title: 'Номер',
                field: 'set.number',
                sortable: true
            },
            {
                title: 'Название',
                field: 'set.name',
                sortable: true
            },
            {
                title: 'Год выпуска',
                field: 'set.year',
                sortable: true
            },
            {
                title: 'Количество',
                field: 'count',
                sortable: false
            }
        ]
    },
    userParts: {
        addFormTitle: 'Добавление детали',
        editFormTitle: 'Редактирование детали',
        deleteFormTitle: 'Удалить деталь',
        columns: [
            {
                title: '',
                field: 'number+colorNumber',
                imageSource: `${LEGO_IMG_ROOT}/parts`,
                key: 'imgKey',
                tooltipField: 'colorName',
                sortable: false,
                isImage: true
            },
            {
                title: 'Категория',
                field: 'categoryName',
                sortable: true
            },
            {
                title: 'Номер',
                field: 'number',
                additionalField: 'alternateNumber',
                sortable: true
            },
            {
                title: 'Номер цвета',
                field: 'colorNumber',
                additionalField: 'alternateColorNumber',
                sortable: true
            },
            {
                title: 'Название',
                field: 'partName',
                sortable: true
            },
            {
                title: 'Количество',
                field: 'userCount',
                additionalField: 'setsCount',
                colorDiff: {
                    equals: 'black',
                    greater: 'green',
                    lower: 'red'
                },
                sortable: true
            }
        ]
    }
}