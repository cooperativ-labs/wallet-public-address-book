import { Project } from 'types';
import { CHECK_WALLET_EXIST } from './crypto';
import { GET_ID_FROM_SLUG } from './project';

export const makeSubmissionList = (list) => {
  if (typeof list === 'string') {
    return list.split(',').map((item) => {
      return `${formatTag(item.toLowerCase())}`;
    });
  }
  return list;
};

export const makeRemovalList = (oldList, newList) => {
  return oldList.filter((oldItem) => {
    return !newList.includes(oldItem);
  });
};

const date = new Date();
export const currentDate = rfc3339(date);

export function rfc3339(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds())
  );
}

export function timezoneOffset(offset) {
  var sign;
  if (offset === 0) {
    return 'Z';
  }

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  sign = offset > 0 ? '-' : '+';
  offset = Math.abs(offset);
  return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60);
}

export function formatTag(text: string) {
  return text.replace(/[^\w-]+/g, ' ');
}

export function formatSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/ /g, '')
    .replace(/[^\w-]+/g, '');
}

export function checkUserAdded(project: Project, userId: string) {
  return !!project.projectUsers.find((user) => user.user.id === userId);
}

// export async function checkEmailTaken(emailAddress: string) {
//   try {
//     const result = await apolloClient.query({
//       variables: {
//         address: emailAddress.toLowerCase(),
//       },
//       query: CHECK_EMAIL_TAKEN(),
//     });
//     return result.data.getUser ? true : false;
//   } catch (err) {
//     console.log('checkemail', err);
//   }
// }

// export async function checkWalletTaken(walletAddress: string) {
//   try {
//     const result = await apolloClient.query({
//       variables: {
//         address: walletAddress,
//       },
//       query: CHECK_WALLET_EXIST(),
//     });
//     return result.data.getCryptoAddress ? true : false;
//   } catch (err) {}
// }
