import Input from '../form-components/Inputs';
import React from 'react';
import Select from '../form-components/Select';
import { ADD_USER_SOCIAL_ACCOUNTS } from '@src/utils/dGraphQueries/user';
import { Form, Formik } from 'formik';
import { socialAccountOptions } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingsUserSocial = ({ user }) => {
  const [addSocials, { error }] = useMutation(ADD_USER_SOCIAL_ACCOUNTS);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }

  return (
    <Formik
      initialValues={{
        username: '',
        type: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.username) {
          errors.username = 'Please include a username';
        }
        if (!values.type) {
          errors.type = 'Please select a platform';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        addSocials({
          variables: {
            userId: user.id,
            username: values.username,
            type: values.type,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col relative">
          <hr className="mt-6 mb-8 md:mb-4" />
          <Select className={fieldDiv} labelText="Platform" name="type">
            <option value="">select a platform</option>
            {socialAccountOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Input className={fieldDiv} type="text" labelText="Username" name="username" placeholder="username" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserSocial;
