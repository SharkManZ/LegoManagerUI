import {api} from "./api";

export const userSetApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserSets: builder.query({
            query: (args) => {
                const {id, params} = args;
                return {
                    url: `/userSet/${id}/list`,
                    method: 'POST',
                    body: params
                }
            }
        }),
        saveUserSet: builder.mutation({
            query: (body) => ({
                url: '/userSet/save',
                method: 'POST',
                body: body
            })
        }),
        deleteUserSet: builder.mutation({
            query: (body) => ({
                url: `/userSet/${body}/delete`,
                method: 'POST'
            })
        })
    })
})