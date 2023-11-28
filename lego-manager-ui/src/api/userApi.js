import {api} from "../store/api/api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsersList: builder.query({
            query: () => '/users/list/all'
        })
    })
})