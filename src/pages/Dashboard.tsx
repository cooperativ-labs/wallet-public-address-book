import React, { FC } from 'react';
import UserList from '@src/components/UserList';
import UserSearch from '@src/components/forms/UserSearch';
import SearchResults, { NoResults } from '@src/utils/helpersSearch';

const Dashboard: FC = () => {
  const results = SearchResults();

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="flex">
        {NoResults(results) && (
          <div className="flex mx-auto mt-24 md:mt-64 w-full md:px-24">
            <UserSearch
              fullWidth
              fieldClass="h-20 md:h-24 md:w-full border-0"
              buttonClass="bg-blue-900 hover:bg-blue-800 h-20 md:h-24 text-white font-bold uppercase md:w-32 p-4"
            />
          </div>
        )}
        {!NoResults(results) && (
          <div className="mt-4 w-full md:w-min">
            <UserList users={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
