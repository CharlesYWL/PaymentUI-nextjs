import { useRouter } from 'next/router';
import {Header} from 'components'; 
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import {centToDollar} from 'utils';

const stripePromise = loadStripe("pk_test_51IZipEIbg2Wdh6h2Czeqs7j35oIHGaPgFiWzjdR6mqdnX0Qwbx3PTPJEDYFXw6p8aM7lgRCSpnNRlhuKhzP6bepL00X7tqXf2a");


export default function GoodDetail(initialData) {
  const router = useRouter();
  const goodId = router.query.goodId;

  // useEffect(() => {
  //   console.log(goodId)
  // fetch(
  //   `http://localhost:8000/stripe/get-goods/${goodId}`).then(res=>{
  //     return res.json()
  //   }).then(res=>{
  //     console.log(res)
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  //   return () => {
  //   }
  // }, [])


  const ProductDisplay = ({ handleClick }) => (
    <section style={{width:'300px',height:'600px', margin:'auto'}}>
      <div className="product">
        <img
          src={initialData['item'].data.product_data.images[0]}
          alt={initialData['item'].name}
          className="image"
        />
        <div className="description">
          <h3>{initialData['item'].name}</h3>
          <h5>${centToDollar(initialData['item'].data.unit_amount)}</h5>
        </div>
      </div>
      <button type="button" id="checkout-button" role="link" onClick={handleClick}>
        Checkout
      </button>
    </section>
  );
  
  const handleClick = async (event) => {
    let stripe = await stripePromise;
    
    fetch("http://localhost:8000/stripe/create-checkout-session-single", {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body:JSON.stringify({id:goodId,quantity:1})
      })
    .then((res)=>{
        const session = res.json();
        console.log(session);
        return session;
      }).then((session)=>{
        console.log(session);
        return stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }).catch(err=>{
        console.log(err);
      })

  };

  return (
    <div>
      <Header/>
      {true && <ProductDisplay handleClick={handleClick}/>}
    </div>
  );
}

export async function getServerSideProps(context) {
  // get id from url
  const id = context.query.goodId;
  let item = await fetch(
    `http://localhost:8000/stripe/get-goods/${id}`);
  item = await item.json();
  return { props: { item:item } };
}
