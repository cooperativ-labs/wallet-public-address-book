import cn from 'classnames';
import NavBar from './NavigationBar';

import React, { FC, useContext } from 'react';
import SetUserContext, { UserContext } from '@src/utils/SetUserContext';

import LoadingModal from '@src/components/loading/ModalLoading';
import NeedAccount from './ModalNeedAccount';
import SearchResults from '@src/utils/helpersSearch';
import SetWalletContext from '@src/web3/SetWalletContext';
import WalletChooserModal from './WalletChooserModal';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

type ManagerProps = {
  children: React.ReactNode;
  homePage?: boolean;
};

const Manager: FC<ManagerProps> = ({ children, homePage }) => {
  const results = SearchResults();
  return (
    <div className="mx-auto" style={{ maxWidth: '1580px' }}>
      <div className="md:mx-6">
        <NavBar noSearch={homePage && !results} />
        {/* <div className="flex md:w-screen h-full"> */}
        <div className="flex-grow h-full z-10">
          <div className="h-full px-2 py-2 md:mt-4">
            <div className="mx-auto min-h-full">{children}</div>
            {/* <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

type ManagerWrapperProps = {
  children: React.ReactNode;
  loadingComponent?: boolean;
  homePage?: boolean;
};

const ManagerNavigationFrame: FC<ManagerWrapperProps> = ({ children, loadingComponent, homePage }) => {
  const { userId, loading: idLoading } = useContext(UserContext);

  if (idLoading || loadingComponent) {
    return <LoadingModal />;
  } else if (!userId) {
    return <NeedAccount />;
  }

  return <Manager homePage={homePage}>{children}</Manager>;
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent, homePage }) => {
  return (
    <SetWalletContext>
      <SetUserContext>
        <div className="h-full">
          <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
            <WalletChooserModal />
            <ManagerNavigationFrame homePage={homePage} loadingComponent={loadingComponent}>
              {children}
            </ManagerNavigationFrame>
          </div>
        </div>
      </SetUserContext>
    </SetWalletContext>
  );
};

export default ManagerWrapper;
