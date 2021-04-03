import React from 'react';
import { Header, Goods } from 'components';
import Head from 'next/head';

// This page is for Payment UI
export default function Home() {
  return (
    <div>
      <Head>
        <title>Payment UI</title>
        <meta
          name='description'
          content='This is an UI of Stripe/paypal payment test'
        ></meta>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='/styles.css' />
      </Head>
      <Header />
      <Goods />
    </div>
  );
}
