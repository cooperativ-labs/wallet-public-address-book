import Button from '@src/components/buttons/Button';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { CustomTokenService } from 'firebaseConfig/firebaseConfig';
import { FC, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const SignButton: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { library, account: walletAddress } = useWeb3React<Web3Provider>();
  const signer = library.getSigner();
  return (
    <Button
      disabled={loading}
      className={
        'p-3 border-2 border-gray-300 font-semibold rounded-full relative w-full hover:bg-cDarkBlue hover:text-gray-100'
      }
      onClick={async () => {
        setLoading(true);
        await CustomTokenService(signer, walletAddress);
        setLoading(false);
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <img src="/assets/images/loading-circle.jpeg" aria-label="loading" className="h-6 mr-1 animate-spin" />
          <span>Loading your account</span>
        </div>
      ) : (
        'Sign in with this wallet'
      )}
    </Button>
  );
};

export default SignButton;
