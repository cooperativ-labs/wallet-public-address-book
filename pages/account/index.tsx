import ManagerWrapper from '@src/containers/ManagerWrapper';
import UserSettings from '@src/pages/UserSettings';
import React, { FC } from 'react';

const UserSettingsPage: FC = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <ManagerWrapper>
        <UserSettings />
      </ManagerWrapper>
    </div>
  );
};

export default UserSettingsPage;
