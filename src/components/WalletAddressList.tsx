import React, { FC } from 'react';
import WalletAddressListItem from './WalletAddressListItem';
import { CryptoAddress } from 'types';

type WalletAddressListProps = {
  walletAddresses: CryptoAddress[];
};

const WalletAddressList: FC<WalletAddressListProps> = ({ walletAddresses }) => {
  return (
    <div className="w-full">
      {walletAddresses.map((wallet, i) => {
        return (
          <div className="mb-3" key={i}>
            <WalletAddressListItem wallet={wallet} />
          </div>
        );
      })}
    </div>
  );
};

export default WalletAddressList;
