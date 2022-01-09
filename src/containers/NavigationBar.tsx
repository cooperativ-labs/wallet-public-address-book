import Button from '@src/components/Buttons/Button';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import UserMenu from './UserMenu';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from '@src/components/buttons/LogoutButton';

interface NavBarProps {
  transparent?: boolean;
  gaming?: boolean;
}

export const NavBar: FC<NavBarProps> = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);

  const { dispatch } = applicationStore;
  const windowSize = useWindowSize();
  return (
    <div
      className="py-2 px-2 pr-4 pt-1 md:pt-14 h-14 z-30 flex mx-auto justify-between self-center items-center "
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

        <Link href="/app">
          <img
            src={
              windowSize.width < 768
                ? '/assets/images/branding/stamp_dark_blue.svg'
                : '/assets/images/branding/stamp_dark_blue.svg'
            }
            alt="logo"
            width={windowSize.width < 768 ? '30' : '50'}
          />
        </Link>
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
