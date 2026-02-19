'use client';
import { Amplify } from 'aws-amplify';
import { type ReactNode } from 'react';

// Module-level call — runs once in the browser, never on the server
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      loginWith: { email: true },
    },
  },
});

export default function AmplifyProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
