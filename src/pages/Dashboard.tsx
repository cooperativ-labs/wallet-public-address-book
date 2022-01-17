import React, { FC, useContext } from 'react';
import UserList from '@src/components/UserList';
import UserSearch from '@src/components/forms/UserSearch';
import { ApplicationStoreProps, store } from '@context/store';
import { GET_USER_FROM_SOCIAL, SEARCH_USERS } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import UserMenu from '@src/containers/UserMenu';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LogoutButton from '@src/components/buttons/LogoutButton';

const Dashboard: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { searchText } = applicationStore;

  const createSearchQuery = () => {
    if (searchText && searchText.length > 3) {
      return searchText;
    }
  };
  const { data: userResultData } = useQuery(SEARCH_USERS, {
    variables: { fullName: createSearchQuery(), email: createSearchQuery() },
  });
  const userResult = userResultData?.queryUser;

  const { data: socialResultData } = useQuery(GET_USER_FROM_SOCIAL, {
    variables: { username: createSearchQuery() },
  });
  const socialResult = socialResultData?.queryLinkedAccount;

  const getUserFromSocial = (results) => {
    return results?.map((account, i) => {
      return account.user;
    });
  };
  const socialResultPresent = socialResult && socialResult[0] && getUserFromSocial(socialResult);
  const finalResults = socialResult && socialResult[0] ? [...socialResultPresent, ...userResult] : userResult;

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="md:mx-4">
        <div className="flex justify-between mb-8">
          <div className="flex">
            {finalResults ? (
              <UserSearch />
            ) : (
              <FormattedCryptoAddress
                className="text-xl font-bold text-gray-700 items-center"
                address={account}
                chainId={chainId}
                withCopy
                showFull
                label="My address:"
              />
            )}
          </div>
          <div className="flex justify-end">
            <span className="hidden md:flex items-center mr-3">
              <LogoutButton />
            </span>
            <UserMenu />
          </div>
        </div>
        <div className="flex">
          {!finalResults && (
            <div className="flex mx-auto mt-64 w-full px-24">
              <UserSearch
                fullWidth
                fieldClass="md:h-24 md:w-full border-0"
                buttonClass="bg-blue-900 hover:bg-blue-800 h-24 text-white font-bold uppercase md:w-32 p-4"
              />
            </div>
          )}
          <div className="mt-4">{finalResults && <UserList users={finalResults} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
