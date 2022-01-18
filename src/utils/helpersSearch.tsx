import { useQuery } from '@apollo/client';
import { ApplicationStoreProps, store } from '@context/store';
import { useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { GET_USER_FROM_SOCIAL, SEARCH_USERS } from './dGraphQueries/user';
import { onlyUnique } from './helpersGeneral';

const SearchResults = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { searchText } = applicationStore;
  const [results, setResults] = useState<User[] | undefined>(undefined);

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

  const getUserFromSocial = (socialResults) => {
    return socialResults?.map((account, i) => {
      return account.user;
    });
  };
  useEffect(() => {
    const socialResultPresent = getUserFromSocial(socialResult);
    const finalResults = () => {
      if (socialResultPresent && socialResultPresent[0]) {
        return [...socialResultPresent, ...userResult];
      }
      return userResult;
    };
    const unique = finalResults() && finalResults().filter(onlyUnique);
    setResults(unique);
  }, [socialResult, userResult]);

  return results;
};

export default SearchResults;
