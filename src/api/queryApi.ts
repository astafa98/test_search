import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import { UNSPLASH_URL } from "../constants";
import type { ISearchForm } from "../types";
import type { Welcome } from "../types";

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: UNSPLASH_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.service.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    queryImage: builder.mutation<Welcome, ISearchForm>({
      query: (body) => ({
        url: `search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${body.query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useQueryImageMutation } = queryApi;
