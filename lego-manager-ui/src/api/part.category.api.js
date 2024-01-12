import {api} from "./api";

export const partCategoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        list: builder.query({
            query: (body) => ({
                url: '/part/category/list',
                method: 'POST',
                body: body
            })
        }),
        listAll: builder.query({
            query: (body) => ({
                url: '/part/category/list/all',
                method: 'GET'
            })
        }),
        save: builder.mutation({
            query: (body) => ({
                url: '/part/category/save',
                method: 'POST',
                body: body
            })
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `/part/category/${id}/delete`,
                method: 'POST'
            })
        })
    })
})