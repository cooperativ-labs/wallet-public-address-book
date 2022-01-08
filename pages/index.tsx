import React, { FC } from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';

const DashboardPage: FC = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>HELLO</ManagerWrapper>
    </div>
  );
};
export default DashboardPage;
