import gql from 'graphql-tag';

export const CHECK_WALLET_EXIST = () => {
  return gql`
    query ($address: String!) {
      getCryptoAddress(address: $address) {
        address
      }
    }
  `;
};

export const GET_CRYPTO_ADDRESS = gql`
  query GetCryptoAddress($walletAddress: String!) {
    getCryptoAddress(address: $walletAddress) {
      id
      user {
        id
      }
    }
  }
`;

export const UPDATE_CRYPTO_ADDRESS = gql`
  mutation UpdateCryptoAddress($id: [ID!], $name: String, $public: Boolean) {
    updateCryptoAddress(input: { filter: { id: $id }, set: { name: $name, public: $public } }) {
      cryptoAddress {
        id
        name
        address
        public
        description
        user {
          id
        }
      }
    }
  }
`;
