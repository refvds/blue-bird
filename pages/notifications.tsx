import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Header from '@/components/Header';
import { redirect } from 'next/dist/server/api-utils';
import NotificationFeed from '@/components/NotificationFeed';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />;
      <NotificationFeed />
    </>
  );
};

export default Notifications;
