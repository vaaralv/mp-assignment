import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, Hotel } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://europe-west1-mp-assignment-404812.cloudfunctions.net/MP",
  }),
  tagTypes: ["Channel"],
  endpoints: (builder) => ({
    getHotels: builder.query<Hotel[], void>({
      query: () => {
        return {
          url: "",
          method: "GET",
          params: {
            path: "hotels",
          },
        };
      },
    }),
    getChannels: builder.query<Channel[], void>({
      query: () => {
        return {
          url: "",
          method: "GET",
          params: {
            path: "channels",
          },
        };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Channel" as const,
                id: _id,
              })),
              "Channel",
            ]
          : ["Channel"],
    }),
    updateChannel: builder.mutation<
      Channel,
      Partial<Channel> & Pick<Channel, "_id">
    >({
      query: (body) => {
        return {
          url: "",
          method: "POST",
          body,
          params: {
            path: "channels",
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Channel", id: arg._id },
      ],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetChannelsQuery,
  useUpdateChannelMutation,
} = api;
