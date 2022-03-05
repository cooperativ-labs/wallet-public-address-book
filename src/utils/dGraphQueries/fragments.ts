import gql from 'graphql-tag';

export const CORE_PAYMENT_FIELDS = gql`
  fragment paymentData on Payment {
    id
    amount
    note
    currency {
      code
      contributorCreditClass {
        id
        name
        currentFunding
        backingCurrency
        type
        cryptoAddress {
          id
          address
          protocol
          chainId
        }
      }
    }
    date
  }
`;

export const CORE_USER_FIELDS = gql`
  fragment userData on User {
    id
    fullName
    profileImage
    biography
    expertise
    interests
    emailAddresses {
      address
      name
      description
      public
      user {
        id
      }
    }
    walletAddresses {
      id
      address
      name
      chainId
      description
      public
    }
  }
`;

export const CORE_USER_SEARCH_FIELDS = gql`
  fragment userSearchData on User {
    id
    fullName
    emailAddresses(filter: { public: true }) {
      address
      name
      description
      public
      user {
        id
      }
    }
    profileImage
    public
    biography
    expertise
    interests
    walletAddresses(filter: { public: true }) {
      address
      name
      type
      chainId
      description
      public
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
`;
