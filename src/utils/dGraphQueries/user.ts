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
      social {
        linkedin
        github
        discord
        dribbble
        instagram
        facebook
        twitter
        medium
        substack
        youtube
        soundcloud
      }
      walletAddresses {
        name
        address
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
                  chainIds
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
            chainIds: $chainId
            type: WALLET
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
          chainIds
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

export const UPDATE_USER_SOCIAL_ACCOUNTS = gql`
  mutation (
    $userId: [ID!]
    $linkedin: String
    $github: String
    $discord: String
    $dribbble: String
    $instagram: String
    $facebook: String
    $twitter: String
    $medium: String
    $substack: String
    $youtube: String
    $soundcloud: String
  ) {
    updateUser(
      input: {
        filter: { id: $userId }
        set: {
          social: {
            linkedin: $linkedin
            github: $github
            discord: $discord
            dribbble: $dribbble
            instagram: $instagram
            facebook: $facebook
            twitter: $twitter
            medium: $medium
            substack: $substack
            youtube: $youtube
            soundcloud: $soundcloud
          }
        }
      }
    ) {
      user {
        id
        displayName
        social {
          linkedin
          github
          discord
          dribbble
          instagram
          facebook
          twitter
          medium
          substack
          youtube
          soundcloud
        }
      }
    }
  }
`;

export const UPDATE_USER_WALLETS = gql`
  mutation UpdateUserWallets($userId: [ID!], $name: String, $walletAddress: String!) {
    updateUser(
      input: {
        filter: { id: $userId }
        set: { walletAddresses: { name: $name, address: $walletAddress, protocol: ETH, type: WALLET } }
      }
    ) {
      user {
        id
        displayName
        walletAddresses {
          name
        }
      }
    }
  }
`;
