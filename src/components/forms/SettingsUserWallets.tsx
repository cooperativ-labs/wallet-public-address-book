import Checkbox from '../form-components/Checkbox';
import FormattedCryptoAddress from '../FormattedCryptoAddress';
import Input, { defaultFieldLabelClass } from '../form-components/Inputs';
import React, { useState } from 'react';
import Select from '../form-components/Select';
import { CryptoAddressProtocol, CryptoAddressType } from 'types';
import { Form, Formik } from 'formik';
import { GET_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';
import { UPDATE_USER_WALLETS } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

const SettingsUserWallets = ({ user }) => {
  const { account: walletAddress, chainId, library } = useWeb3React<Web3Provider>();
  const { data: walletData } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress },
  });
  const [alerted, setAlerted] = useState<Boolean>(false);
  const [updateUserWallets, { data, error }] = useMutation(UPDATE_USER_WALLETS);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  if (data?.updateUser === null) {
    alert('Oops. Looks like that wallet is already associated with an account');
  }

  const walletVerificationString = 'Click sign below to confirm that this is your wallet';
  const existingWallet = walletData?.getCryptoAddress;
  const newWalletAddress = !user.walletAddresses.find((cryptoaddress) => cryptoaddress.address === walletAddress);
  console.log(existingWallet);
  const handleWalletAddition = async (values) => {
    try {
      const signer = await library.getSigner();
      const signature = await signer.signMessage(walletVerificationString);
      const recoveredAddress = utils.verifyMessage(walletVerificationString, signature);
      if (walletAddress === recoveredAddress) {
        updateUserWallets({
          variables: {
            userId: user.id,
            name: values.name,
            walletAddress: walletAddress,
            protocol: CryptoAddressProtocol.Eth,
            type: values.isContractAddress ? CryptoAddressType.Contract : CryptoAddressType.Wallet,
            chainId: parseInt(values.chainId, 10),
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        chainId: `${chainId}`,
        isContractAddress: false,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name && walletAddress) {
          errors.name = 'Please include a name';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleWalletAddition(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col">
          <hr className="mt-6 mb-8 md:mb-4" />
          {!newWalletAddress || !!existingWallet ? (
            existingWallet ? (
              'The wallet you are currently using is already associated with another account.'
            ) : (
              'Connect another wallet to add it to this account.'
            )
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  className={`${fieldDiv} w-full md:col-span-1`}
                  required
                  labelText="Name"
                  name="name"
                  placeholder="Personal"
                />
                <div className="md:pt-3 m-2">
                  <label className={defaultFieldLabelClass}>Wallet Address</label>
                  <div className="m-2" />
                  <FormattedCryptoAddress
                    chainId={chainId}
                    address={walletAddress}
                    showFull
                    className="justify-start text-large font-bold"
                  />
                </div>
              </div>
              <Checkbox
                name="isContractAddress"
                checked={values.isContractAddress}
                labelText="This is a synthetic address that only works on one network, such as a multi-sig wallet"
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
              >
                Add Wallet to my account
              </button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserWallets;
