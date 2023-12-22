import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
 reducerPath: 'contactsApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
 tagTypes: ['Contacts'],
 endpoints: (builder) => ({
  contacts: builder.query<Contact[], void>({
   query: () => '/contacts',
   providesTags: ['Contacts'],
   keepUnusedDataFor: 5,
  }),
  contact: builder.query<Contact, number>({
   query: (id) => `/contacts/${id}`,
   providesTags: ['Contacts']
  }),
  addContact: builder.mutation<void, Contact>({
   query: (contact) => ({
    url: '/contacts',
    method: 'POST',
    body: contact
   }),
   invalidatesTags: ['Contacts']
  }),
  updateContact: builder.mutation<void, Contact>({
   query: ({ id, ...rest }) => ({
    url: `/contacts/${id}`,
    method: 'PUT',
    body: rest
   }),
   invalidatesTags: ['Contacts']
  }),

  deleteContact: builder.mutation<void, number>({
   query: (id) => ({
    url: `/contacts/${id}`,
    method: 'DELETE'
   }),
   invalidatesTags: ['Contacts']
  }),
 })
})

export const { useContactsQuery, useContactQuery, useAddContactMutation, useDeleteContactMutation, useUpdateContactMutation } = contactsApi;