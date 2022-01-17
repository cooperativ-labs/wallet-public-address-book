import LinkedAccountListItem from './LinkedAccountListItem';
import React, { FC } from 'react';
import { LinkedAccount } from 'types';

type LinkedAccountsListProps = {
  linkedAccounts: LinkedAccount[];
};

const LinkedAccountsList: FC<LinkedAccountsListProps> = ({ linkedAccounts }) => {
  return (
    <div className="w-full">
      {linkedAccounts.map((account, i) => {
        return (
          <div className="mb-3" key={i}>
            <LinkedAccountListItem account={account} />
          </div>
        );
      })}
    </div>
  );
};

export default LinkedAccountsList;
