import Input from '../../components/form-components/Inputs';
import React, { useEffect, useState } from 'react';
import { ADD_USER_EMAIL } from '../../utils/dGraphQueries/user';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { getAuth, linkWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from 'firebase/auth';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';
const provider = new GoogleAuthProvider();
const auth = getAuth();

const SettingsUserEmails = ({ user }) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addUserEmails, { error }] = useMutation(ADD_USER_EMAIL);
  const [localStorage, setLocalStorage] = useState(undefined);
  useEffect(() => {
    setLocalStorage(window.localStorage);
  });
  const emailForSignIn = localStorage?.getItem('emailForSignIn');
  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  const handleAddEmailAddress = async (address) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/account',
      // url: 'https://walletbook.netlify.app/account',
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, address, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', address);
        alert('Check your inbox for an email confirmation');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

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
          <hr className="mt-6 mb-8 md:mb-4" />
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
// const handleAddGoogleAccount = () => {
//   linkWithPopup(auth.currentUser, provider)
//     .then((result) => {
//       // Accounts successfully linked.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const user = result.user;
//       console.log(user, credential);
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       // ...
//     });
// };
