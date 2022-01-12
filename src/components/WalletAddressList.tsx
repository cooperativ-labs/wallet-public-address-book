import { CryptoAddress } from '/types';
import React, { FC } from 'react';
import WalletAddressListItem from './WalletAddressListItem';

type WalletAddressListProps = {
  walletAddresses: CryptoAddress[];
};

const WalletAddressList: FC<WalletAddressListProps> = ({ walletAddresses }) => {
  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
      {walletAddresses.map((wallet, i) => {
        return (
          <div className="mb-3" key={i}>
            <WalletAddressListItem wallet={wallet} />
          </div>
        );
      })}
    </>
  );
};

export default WalletAddressList;
