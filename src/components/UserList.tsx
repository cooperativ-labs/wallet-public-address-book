import { User } from 'types';
import React, { FC } from 'react';
import UserListItem from './UserListItem';

type UserListProps = {
  users: User[];
};

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.map((user, i) => {
        return (
          <div className="mb-3" key={i}>
            <UserListItem user={user} />
          </div>
        );
      })}
    </>
  );
};

export default UserList;
