import { PayPalButton } from 'react-paypal-button-v2';
import { useRouter } from 'next/router';
import React from 'react';

const paypalKey =
  'Abw-WJ2661GsHGr7-Kl7Ooc8t1U5kBvv3olF6jGE1O3Qtt3yPx0R5yYzcjHmgrRskjjh5MZLDwBvGKVO';

export default function MyPaypalButton({ price }) {
  const router = useRouter();

  const purchasedItem = [
    {
      amount: {
        currency_code: 'USD',
        value: price,
      },
    },
  ];
  return (
    <div>
      <PayPalButton
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: purchasedItem,
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // OPTIONAL: Call your server to save the transaction
            console.log(data);
            return fetch(
              'http://localhost:8000/paypal/paypal-transaction-complete',
              {
                method: 'post',
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              }
            ).then((res) => {
              router.push(`/order/?success=true`);
            });
          });
        }}
        catchError={(err) => {
          console.log(err);
        }}
        options={{
          clientId: paypalKey,
          vault: true,
        }}
        style={{
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
        }}
      />
    </div>
  );
}
