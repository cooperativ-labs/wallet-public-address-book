import Checkbox from '../form-components/Checkbox';
import Input from '../form-components/Inputs';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { makeRemovalList, makeSubmissionList } from '@src/utils/dGraphQueries/gqlUtils';
import { UPDATE_USER_INFORMATION } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingUserPersonalInfo = ({ user }) => {
  const userId = user.id;
  const [updateUser, { data, error }] = useMutation(UPDATE_USER_INFORMATION);
  const [incomingExpertise, setIncomingExpertise] = useState<string[]>(user?.expertise);
  const [incomingInterests, setIncomingInterests] = useState<string[]>(user?.interests);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateUser.user[0].fullName} was successfully updated!`);
    setIncomingExpertise(data.updateUser.user[0].expertise);
    setIncomingInterests(data.updateUser.user[0].interests);
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        fullName: user.fullName,
        displayName: user.displayName,
        profileImage: user.profileImage,
        public: user.public,
        biography: user.biography,
        expertise: user.expertise,
        interests: user.interests,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include your full name.';
        } else if (!/^[a-z ,.'-]+$/i.test(values.fullName)) {
          errors.fullName = 'Please only use valid characters';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.expertise)) {
          errors.expertise = 'Please only use letters, numbers, spaces, and commas.';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.interests)) {
          errors.interests = 'Please only use letters, numbers, spaces, and commas.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const expertiseAdd = makeSubmissionList(values.expertise);
        const interestsAdd = makeSubmissionList(values.interests);
        const expertiseRemove = makeRemovalList(incomingExpertise, expertiseAdd);
        const interestsRemove = makeRemovalList(incomingInterests, interestsAdd);
        setAlerted(false);
        setSubmitting(true);
        updateUser({
          variables: {
            userId: userId,
            fullName: values.fullName,
            displayName: values.displayName,
            profileImage: values.profileImage,
            public: values.public,
            biography: values.biography,
            expertiseAdd: expertiseAdd,
            expertiseRemove: expertiseRemove,
            interestsAdd: interestsAdd,
            interestsRemove: interestsRemove,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Personal Information</h2>
          <div className="flex items-end">
            <Checkbox className="mt-2" name="public" checked={values.public} />
            <p className="mb-2 ml-2 text-sm text-blue-900 font-semibold text-opacity-80 ">
              Show my profile in the public address book
            </p>
          </div>
          <Input className={fieldDiv} labelText="Display name" name="displayName" type="text" placeholder="Moritz" />
          <Input
            className={fieldDiv}
            required
            labelText="Full name"
            name="fullName"
            type="text"
            placeholder="e.g. Moritz Zimmermann"
          />
          <Input
            className={fieldDiv}
            labelText="Profile image"
            name="profileImage"
            type="text"
            placeholder="e.g. https://source.com/your-picture"
          />
          <Input className={fieldDiv} fieldHeight="h-24" textArea labelText="Biography" name="biography" />
          <Input
            className={fieldDiv}
            textArea
            labelText="Expertise (comma-separated tags)"
            name="expertise"
            placeholder="e.g. UX Design, React, Government Regulation, Early 20th Century Russian History"
          />
          <Input
            className={fieldDiv}
            textArea
            labelText="Interests (comma-separated tags)"
            name="interests"
            placeholder="e.g. UX Design, React, Government Regulation, Early 20th Century Russian History"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingUserPersonalInfo;
