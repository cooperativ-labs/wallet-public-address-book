import React, { FC, useContext } from 'react';

import FormCard from '@src/components/cards/FormCard';
import LinkedAccountsList from '@src/components/LinkedAccountsList';
import Loading from '@src/components/loading/Loading';
import SettingsUserPersonalInfo from '@src/components/forms/SettingsUserPersonalInfo';
import SettingsUserSocial from '@src/components/forms/SettingsUserSocial';
import SettingsUserWallets from '@src/components/forms/SettingsUserWallets';
import WalletAddressList from '@src/components/WalletAddressList';
import { ADD_USER_EMAIL, GET_USER } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import EmailAddressList from '@src/components/EmailAddressList';
import SettingsUserEmails from '@src/components/forms/SettingsUserEmails';

const UserSettings: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  ///FOR CONVERTING TO NEW EMAIL ADDRESS STRUCTURE
  const [addUserEmails, { data: emailData, error }] = useMutation(ADD_USER_EMAIL);

  if (!user) {
    return <Loading />;
  }

  ///FOR CONVERTING TO NEW EMAIL ADDRESS STRUCTURE

  if (!emailData && !error && user.emailAddresses.length < 1) {
    try {
      addUserEmails({
        variables: {
          userId: userId,
          address: user.email,
          public: false,
        },
      });
    } catch (err) {}
  }

  ///-------------------------

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full mt-4">
      <div>
        <FormCard center>
          <SettingsUserPersonalInfo user={user} />
        </FormCard>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
          <WalletAddressList walletAddresses={user.walletAddresses} withEdit />
          <SettingsUserWallets user={user} />
        </FormCard>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Email Addresses </h2>
          <EmailAddressList emailAddresses={user.emailAddresses} withEdit />
          <SettingsUserEmails user={user} />
        </FormCard>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Social Accounts</h2>
          <LinkedAccountsList linkedAccounts={user.linkedAccounts} />
          <SettingsUserSocial user={user} />
        </FormCard>
      </div>
    </div>
  );
};

export default UserSettings;
