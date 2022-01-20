import React, { FC } from 'react';
import UserList from '@src/components/UserList';
import UserSearch from '@src/components/forms/UserSearch';
import SearchResults from '@src/utils/helpersSearch';

const Dashboard: FC = () => {
  const { searchTextPresent, hasResults, results } = SearchResults();

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="flex">
        {!searchTextPresent && !hasResults && (
          <div className="flex mx-auto mt-24 md:mt-64 w-full md:px-24">
            <UserSearch
              fullWidth
              fieldClass="h-20 md:h-24 md:w-full border-0"
              buttonClass="bg-blue-900 hover:bg-blue-800 h-20 md:h-24 text-white font-bold uppercase md:w-32 p-4"
            />
          </div>
        )}
        {searchTextPresent && !hasResults && (
          <div className="flex mx-auto mt-24 md:mt-64 font-medium text-cLightBlue text-xl">{`Sorry, couldn't find anyone.`}</div>
        )}
        {searchTextPresent && hasResults && (
          <div className="mt-4 w-full md:w-min ">
            <UserList users={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
