import Input from '../../components/form-components/Inputs';
import React, { FC, useEffect, useState } from 'react';
import { ADD_USER_EMAIL } from '../../utils/dGraphQueries/user';
import { Form, Formik } from 'formik';
import { handleAddEmailAddress } from 'firebaseConfig/firebaseConfig';
import { useMutation } from '@apollo/client';
import { User } from 'types';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type SettingsUserEmailsProps = {
  user: User;
};

const SettingsUserEmails: FC<SettingsUserEmailsProps> = ({ user }) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addUserEmails, { error }] = useMutation(ADD_USER_EMAIL);
  const [localStorage, setLocalStorage] = useState(undefined);
  useEffect(() => {
    setLocalStorage(window.localStorage);
  });
  //this gets the email address put in local storage by handleAddEmailAddress
  const emailForSignIn = localStorage?.getItem('emailForSignIn');
  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  const addEmailToDatabase = (email) => {
    try {
      addUserEmails({
        variables: {
          uuid: user.uuid,
          address: email,
          public: true,
        },
      });

      window.localStorage.removeItem('emailForSignIn');
    } catch (err) {
      console.log(err);
    }
  };

  if (emailForSignIn) {
    addEmailToDatabase(emailForSignIn);
  }

  return (
    <Formik
      initialValues={{
        address: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.address) {
          errors.address = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.address)) {
          errors.address = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleAddEmailAddress(values.address);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Address"
              name="address"
              required
              placeholder="e.g moritz@bonuslife.com"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add Email
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserEmails;
