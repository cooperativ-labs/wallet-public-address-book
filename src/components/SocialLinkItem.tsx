import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { LinkedAccountType } from 'types';

type SocialLinkItemProps = {
  type: LinkedAccountType;
  username: string;
};

const SocialLinkItem: FC<SocialLinkItemProps> = ({ type, username }) => {
  if (username) {
    return (
      <div className="flex max-w-min py-1 pl-1 pr-2 m-1 bg-cLightBlue text-xs text-gray-100 items-center rounded-full">
        <FontAwesomeIcon
          icon={['fab', getSocialAccountOption(type).icon as IconName]}
          className="text-lg text-gray-100 mr-2"
        />
        {username}
      </div>
    );
  }
  return <></>;
};

export default SocialLinkItem;
