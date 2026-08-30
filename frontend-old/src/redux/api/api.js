import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes: ["Chat","User","Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendGroupJoinRequest: builder.mutation({
      query: (data) => ({
        url: "/request/send",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: "/request/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptRequest: builder.mutation({
        query: (data) => ({
          url: "/request/accept",
          method: "PUT",
          credentials: "include",
          body: data,
        }),
        invalidatesTags: ["Chat"],
      }),

      getChatDetails: builder.query({
        query: ({chatId,populate = false}) => {
          let url = 'chat/'+chatId;
          if(populate) url += '?populate=true';


          return{
          url,
          credentials: "include",
        }},
        providesTags: ['Chat'],
      }),
      getMessages: builder.query({
        query: ({chatId,page}) => ({
          url: `chat/message/${chatId}?page=${page}`,
          credentials: "include",
        }),
        keepUnusedDataFor: 0,
      }),
      sendAttachments: builder.mutation({
        query: (data) => ({
          url: `chat/message`,
          method: 'POST',
          credentials: "include",
          body: data
        }),
      }),
      deletePendingMessages: builder.mutation({
        query: ({chatId}) => ({
          url: `/chat/delete-pending/${chatId}`,
          method: "DELETE",
          credentials: "include"
        }),
        invalidatesTags: ["Chat"],
      }),


  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendGroupJoinRequestMutation,
  useGetNotificationsQuery,
  useAcceptRequestMutation,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useDeletePendingMessagesMutation
} = api;
export default api;
