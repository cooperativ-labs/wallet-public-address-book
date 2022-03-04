import cn from 'classnames';
import NavBar from './NavigationBar';

import React, { FC, useContext } from 'react';

import LoadingModal from '@src/components/loading/ModalLoading';
import NeedAccount from './ModalNeedAccount';
import SearchResults from '@src/utils/helpersSearch';
import WalletChooserModal from './WalletChooserModal';
import WarningBanner from '@src/components/alerts/WarningBanner';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { WalletOwnerContext } from '@src/SetAppContext';
import { Web3Provider } from '@ethersproject/providers';

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
        <NavBar />
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
  const { uuid } = useContext(WalletOwnerContext);
  const { account: walletAddress } = useWeb3React<Web3Provider>();
  const { loading: userLoading, data: userData, error } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser;
  console.log(error, user);

  if (loadingComponent || userLoading) {
    return <LoadingModal />;
  } else if (!user) {
    return <NeedAccount />;
  }

  return (
    <>
      {walletAddress !== uuid && (
        <WarningBanner
          color="cYellow"
          textClass="font-medium text-white text-xs md:text-sm"
          text={`You are currently using a wallet that does not match your account: ${walletAddress}`}
        />
      )}
      <Manager>{children}</Manager>
    </>
  );
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent, homePage }) => {
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
        <WalletChooserModal />
        <ManagerNavigationFrame homePage={homePage} loadingComponent={loadingComponent}>
          {children}
        </ManagerNavigationFrame>
      </div>
    </div>
  );
};

export default ManagerWrapper;
