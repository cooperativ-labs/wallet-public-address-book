import Button from '@src/components/Buttons/Button';

import Link from 'next/link';

import React, { FC, useContext, useState } from 'react';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import NetworkIndicator, { NetworkIndicatorDot } from '@src/components/indicators/NetworkIndicator';
import LogoutButton from '@src/components/buttons/LogoutButton';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import BaseCard from '@src/components/cards/BaseCard';

type UserMenuProps = {};

const UserMenu: FC<UserMenuProps> = ({}) => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  const { account: walletAddress, chainId, active } = useWeb3React<Web3Provider>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)} />}
      <div className="relative flex flex-col items-center ">
        <Button
          className="focus:outline-none"
          aria-label={open ? 'expand section' : 'collapse section'}
          onClick={() => setOpen(!open)}
        >
          <div className="overflow-hidden items-center rounded-full h-10 w-10 md:h-12 md:w-12">
            <img src={user?.profileImage ?? '/assets/images/UserImages/placeholder.png'} />
          </div>
          <div className="flex justify-end -mt-3 -mr-1">
            <NetworkIndicatorDot chainId={chainId} walletAddress={walletAddress} />
          </div>
        </Button>
        {open && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)}>
            <BaseCard className="absolute top-12 md:top-16 right-0 p-3 w-56 rounded-xl shadow-lg">
              {active && (
                <div className="flex flex-col items-center">
                  <NetworkIndicator />
                  <div className="mt-3" />
                  <FormattedCryptoAddress chainId={chainId} address={walletAddress} withCopy />
                </div>
              )}
              <hr className="my-5" />
              <div className="flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <Link href="/app/account/">Account Settings</Link>
              </div>
              <div className="md:hidden flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <LogoutButton />
              </div>
              <div></div>
            </BaseCard>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
