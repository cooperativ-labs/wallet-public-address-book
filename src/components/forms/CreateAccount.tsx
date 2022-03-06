import React, { FC, useContext } from 'react';
import { ADD_USER_WITH_WALLET } from '@src/utils/dGraphQueries/user';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import Checkbox from '../form-components/Checkbox';
import ChooseConnectorButton from '@src/containers/ChooseConnectorButton';
import FormattedCryptoAddress from '../FormattedCryptoAddress';
import Input from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import Select from '../form-components/Select';
import SignButton from '@src/containers/SignWalletButton';
import { MatchSupportedChains } from '@src/web3/connectors';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateAccount: FC = () => {
  const { account: walletAddress, chainId } = useWeb3React<Web3Provider>();
  const { uuid } = useContext(WalletOwnerContext);
  const router = useRouter();
  const [addUser, { data, error }] = useMutation(ADD_USER_WITH_WALLET);

  if (error) {
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
        chainId: `${chainId}`,
        isContractAddress: false,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!walletAddress) {
          alert('Use of Contributor Credits requires a wallet');
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
              uuid: uuid,
              fullName: values.fullName,
              walletAddress: walletAddress,
              walletName: values.walletName,
              chainId: parseInt(values.chainId, 10),
              protocol: MatchSupportedChains(chainId).protocol,
            },
          });

          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <>
          {!walletAddress ? (
            <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
              <ChooseConnectorButton buttonText="Connect your Ethereum wallet" large />
            </div>
          ) : (
            <div>
              {!uuid ? (
                <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
                  <div className="mb-4">
                    <div className="text-sm">Linked wallet address:</div>
                    <FormattedCryptoAddress
                      chainId={chainId}
                      address={walletAddress}
                      className="text-large font-bold"
                      showFull
                    />
                  </div>
                  <SignButton />{' '}
                </div>
              ) : (
                <Form className="flex flex-col gap relative">
                  <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
                    <div className="text-sm">Linked wallet address:</div>
                    <FormattedCryptoAddress
                      chainId={chainId}
                      address={walletAddress}
                      className="text-large font-bold"
                      showFull
                    />
                    <Input
                      className={fieldDiv}
                      required
                      labelText="Wallet name"
                      name="walletName"
                      type="text"
                      placeholder="e.g. Primary Wallet"
                    />
                    <Checkbox
                      name="isContractAddress"
                      checked={values.isContractAddress}
                      labelText="This is a synthetic addresses that only works on one network, such as a multi-sig wallet"
                      sideLabel
                    />

                    {values.isContractAddress && (
                      <Select
                        className={`${fieldDiv} md:col-span-3`}
                        required
                        name="chainId"
                        labelText="This address is only active on:"
                      >
                        <option value="">Select chain</option>
                        <option value="1">Ethereum Mainnet</option>
                        <option value="43114">Avalanche Mainnet</option>
                        <option value="56">Binance Smart Chain</option>
                        <option value="10">Optimism</option>
                        <option value="100">xDAI</option>
                        <option value="137">Polygon</option>
                        <option value="3">Ropsten Testnet</option>
                        <option value="4">Rinkeby Testnet</option>
                        <option value="5">Görli Testnet</option>
                      </Select>
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
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default CreateAccount;
