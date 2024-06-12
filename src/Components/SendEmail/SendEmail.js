import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SendEmail() {

  const emails = useSelector(state => state.StoreEmail.sendEmail);

  return (
    <div>
      {emails.map((email, index) => (
        <div key={index}>
          <p>To: {email.to}</p>
          <p>Subject: {email.subject}</p>
          <p>Body: {email.body}</p>
        </div>
      ))}
    </div>
  );
}
