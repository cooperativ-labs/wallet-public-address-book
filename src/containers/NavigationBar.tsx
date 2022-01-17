import Button from '@src/components/Buttons/Button';
import LogoutButton from '@src/components/buttons/LogoutButton';
import React, { FC, useContext } from 'react';
import UserMenu from './UserMenu';
import UserSearch from '@src/components/forms/UserSearch';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavBarProps = {
  transparent?: boolean;
  gaming?: boolean;
  noSearch?: boolean;
};

export const NavBar: FC<NavBarProps> = ({ noSearch }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);

  const { dispatch } = applicationStore;
  return (
    <div
      className="py-2 px-2 pr-4 mt-1 md:mt-4 z-30 flex mx-auto justify-between self-center items-center "
      style={{ maxWidth: '1580px' }}
    >
      <div className="ml-1 justify-start flex items-center">
        <div className="flex md:hidden">
          <Button
            onClick={() => {
              dispatch({ type: 'TOGGLE_MANAGER_SIDEBAR' });
            }}
          >
            <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
          </Button>
          <div className="m-2" />
        </div>
        {!noSearch && <UserSearch />}
      </div>

      <div className="flex justify-end">
        <span className="hidden md:flex items-center mr-3">
          <LogoutButton />
        </span>
        <UserMenu />
      </div>
    </div>
  );
};

export default NavBar;
