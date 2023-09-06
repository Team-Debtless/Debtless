// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

const Link = (props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch('/plaid/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ... should contain access_token... possibly
  }, []);
  const config = {
    token: props.linkToken || null,
    receivedRedirectUri: window.location.href,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};
export default Link;