import React, { FC, useContext, useState } from 'react';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { LinkedAccount } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { REMOVE_USER_SOCIAL_ACCOUNT } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';

type LinkedAccountListProps = {
  account: LinkedAccount;
};

const LinkedAccountListItem: FC<LinkedAccountListProps> = ({ account }) => {
  const { userId } = useContext(UserContext);
  const { id, username, type, hidden, verified } = account;
  const [alerted, setAlerted] = useState<Boolean>(false);
  const [deleteSocial, { error }] = useMutation(REMOVE_USER_SOCIAL_ACCOUNT);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">{getSocialAccountOption(type).name}</div> <div className="col-span-1">{username}</div>
      <button
        onClick={() => {
          deleteSocial({ variables: { userId: userId, username: username, socialId: id } });
        }}
      >
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  );
};

export default LinkedAccountListItem;
