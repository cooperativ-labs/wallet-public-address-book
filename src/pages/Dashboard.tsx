import React, { FC, useState } from 'react';
import { GET_USER_FROM_SOCIAL, SEARCH_USERS } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import UserList from '@src/components/UserList';
import { LinkedAccount } from 'types';
import { unique } from '@src/utils/helpersGeneral';

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

  const getUserFromSocial = (result: LinkedAccount[]) => {
    return result.map((account) => {
      return account.user;
    });
  };

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="md:mx-4">
        <div className="flex">
          <input
            name="search"
            type="text"
            onChange={(event) => setSearchText(event.target.value)}
            value={searchText}
            placeholder="search"
            className="h-14 border-1 border-cLightBlue rounded-xl md:w-96"
          />
        </div>
        <div className="mt-4">{userResult && <UserList users={userResult} />}</div>
        <div className="mt-4">{socialResult && <UserList users={getUserFromSocial(socialResult)} />}</div>
      </div>{' '}
    </div>
  );
};
//

export default Dashboard;
