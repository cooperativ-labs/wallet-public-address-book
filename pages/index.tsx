import React, { FC } from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';

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
