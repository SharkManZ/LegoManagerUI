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
            }),
            providesTags: ['Users']
        }),
        saveUser: builder.mutation({
            query: (body) => ({
                url: '/users/save',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: (body) => ({
                url: `/users/${body}/delete`,
                method: 'POST'
            }),
            invalidatesTags: ['Users']
        })
    })
})