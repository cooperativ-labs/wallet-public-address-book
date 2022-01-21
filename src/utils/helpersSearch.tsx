import { ApplicationStoreProps, store } from '@context/store';
import { onlyUnique } from './helpersGeneral';
import { SEARCH_USERS } from './dGraphQueries/user';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { User } from 'types';

const SearchResults = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { searchText } = applicationStore;
  const [resultsList, setResultsList] = useState<User[] | undefined>(undefined);

  const { data: userResultData, error } = useQuery(SEARCH_USERS, {
    variables: { fullName: searchText, email: searchText, username: searchText },
  });
  const userResult = userResultData?.queryUser;
  const socialResult = userResultData?.queryLinkedAccount;

  const getUserFromSocial = (socialResultsList) => {
    return socialResultsList?.map((account, i) => {
      return account.user;
    });
  };
  console.log(userResultData, error);
  useEffect(() => {
    const userFromSocialResult = getUserFromSocial(socialResult);
    const finalResultsList = () => {
      if (userFromSocialResult && userFromSocialResult[0]) {
        return [...userFromSocialResult, ...userResult];
      }
      return userResult;
    };
    const unique = finalResultsList() && finalResultsList().filter(onlyUnique);
    setResultsList(unique);
  }, [socialResult, userResult]);

  const searchTextPresent = !!searchText;
  const hasResults = resultsList && resultsList.length > 0;
  const results = resultsList;

  // console.log(searchTextPresent, hasResults, results);

  return { searchTextPresent, hasResults, results };
};

export default SearchResults;
