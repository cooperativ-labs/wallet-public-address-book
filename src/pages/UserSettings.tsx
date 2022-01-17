import React, { FC, useContext } from 'react';

import FormCard from '@src/components/cards/FormCard';
import Loading from '@src/components/loading/Loading';
import SettingsUserPersonalInfo from '@src/components/forms/SettingsUserPersonalInfo';
import SettingsUserSocial from '@src/components/forms/SettingsUserSocial';
import SettingsUserWallets from '@src/components/forms/SettingsUserWallets';
import WalletAddressList from '@src/components/WalletAddressList';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import LinkedAccountsList from '@src/components/LinkedAccountsList';

const UserSettings: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  if (!user) {
    return <Loading />;
  }

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div>
        <FormCard center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
          <WalletAddressList walletAddresses={user.walletAddresses} />
          <SettingsUserWallets user={user} />
        </FormCard>
        <FormCard center>
          <SettingsUserPersonalInfo user={user} />
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
