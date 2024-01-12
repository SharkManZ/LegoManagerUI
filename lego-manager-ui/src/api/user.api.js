import {api} from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsersList: builder.query({
            query: () => '/users/list/all',
            providesTags: ['Users']
        }),
        getUsers: builder.query({
            query: (body) => ({
                url: '/users/list',
                method: 'POST',
                body: body
            })
        }),
        saveUser: builder.mutation({
            query: (body) => ({
                url: '/users/save',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result) => (result ? ['Users'] : [])
        }),
        deleteUser: builder.mutation({
            query: (body) => ({
                url: `/users/${body}/delete`,
                method: 'POST'
            }),
            invalidatesTags: (result, error) => (result ? ['Users'] : [])
        }),
        getUserSetsSummary: builder.query({
            query: (body) => ({
                url: `/users/${body}/setsSummary`,
                method: 'GET'
            })
        })
    })
})