import React, { FC } from 'react';
import { LinkedAccount } from 'types';
import { getSocialAccountOption } from '@src/utils/enumConverters';

type LinkedAccountListProps = {
  account: LinkedAccount;
};

const LinkedAccountListItem: FC<LinkedAccountListProps> = ({ account }) => {
  const { username, type, hidden, verified } = account;

  return (
    <div>
      {getSocialAccountOption(type)}: {username}
    </div>
  );
};

export default LinkedAccountListItem;
