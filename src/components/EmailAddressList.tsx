import EmailAddressListItem from './EmailAddressListItem';
import React, { FC } from 'react';
import { EmailAddress } from 'types';

type EmailAddressListProps = {
  emailAddresses: EmailAddress[];
  withEdit?: boolean;
};

const EmailAddressList: FC<EmailAddressListProps> = ({ emailAddresses, withEdit }) => {
  return (
    <div className="w-full">
      {emailAddresses.map((email, i) => {
        return (
          <div className="mb-3" key={i}>
            <EmailAddressListItem email={email} withEdit={withEdit} />
          </div>
        );
      })}
      {emailAddresses.length > 0 && <hr className="mt-6 mb-8 md:mb-4" />}
    </div>
  );
};

export default EmailAddressList;
