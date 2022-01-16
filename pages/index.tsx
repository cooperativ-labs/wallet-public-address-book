import React, { FC, useContext } from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@src/components/Buttons/Button';
import LogoutButton from '@src/components/buttons/LogoutButton';
import UserMenu from '@src/containers/UserMenu';
import { ApplicationStoreProps, store } from '@context/store';
import Dashboard from '@src/pages/Dashboard';

const DashboardPage: FC = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;
