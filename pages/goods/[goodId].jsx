import { useRouter } from 'next/router';
import {Card, CardActions, Button} from '@material-ui/core';
import {Header} from 'components'; 


export default function GoodDetail(initialData) {
  const router = useRouter();
  const goodId = router.query.goodId;
  console.log(initialData);
  return (
    <div>
      <Header/>
      <div className="d-flex justify-content-center">
        <Card className="p-0 m-0" style={{width:'fit-content'}}>
          <div className="good-box  bg-black" style={{cursor:'default'}}>
            <img className="image" src="/img/HM_Black.png" alt="img"/>
            <div>{goodId}</div>
            <div>${initialData.price}</div>
          </div>
          <CardActions>
            <Button onClick={()=>{
              router.push(`/checkout/${goodId}`)
            }} variant="contained" color="primary">Stripe Checkout</Button>
            <Button variant="contained" color="secondary">Add to Cart</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get id from url
  const id = context.query.goodId;
  let item = await fetch(
    `http://localhost:8000/stripe/get-goods/${id}`);
  item = await item.json();
  return { props: { id:id,price:10,item:item } };
}
