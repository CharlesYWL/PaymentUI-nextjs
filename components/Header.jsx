import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className='header mt-3 p-1'>
        <p>
          <Link href='/'>
            <a>home</a>
          </Link>
        </p>
        <p>
          <Link href='/about'>
            <a>about</a>
          </Link>
        </p>
        <p>
          <Link href='/cart'>
            <a>Cart</a>
          </Link>
        </p>
      </div>
      <hr />
    </div>
  );
}
