import React, { FC, useContext } from 'react';

import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import Loading from '@src/components/loading/Loading';
import FormCard from '@src/components/cards/FormCard';
import SettingsUserPersonalInfo from '@src/components/forms/SettingsUserPersonalInfo';
import SettingsUserWallets from '@src/components/forms/SettingsUserWallets';
import SettingsUserSocial from '@src/components/forms/SettingsUserSocial';

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
          <SettingsUserWallets user={user} />
        </FormCard>
        <FormCard center>
          <SettingsUserPersonalInfo user={user} />
        </FormCard>
        <FormCard center>
          <SettingsUserSocial user={user} />
        </FormCard>
      </div>
    </div>
  );
};

export default UserSettings;
