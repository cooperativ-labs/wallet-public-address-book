import React, { FC, useState } from 'react';
import UserList from '@src/components/UserList';
import { LinkedAccount, User } from 'types';
import UserSearch from '@src/components/forms/UserSearch';
import { useQuery } from '@apollo/client';
import { GET_USER_FROM_SOCIAL, SEARCH_USERS } from '@src/utils/dGraphQueries/user';

const Dashboard: FC = () => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

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
  const fixedResults = socialResult && socialResult[0] && getUserFromSocial(socialResult);
  const totalResults = socialResult && socialResult[0] ? [...fixedResults, ...userResult] : userResult;

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="md:mx-4">
        <div className="flex">
          <UserSearch setSearchText={setSearchText} />
          <div className="mt-4">{totalResults && <UserList users={totalResults} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
