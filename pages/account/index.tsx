import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import UserSettings from '@src/pages/UserSettings';

const UserSettingsPage: FC = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <UserSettings />
      </ManagerWrapper>
    </div>
  );
};

export default UserSettingsPage;
