import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath : "authApi",
    baseQuery : fetchBaseQuery({baseUrl : "/api/v2"}),
    endpoints : (builder)=>({
register : builder.mutation({
    query(body){
        return{
            url : "/register",
            method : "POST",
            body
        }
    }
}),
login : builder.mutation({
    query(body) {
        return{
            url : "/login",
            method : "POST",
            body
        }
    },
    // async onQueryStarted(args,{dispatch, queryFulfilled}){
    //     try {
    //         await queryFulfilled;
    //         await dispatch(userApi.endpoints.getMe.initiate(null))
           
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}),
    })
})

export const {useRegisterMutation, useLoginMutation} = authApi