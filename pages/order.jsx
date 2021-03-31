import {Header} from 'components';
import {useRouter} from 'next/router';
import React, {useState,useEffect} from 'react';
import Link from 'next/link'


export default function Order (initState){
  const router = useRouter();
  console.log(router.query);

  const successMessage = ()=>{
    return <div>
      <div>Thanks for you Order</div>
      <div>Please Review them in Email</div>
      <div className="cursor-pointer"></div><Link href='/'>Back to home</Link>
    </div>
  }
  const cancelMessage = ()=>{
    return <div>
      <div>Somethings goes wrong with Order</div>
      <a className="cursor-pointer" onClick={()=>{
        router.back()
      }}>click back</a>
    </div>
  }


  return (
  <div>
    <Header/>
    {'success' in router.query ? (successMessage()):(cancelMessage())}
  </div>)
}

// export async function getStaticProps() {

// }