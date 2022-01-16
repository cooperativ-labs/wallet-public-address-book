import React, { FC, useContext, useState } from 'react';
import { GET_USER, SEARCH_USERS } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import Loading from '@src/components/loading/Loading';
import BaseCard from '@src/components/cards/BaseCard';
import UserList from '@src/components/UserList';

const Dashboard: FC = () => {
  const { userId } = useContext(UserContext);
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const createSearchQuery = () => {
    if (searchText && searchText.length > 3) {
      return searchText;
    }
  };
  const { data: resultData } = useQuery(SEARCH_USERS, {
    variables: { fullName: createSearchQuery(), email: createSearchQuery() },
  });
  const result = resultData?.queryUser;

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
        <div className="mt-4">{result && <UserList users={result} />}</div>
      </div>{' '}
    </div>
  );
};
//

export default Dashboard;
