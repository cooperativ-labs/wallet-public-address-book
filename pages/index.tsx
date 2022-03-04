import React, { FC } from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';

import Dashboard from '@src/pages/Dashboard';
import { NextPage } from 'next';

const DashboardPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper homePage>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;
