import React from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <p>{error.name}</p>
      <p>{error.stack}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
