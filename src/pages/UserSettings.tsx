import React, { FC, useContext } from 'react';

import EmailAddressList from '@src/components/EmailAddressList';
import FormCard from '@src/components/cards/FormCard';
import LinkedAccountsList from '@src/components/LinkedAccountsList';
import Loading from '@src/components/loading/Loading';
import SettingsUserEmails from '@src/components/forms/SettingsUserEmails';
import SettingsUserPersonalInfo from '@src/components/forms/SettingsUserPersonalInfo';
import SettingsUserSocial from '@src/components/forms/SettingsUserSocial';
import SettingsUserWallets from '@src/components/forms/SettingsUserWallets';
import WalletAddressList from '@src/components/WalletAddressList';
import { ADD_USER_EMAIL, GET_USER } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { WalletOwnerContext } from '@src/SetAppContext';

const UserSettings: FC = () => {
  const { uuid } = useContext(WalletOwnerContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];

  if (!user) {
    return <Loading />;
  }

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
