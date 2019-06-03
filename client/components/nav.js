import Link from 'next/link'

const Nav = ({ cartState }) => (
  <nav>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/how-it-works">
      <a>How it Works</a>
    </Link>
    <Link href="/marketplace">
      <a>Marketplace</a>
    </Link>
    <Link href="/custom-quote">
      <a>Free Quote</a>
    </Link>
    <Link href="/cart">
      <a>Cart({cartState.cartItems.length})</a>
    </Link>

    <style jsx>{`
      a {
        margin-right: 2em;
      }
    `}</style>
  </nav>
)

export default Nav