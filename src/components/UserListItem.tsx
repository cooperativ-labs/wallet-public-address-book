import React, { FC } from 'react';
import { User } from 'types';
import WalletAddressList from './WalletAddressList';
import RoundedImage from './RoundedImage';
import TwoColumnCard from './cards/TwoColumnCard';
import SocialLinkItem from './SocialLinkItem';

type UserListItemProps = {
  user: User;
};

const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const { email, fullName, walletAddresses, profileImage, linkedAccounts } = user;

  return (
    <TwoColumnCard
      slot1={
        <>
          <RoundedImage
            src={profileImage ? profileImage : '/assets/images/user-images/placeholder.png'}
            className="bg-gray-300 h-20 w-20 md:h-12 md:w-12 lg:w-16 lg:h-16"
            aria-label="Profile Thumbnail"
          />
          <div className="flex flex-col w-full justify-center md:mx-0 md:w-56">
            <h1 className="font-bold text-lg mt-2">{fullName}</h1>
          </div>
          <div className="text-md text-gray-500 ">
            <div>{email}</div>
            <div className="flex mt-4">
              {linkedAccounts.map((account) => {
                return <SocialLinkItem type={account.type} username={account.username} />;
              })}
            </div>
          </div>
        </>
      }
      slot2={<WalletAddressList walletAddresses={walletAddresses} />}
      slot2Class="flex w-full"
    />
  );
};

export default UserListItem;
