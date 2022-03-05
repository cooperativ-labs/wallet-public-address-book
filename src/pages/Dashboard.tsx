import Link from 'next/link';
import React, { FC, useContext } from 'react';
import SearchResults from '@src/utils/helpersSearch';
import UserList from '@src/components/UserList';
import UserSearch from '@src/components/forms/UserSearch';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { WalletOwnerContext } from '@src/SetAppContext';

const Dashboard: FC = () => {
  const { searchTextPresent, hasResults, results } = SearchResults();
  const { uuid } = useContext(WalletOwnerContext);
  const { loading: userLoading, data: userData, error } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];

  const hasEmail = user.emailAddresses.length > 0;
  console.log(hasEmail);

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full">
      <div className="flex">
        {!searchTextPresent && !hasResults && (
          <div className="flex flex-col mx-auto mt-20 md:mt-36 w-full md:px-24">
            {!hasEmail && (
              <Link href="/account">
                <div className="text-slate-600 text-center bg-slate-200 p-3 mb-10 border-2 border-slate-300 rounded-md cursor-pointer">
                  Add an email address to your account to help people find you
                </div>
              </Link>
            )}
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
