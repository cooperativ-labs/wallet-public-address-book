import { ApplicationStoreProps, store } from '@context/store';
import { onlyUnique } from './helpersGeneral';
import { SEARCH_USERS } from './dGraphQueries/user';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { User } from 'types';

const SearchResults = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { searchText } = applicationStore;
  const [results, setResults] = useState<User[] | undefined>(undefined);

  const { data: userResultData } = useQuery(SEARCH_USERS, {
    variables: { fullName: searchText, email: searchText, username: searchText },
  });
  const userResult = userResultData?.queryUser;
  const socialResult = userResultData?.queryLinkedAccount;

  const getUserFromSocial = (socialResults) => {
    return socialResults?.map((account, i) => {
      return account.user;
    });
  };

  useEffect(() => {
    const userFromSocialResult = getUserFromSocial(socialResult);
    const finalResults = () => {
      if (userFromSocialResult && userFromSocialResult[0]) {
        return [...userFromSocialResult, ...userResult];
      }
      return userResult;
    };
    const unique = finalResults() && finalResults().filter(onlyUnique);
    setResults(unique);
  }, [socialResult, userResult]);

  return results;
};

export default SearchResults;
