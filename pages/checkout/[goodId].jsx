import { useRouter } from 'next/router';
import { Header, MyPaypalButton } from 'components';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { centToDollar } from 'utils';
import { IconButton, Button } from '@material-ui/core';
import Head from 'next/head';

const stripePromise = loadStripe(
  'pk_test_51IZipEIbg2Wdh6h2Czeqs7j35oIHGaPgFiWzjdR6mqdnX0Qwbx3PTPJEDYFXw6p8aM7lgRCSpnNRlhuKhzP6bepL00X7tqXf2a'
);

export default function GoodDetail(initialData) {
  const router = useRouter();
  const goodId = router.query.goodId;

  const handleClick = async (event) => {
    let stripe = await stripePromise;

    fetch('http://localhost:8000/stripe/create-checkout-session-single', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ id: goodId, quantity: 1 }),
    })
      .then((res) => {
        const session = res.json();
        console.log(session);
        return session;
      })
      .then((session) => {
        console.log(session);
        return stripe.redirectToCheckout({
          sessionId: session.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickPaypal = async (event) => {};

  const handleClickVisa = async () => {};

  const ProductDisplay = () => (
    <section style={{ width: '300px', height: '600px', margin: 'auto' }}>
      <div className='product'>
        <img
          src={initialData['item'].data.product_data.images[0]}
          alt={initialData['item'].name}
          className='image'
        />
        <div className='description'>
          <h3>{initialData['item'].name}</h3>
          <h5>${centToDollar(initialData['item'].data.unit_amount)}</h5>
        </div>
      </div>
      <Button
        type='button'
        id='checkout-button'
        role='link'
        onClick={handleClick}
      >
        <img className='btn-icon' src='/img/stripe-logo-blue.png' />
      </Button>

      <MyPaypalButton
        price={centToDollar(initialData['item'].data.unit_amount)}
      />
      {/* <script src='https://www.paypal.com/sdk/js?client-id=Abw-WJ2661GsHGr7-Kl7Ooc8t1U5kBvv3olF6jGE1O3Qtt3yPx0R5yYzcjHmgrRskjjh5MZLDwBvGKVO'></script> */}

      <Button
        type='button'
        id='checkout-button'
        role='link'
        onClick={handleClickVisa}
        disabled
      >
        <img className='btn-icon' src='/img/Visa.png' />
      </Button>
    </section>
  );

  return (
    <div>
      <Head>
        <title>Checkout Page for: {router.query.goodId}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='/styles.css' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='description'
          content={JSON.stringify(initialData.item)}
        ></meta>
      </Head>
      <Header />
      {true && <ProductDisplay />}
    </div>
  );
}

export async function getServerSideProps(context) {
  // get id from url
  const id = context.query.goodId;
  let item = await fetch(`http://localhost:8000/stripe/get-goods/${id}`);
  item = await item.json();
  return { props: { item: item } };
}
