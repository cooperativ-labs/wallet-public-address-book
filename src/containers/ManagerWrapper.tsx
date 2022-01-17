import cn from 'classnames';

import ManagerSideBar from './ManagerSideBar';
import NavBar from './NavigationBar';

import React, { FC, useContext } from 'react';
import SetUserContext, { UserContext } from '@src/utils/SetUserContext';

import AlertPopup from '@src/components/alerts/AlertPopup';
import LoadingModal from '@src/components/loading/ModalLoading';
import NeedAccount from './ModalNeedAccount';
import SetWalletContext from '@src/web3/SetWalletContext';
import WalletChooserModal from './WalletChooserModal';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  return (
    <div>
      <div className="md:mx-8">
        <NavBar />
      </div>
      <div className="flex md:w-screen h-full">
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <ManagerSideBar />
        </div>
        <div className="flex-grow h-full z-10">
          <div className="h-full px-4 md:px-8 py-2 ">
            <div className={'mx-auto min-h-full mt-8'} style={{ maxWidth: '1580px' }}>
              {children}
            </div>
            <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ManagerWrapperProps = {
  children: React.ReactNode;
  loadingComponent?: boolean;
};

const ManagerNavigationFrame: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  const { userId, loading: idLoading } = useContext(UserContext);

  if (idLoading || loadingComponent) {
    return <LoadingModal />;
  } else if (!userId) {
    return <NeedAccount />;
  }

  return <Manager>{children}</Manager>;
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  return (
    <SetWalletContext>
      <SetUserContext>
        <div className="h-full">
          <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
            <AlertPopup />
            <WalletChooserModal />
            <ManagerNavigationFrame loadingComponent={loadingComponent}>{children}</ManagerNavigationFrame>
          </div>
        </div>
      </SetUserContext>
    </SetWalletContext>
  );
};

export default ManagerWrapper;
