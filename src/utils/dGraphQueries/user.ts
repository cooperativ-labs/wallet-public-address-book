import gql from 'graphql-tag';
import { CORE_USER_SEARCH_FIELDS } from './fragments';

export const GET_USERS = () => {
  return gql`
    query {
      queryUser {
        id
        fullName
        emailAddresses {
          address
        }
      }
    }
  `;
};

export const CHECK_EMAIL_TAKEN = () => {
  return gql`
    query ($address: String!) {
      getEmailAddress(address: $address) {
        address
      }
    }
  `;
};

export const GET_USER_FROM_EMAIL = gql`
  query GetUserFromEmail($emailAddress: String!) {
    getEmailAddress(address: $address) {
      address
      user {
        id
        displayName
        fullName
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  ${CORE_USER_SEARCH_FIELDS}
  query QueryUsers($email: String, $fullName: String, $username: String!) {
    queryUser(filter: { email: { eq: $email }, or: { fullName: { anyofterms: $fullName }, and: { public: true } } }) {
      ...userSearchData
    }
    queryLinkedAccount(filter: { username: { anyofterms: $username } }) {
      id
      user(filter: { public: true }) {
        ...userSearchData
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      id
      emailAddresses {
        address
        name
        description
        public
        user {
          id
        }
      }
      displayName
      fullName
      profileImage
      public
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
        id
        name
        address
        type
        chainId
        description
        public
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
          emailAddresses: { address: $email, public: false }
          fullName: $fullName
          public: true
          walletAddresses: {
            name: $walletName
            address: $walletAddress
            protocol: $protocol
            chainId: $chainId
            type: $type
            public: true
          }
          organizations: { organization: { fullLegalName: $fullName, type: "Individual" } }
        }
      ]
    ) {
      user {
        id
        fullName
        emailAddresses {
          address
        }
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
    $public: Boolean
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
          public: $public
          biography: $biography
          interests: $interestsAdd
          expertise: $expertiseAdd
        }
      }
    ) {
      user {
        id
        emailAddresses {
          address
          name
          description
        }
        fullName
        displayName
        public
        biography
        expertise
        interests
      }
    }
  }
`;

// USER EMAIL

export const ADD_USER_EMAIL = gql`
  mutation AddUserEmail($userId: ID!, $address: String!, $name: String, $description: String, $public: Boolean) {
    addEmailAddress(
      input: { address: $address, user: { id: $userId }, name: $name, description: $description, public: $public }
    ) {
      emailAddress {
        address
        user {
          id
          emailAddresses {
            address
          }
        }
      }
    }
  }
`;

export const REMOVE_USER_EMAIL = gql`
  mutation RemoveUserEmail($userId: [ID!], $emailAddress: String!) {
    updateUser(input: { filter: { id: $userId }, remove: { emailAddresses: { address: $emailAddress } } }) {
      numUids
      user {
        id
        emailAddresses {
          address
        }
      }
    }
    deleteEmailAddress(filter: { address: { eq: $emailAddress } }) {
      msg
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateUserEmail($address: String!, $name: String, $description: String, $public: Boolean) {
    updateEmailAddress(
      input: { filter: { address: { eq: $address } }, set: { name: $name, description: $description, public: $public } }
    ) {
      emailAddress {
        address
        public
        name
        description
        user {
          id
          walletAddresses {
            address
          }
        }
      }
    }
  }
`;

//USER SOCIAL

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

export const REMOVE_USER_SOCIAL_ACCOUNT = gql`
  mutation RemoveUserSocialAccount($userId: [ID!], $socialId: ID!) {
    updateUser(input: { filter: { id: $userId }, remove: { linkedAccounts: { id: $socialId } } }) {
      numUids
      user {
        id
        linkedAccounts {
          id
        }
      }
    }
    deleteLinkedAccount(filter: { id: [$socialId] }) {
      msg
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
          walletAddresses: {
            name: $name
            address: $walletAddress
            protocol: $protocol
            type: $type
            chainId: $chainId
            public: true
          }
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
