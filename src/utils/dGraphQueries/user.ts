import gql from 'graphql-tag';

export const GET_USERS = () => {
  return gql`
    query {
      queryUser {
        id
        fullName
        email
      }
    }
  `;
};

export const CHECK_USER_EXIST = () => {
  return gql`
    query ($email: String!) {
      getUser(email: $email) {
        email
      }
    }
  `;
};

export const SEARCH_USERS = gql`
  query QueryUsers($email: String, $fullName: String) {
    queryUser(filter: { email: { eq: $email }, or: { fullName: { anyofterms: $fullName } } }) {
      id
      fullName
      email
      profileImage
      biography
      expertise
      interests
      walletAddresses {
        address
        name
        type
        chainId
      }
      linkedAccounts {
        id
        username
        type
        verified
        hidden
        user {
          id
        }
      }
    }
  }
`;

export const GET_USER_FROM_SOCIAL = gql`
  query QueryUserLinkedAccount($username: String!) {
    queryLinkedAccount(filter: { username: { anyofterms: $username } }) {
      id
      user {
        fullName
        email
        profileImage
        biography
        expertise
        interests
        walletAddresses {
          address
          name
          type
          chainId
        }
        linkedAccounts {
          id
          username
          type
          verified
          hidden
          user {
            id
          }
        }
      }
    }
  }
`;

export const GET_USER_FROM_EMAIL = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      email
      displayName
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      id
      email
      displayName
      fullName
      profileImage
      biography
      expertise
      interests
      linkedAccounts {
        id
        username
        type
        verified
        hidden
        user {
          id
        }
      }
      walletAddresses {
        name
        address
        type
        chainId
      }
      organizations {
        organization {
          id
          displayName
          fullLegalName
          country
          address
          jurisdiction
          users {
            permission
          }
        }
      }
      projects {
        id
        roles
        title
        agreements {
          date
          agreement {
            title
          }
          payments {
            id
            amount
            date
            note
            currency {
              code
              contributorCreditClass {
                name
                backingCurrency
                currentFunding
                cryptoAddress {
                  address
                  chainId
                }
              }
            }
          }
        }
        user {
          id
        }
        project {
          id
          slug
          name
          lastUpdate
          needs {
            name
            value
            fill
          }
          info {
            logo
            shortDescription
            brandColor
          }
        }
      }
    }
  }
`;

export const ADD_USER_WITH_WALLET = gql`
  mutation AddUser(
    $currentDate: DateTime!
    $email: String!
    $fullName: String!
    $walletAddress: String!
    $walletName: String!
    $chainId: Int!
    $protocol: CryptoAddressProtocol
    $type: CryptoAddressType
  ) {
    addUser(
      input: [
        {
          creationDate: $currentDate
          email: $email
          fullName: $fullName
          walletAddresses: {
            name: $walletName
            address: $walletAddress
            protocol: $protocol
            chainId: $chainId
            type: $type
          }
          organizations: { organization: { fullLegalName: $fullName, type: "Individual" } }
        }
      ]
    ) {
      user {
        id
        fullName
        email
        profileImage
        walletAddresses {
          name
          address
          protocol
          chainId
          type
        }
      }
    }
  }
`;

export const UPDATE_USER_INFORMATION = gql`
  mutation UpdateUser(
    $userId: [ID!]
    $fullName: String!
    $displayName: String
    $profileImage: String
    $biography: String
    $expertiseAdd: [String]
    $expertiseRemove: [String]
    $interestsAdd: [String]
    $interestsRemove: [String]
  ) {
    updateUser(
      input: {
        filter: { id: $userId }
        remove: { interests: $interestsRemove, expertise: $expertiseRemove }
        set: {
          displayName: $displayName
          fullName: $fullName
          profileImage: $profileImage
          biography: $biography
          interests: $interestsAdd
          expertise: $expertiseAdd
        }
      }
    ) {
      user {
        id
        email
        fullName
        displayName
        biography
        expertise
        interests
      }
    }
  }
`;

export const ADD_USER_SOCIAL_ACCOUNTS = gql`
  mutation ($userId: [ID!], $username: String!, $type: LinkedAccountType!) {
    updateUser(input: { filter: { id: $userId }, set: { linkedAccounts: { username: $username, type: $type } } }) {
      user {
        id
        displayName
        fullName
        linkedAccounts {
          id
          username
          type
          verified
          hidden
          user {
            id
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_WALLETS = gql`
  mutation UpdateUserWallets(
    $userId: [ID!]
    $name: String
    $walletAddress: String!
    $protocol: CryptoAddressProtocol!
    $type: CryptoAddressType!
    $chainId: Int
  ) {
    updateUser(
      input: {
        filter: { id: $userId }
        set: {
          walletAddresses: { name: $name, address: $walletAddress, protocol: $protocol, type: $type, chainId: $chainId }
        }
      }
    ) {
      user {
        id
        displayName
        walletAddresses {
          name
          type
          address
          chainId
        }
      }
    }
  }
`;
