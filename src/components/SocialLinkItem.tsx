import React, { FC } from 'react';

type SocialLinkItemProps = {
  socialNetwork: string;
  username: string;
};

const getSocialNetwork = (socialNetwork, username) => {
  switch (socialNetwork) {
    case 'linkedin':
      return { link: `https://linkedin.com/in/${username}`, icon: '' };
    case 'github':
      return { link: `https://github.com/${username}`, icon: '' };
    case 'dribble':
      return { link: `https://dribbble.com/${username}`, icon: '' };
    case 'discord':
      return { link: `https://discordapp.com/users/${username}`, icon: '' };
    case 'youtube':
      return { link: `https://youtube.com/channel/2jdkHFKS2838Fwdd923`, icon: '' };
    case 'soundcloud':
      return { link: `https://soundcloud.com/${username}`, icon: '' };
    case 'twitter':
      return { link: `https://twitter.com/${username}`, icon: '' };
    case 'facebook':
      return { link: `https://facebook.com/${username}`, icon: '' };
    case 'instagram':
      return { link: `https://www.instagram.com/${username}`, icon: '' };
    case 'medium':
      return { link: `https://www.medium.com/${username}`, icon: '' };
    case 'substack':
      return { link: `https://${username}.substack.com`, icon: '' };
    default:
      return { link: ``, icon: '' };
  }
};

const SocialLinkItem: FC<SocialLinkItemProps> = ({ socialNetwork, username }) => {
  console.log(username);
  if (username) {
    return (
      <div className="flex max-w-min p-1 px-2 m-1 bg-blue-700 text-xs text-gray-100 rounded-full">
        <a href={getSocialNetwork(socialNetwork, username).link} target="_blank" rel="noreferrer">
          {username}
        </a>
      </div>
    );
  }
  return <></>;
};

export default SocialLinkItem;
