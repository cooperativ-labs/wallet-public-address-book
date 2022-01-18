import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LogoutButton from '@src/components/buttons/LogoutButton';
import React, { FC } from 'react';
import UserMenu from './UserMenu';
import UserSearch from '@src/components/forms/UserSearch';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

type NavBarProps = {
  transparent?: boolean;
  gaming?: boolean;
  noSearch?: boolean;
};

export const NavBar: FC<NavBarProps> = ({ noSearch }) => {
  const { account, chainId } = useWeb3React<Web3Provider>();

  return (
    <div className="flex py-2 px-2 pr-4 md:mt-4 z-30  mx-auto justify-between">
      <div className=" justify-start flex items-center">
        {!noSearch ? (
          <UserSearch />
        ) : (
          <FormattedCryptoAddress
            className="md:text-xl font-bold text-gray-700 items-center"
            address={account}
            chainId={chainId}
            withCopy
            showFull
            label="My address:"
          />
        )}{' '}
      </div>

      <div className="flex justify-end items-center ">
        <span className="hidden md:flex items-center mr-3">
          <LogoutButton />
        </span>
        <UserMenu />
      </div>
    </div>
  );
};

export default NavBar;
