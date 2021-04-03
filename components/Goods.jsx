import { Button } from '@material-ui/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { centToDollar, request } from 'utils';

export default function Goods(initialState) {
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(initialState);
    request
      .get('/stripe/get-goods')
      .then((res) => {
        console.log(res);
        if ('itemList' in res) setGoods(res.itemList);
        else throw new Error('no itemList in response from backend');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  return (
    <div className='goods-wrapper'>
      {goods ? (
        goods.map((good, idx) => {
          return (
            <Link href={'/checkout/' + good.name} key={idx}>
              <Button>
                <div className='good-box shadow bg-white rounded'>
                  <img
                    className='image'
                    src={good.data.product_data.images[0]}
                    alt='img'
                  />
                  <div>{good.name}</div>
                  <div>${centToDollar(good.data.unit_amount)}</div>
                </div>
              </Button>
            </Link>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
