import React, { FC, useContext } from 'react';
import { Form, Formik } from 'formik';

import Input from '../form-components/Inputs';
import { ApplicationStoreProps, store } from '@context/store';
import { useRouter } from 'next/router';

const UserSearch: FC<any> = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const router = useRouter();

  const handleSubmit = (submission) => {
    dispatch({ type: 'SET_SEARCHTEXT', payload: submission });
    if (router.route !== '/') {
      router.push('/');
    }
  };

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
        handleSubmit(values.searchText);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center h-14">
          <Input
            fieldClass="h-14 md:w-96 border-0"
            type="text"
            name="searchText"
            placeholder="Search by name, email, or username"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8  p-4"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserSearch;
