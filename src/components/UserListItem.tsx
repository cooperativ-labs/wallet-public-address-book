import React, { FC } from 'react';
import RoundedImage from './RoundedImage';
import SocialLinkItem from './SocialLinkItem';
import TwoColumnCard from './cards/TwoColumnCard';
import WalletAddressList from './WalletAddressList';
import { User } from 'types';

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
            <div className="flex flex-wrap mt-4">
              {linkedAccounts.map((account, i) => {
                return <SocialLinkItem type={account.type} username={account.username} key={i} />;
              })}
            </div>
          </div>
        </>
      }
      slot2={
        walletAddresses.length > 0 ? (
          <WalletAddressList walletAddresses={walletAddresses} />
        ) : (
          <div className="w-64">This user does not have any public wallet addresses</div>
        )
      }
      slot2Class="flex w-full"
    />
  );
};

export default UserListItem;
