import React, { FC } from 'react';
import UserList from '@src/components/UserList';
import UserSearch from '@src/components/forms/UserSearch';

import UserMenu from '@src/containers/UserMenu';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LogoutButton from '@src/components/buttons/LogoutButton';
import SearchResults from '@src/utils/helpersSearch';

const Dashboard: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();

  const results = SearchResults();

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="md:mx-4">
        <div className="flex justify-between mb-8 items-center">
          <div className="flex">
            {results ? (
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
            )}
          </div>
          <div className="flex justify-end mr-3">
            <span className="hidden md:flex items-center mr-3 ">
              <LogoutButton />
            </span>
            <UserMenu />
          </div>
        </div>
        <div className="flex">
          {!results && (
            <div className="flex mx-auto mt-24 md:mt-64 w-full md:px-24">
              <UserSearch
                fullWidth
                fieldClass="h-20 md:h-24 md:w-full border-0"
                buttonClass="bg-blue-900 hover:bg-blue-800 h-20 md:h-24 text-white font-bold uppercase md:w-32 p-4"
              />
            </div>
          )}
          <div className="mt-4 w-full md:w-min">{results && <UserList users={results} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
