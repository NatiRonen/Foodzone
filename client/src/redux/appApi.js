import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//define a service user a base url
const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    credentials: "include",
  }),
  //creating new user
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    //login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users/update",
        method: "PUT",
        body: user,
        headers: {
          "x-api-key": localStorage["tok"],
          "content-type": "application/json",
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (password) => ({
        url: "/users",
        method: "DELETE",
        headers: {
          "x-api-key": password,
          "content-type": "application/json",
        },
      }),
    }),

    //favs
    fetchFavs: builder.mutation({
      query: () => ({
        url: "/favs/",
        method: "GET",
        headers: {
          "x-api-key": localStorage["tok"],
          "content-type": "application/json",
        },
      }),
    }),
    addRemoveFavs: builder.mutation({
      query: (short_id) => ({
        url: "/favs/add_remove/" + short_id,
        method: "PATCH",
        headers: {
          "x-api-key": localStorage["tok"],
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFetchFavsMutation,
  useAddRemoveFavsMutation,
} = appApi;
export default appApi;
