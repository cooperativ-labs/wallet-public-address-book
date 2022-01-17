import React, { FC } from 'react';
import { LinkedAccountsType } from 'types';

type SocialLinkItemProps = {
  type: LinkedAccountsType;
  username: string;
};

const getSocialNetwork = (type, username) => {
  switch (type) {
    case LinkedAccountsType.Linkedin:
      return { link: `https://linkedin.com/in/${username}`, icon: '' };
    case LinkedAccountsType.Github:
      return { link: `https://github.com/${username}`, icon: '' };
    case LinkedAccountsType.Dribbble:
      return { link: `https://dribbble.com/${username}`, icon: '' };
    case LinkedAccountsType.Discord:
      return { link: ``, icon: '' };
    case LinkedAccountsType.Youtube:
      return { link: `https://youtube.com/channel/2jdkHFKS2838Fwdd923`, icon: '' };
    case LinkedAccountsType.Soundcloud:
      return { link: `https://soundcloud.com/${username}`, icon: '' };
    case LinkedAccountsType.Twitter:
      return { link: `https://twitter.com/${username}`, icon: '' };
    case LinkedAccountsType.Facebook:
      return { link: `https://facebook.com/${username}`, icon: '' };
    case LinkedAccountsType.Instagram:
      return { link: `https://www.instagram.com/${username}`, icon: '' };
    case LinkedAccountsType.Medium:
      return { link: `https://www.medium.com/${username}`, icon: '' };
    case LinkedAccountsType.Substack:
      return { link: `https://${username}.substack.com`, icon: '' };
    case LinkedAccountsType.Mirror:
      return { link: ``, icon: '' };
    case LinkedAccountsType.Telegram:
      return { link: ``, icon: '' };
    case LinkedAccountsType.Other:
      return { link: ``, icon: '' };
    default:
      return { link: ``, icon: '' };
  }
};

const SocialLinkItem: FC<SocialLinkItemProps> = ({ type, username }) => {
  if (username) {
    return (
      <div className="flex max-w-min p-1 px-2 m-1 bg-blue-700 text-xs text-gray-100 rounded-full">
        <a href={getSocialNetwork(type, username).link} target="_blank" rel="noreferrer">
          {username}
        </a>
      </div>
    );
  }
  return <></>;
};

export default SocialLinkItem;
