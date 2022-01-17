import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';

import { useQuery } from '@apollo/client';
import Input from '../form-components/Inputs';

import { GET_USER_FROM_SOCIAL, SEARCH_USERS } from '@src/utils/dGraphQueries/user';

const UserSearch: FC<any> = ({ setSearchText }) => {
  return (
    <Formik
      initialValues={{
        searchText: '',
      }}
      validate={() => {
        const errors: any = {}; /** @TODO : Shape */
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setSearchText(values.searchText);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col relative">
          <Input
            className="h-14 border-1 border-cLightBlue rounded-xl md:w-96"
            type="text"
            name="searchText"
            placeholder="username"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserSearch;
