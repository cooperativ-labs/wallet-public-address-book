import React from 'react';
import { checkWalletTaken } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { UPDATE_USER_WALLETS } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';
import Input from '../form-components/Inputs';
import Select from '../form-components/Select';
import Checkbox from '../form-components/Checkbox';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { CryptoAddressType, CryptoAddressProtocol } from '/types';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const SettingsUserWallets = ({ user }) => {
  const { chainId } = useWeb3React<Web3Provider>();
  const [updateUserWallets, { data, error }] = useMutation(UPDATE_USER_WALLETS);

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(`${data.updateUser.user[0].displayName} was successfully updated!`);
  }

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        chainId: `${chainId}`,
        isContractAddress: false,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        console.log(values);
        if (!values.name && values.address) {
          errors.name = 'Please include a name';
        }
        if (values.name && !values.address) {
          errors.address = 'Please include an address';
        }

        if (values.address && (await checkWalletTaken(values.address))) {
          errors.address = 'That wallet address is already taken';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        updateUserWallets({
          variables: {
            userId: user.id,
            name: values.name,
            walletAddress: values.address,
            protocol: CryptoAddressProtocol.Eth,
            type: values.isContractAddress ? CryptoAddressType.Contract : CryptoAddressType.Wallet,
            chainId: parseInt(values.chainId),
          },
        });

        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-1`}
              required
              labelText="Name"
              name="name"
              placeholder="Personal"
            />
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Address"
              name="address"
              required
              placeholder="0x0dBb2C4107d77EB34535840d63CF02aE46bedebD"
            />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <Checkbox
              className={`${fieldDiv} md:col-span-1`}
              name="isContractAddress"
              checked={values.isContractAddress}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add Wallet
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserWallets;
