import Link from 'next/link'

export default function Footer () {
    return(
      <div>
      <div className="header">
          <p><Link href="/"><a>home</a></Link></p>
          <p><Link href="/about"><a>about</a></Link></p>
          <p><Link href="/cart"><a>Cart</a></Link></p>
      </div>
      <hr/>
      </div>
    )
}