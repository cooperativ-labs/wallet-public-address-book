import React, { FC } from 'react';
import { ADD_USER_WITH_WALLET } from '@src/utils/dGraphQueries/user';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import FormattedCryptoAddress from '../FormattedCryptoAddress';
import ChooseConnectorButton from '@src/containers/ChooseConnectorButton';
import Input from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import { MatchSupportedChains } from '@src/web3/connectors';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateAccount: FC = () => {
  const { account: walletAddress, chainId } = useWeb3React<Web3Provider>();
  const router = useRouter();
  // const conditionalMutation = walletAddress ? ADD_USER_WITH_WALLET : ADD_USER_WITHOUT_WALLET;
  const [addUser, { data, error }] = useMutation(ADD_USER_WITH_WALLET);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    router.reload();
  }

  return (
    <Formik
      initialValues={{
        email: '',
        fullName: '',
        walletName: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!walletAddress) {
          alert('Use of Contributor Credits requires a wallet');
        }
        if (!values.email) {
          errors.email = 'Please include an email address';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.fullName) {
          errors.fullName = 'Please include a first name';
        }
        if (!values.walletName) {
          errors.walletName = 'Please give this wallet a name';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          addUser({
            variables: {
              currentDate: currentDate,
              email: values.email,
              fullName: values.fullName,
              walletAddress: walletAddress,
              walletName: values.walletName,
              chainId: chainId,
              protocol: MatchSupportedChains(chainId).protocol,
            },
          });

          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
            {walletAddress ? (
              <div>
                <div className="text-sm">Linked wallet address:</div>
                <div className="hidden md:flex font-bold text-gray-600">{walletAddress} </div>
                <div className="md:hidden">
                  <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="text-large font-bold" />
                </div>
                <Input
                  className={fieldDiv}
                  required
                  labelText="Wallet name"
                  name="walletName"
                  type="text"
                  placeholder="e.g. Primary Wallet"
                />
              </div>
            ) : (
              <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
            )}
          </div>
          {walletAddress && (
            <div className="mt-10 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
              <div className="font-semibold text-gray-700">
                If you are logging in for the first time, we will also need:
              </div>
              <Input
                className={fieldDiv}
                required
                labelText="Email"
                name="email"
                type="email"
                placeholder="e.g. moe@bonuslife.com"
              />
              <Input
                className={fieldDiv}
                required
                labelText="Full name"
                name="fullName"
                type="text"
                placeholder="e.g. Moritz Zimmermann"
              />
              <MajorActionButton type="submit" disabled={isSubmitting || !walletAddress}>
                {!walletAddress ? <> To create an account, you must connect a wallet </> : <>Create account</>}
              </MajorActionButton>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CreateAccount;
