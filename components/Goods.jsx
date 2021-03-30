import { Button } from 'bootstrap';
import Link from 'next/link';
import logo from 'public/img/HM_Black.png';


const goods = [
  {id:"sampleTest0",price:5},{id:"sampleTest1",price:10},{id:"sampleTest2",price:15}
]

export default function Goods () {
    return(
        <div className="goods-wrapper">
          {goods.map((good,idx)=>{

            return <Link href={"/goods/"+good.id} key={"good"-good.id}>
            <div className="good-box">
              
              <img src={logo} alt="img"/>
              <div>{good.id}</div>
              <div>${good.price}</div>
              
            </div>
            </Link>
          })}
        </div>
    )
}

// export async function getServerSideProps(context) {

//   return { props: { goods:Goods  } };
// }