import React, { FC } from 'react';
import { LinkedAccountType } from 'types';

type SocialLinkItemProps = {
  type: LinkedAccountType;
  username: string;
};

const getSocialNetwork = (type, username) => {
  switch (type) {
    case LinkedAccountType.Linkedin:
      return { link: `https://linkedin.com/in/${username}`, icon: '' };
    case LinkedAccountType.Github:
      return { link: `https://github.com/${username}`, icon: '' };
    case LinkedAccountType.Dribbble:
      return { link: `https://dribbble.com/${username}`, icon: '' };
    case LinkedAccountType.Discord:
      return { link: ``, icon: '' };
    case LinkedAccountType.Youtube:
      return { link: `https://youtube.com/channel/2jdkHFKS2838Fwdd923`, icon: '' };
    case LinkedAccountType.Soundcloud:
      return { link: `https://soundcloud.com/${username}`, icon: '' };
    case LinkedAccountType.Twitter:
      return { link: `https://twitter.com/${username}`, icon: '' };
    case LinkedAccountType.Facebook:
      return { link: `https://facebook.com/${username}`, icon: '' };
    case LinkedAccountType.Instagram:
      return { link: `https://www.instagram.com/${username}`, icon: '' };
    case LinkedAccountType.Medium:
      return { link: `https://www.medium.com/${username}`, icon: '' };
    case LinkedAccountType.Substack:
      return { link: `https://${username}.substack.com`, icon: '' };
    case LinkedAccountType.Mirror:
      return { link: ``, icon: '' };
    case LinkedAccountType.Telegram:
      return { link: ``, icon: '' };
    case LinkedAccountType.Other:
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
