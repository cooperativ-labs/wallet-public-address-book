import { CryptoAddressType } from '/types';
import React, { FC } from 'react';
import { MatchSupportedChains } from '@src/web3/connectors';

interface WalletAddressListItemProps {
  wallet: CryptoAddressType;
}

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ wallet }) => {
  const { name, type, chainId, address } = wallet;

  const getChainLogo = (chainId) => {
    return (
      <div className="flex">
        only:{' '}
        {MatchSupportedChains(chainId).icon ? (
          <div>
            <img src={MatchSupportedChains(chainId).icon} className="ml-1 h-6" alt={name} />{' '}
          </div>
        ) : (
          MatchSupportedChains(chainId).name
        )}{' '}
      </div>
    );
  };
  return (
    <div className="p-3 border-2 rounded-lg">
      <div className="flex justify-between">
        {name} {type === CryptoAddressType.Contract ? getChainLogo(chainId) : <div> all EVM chains</div>}{' '}
      </div>
      <div className="w-72 md:w-auto">
        <div className="truncate md:ext-lg font-bold text-gray-600">{address} </div>
      </div>
    </div>
  );
};

export default WalletAddressListItem;
