import Link from 'next/link'

export default function LineItem({ product, removeFromCart }) {

  const { id, title, price } = product
  return (
    <li>
      <div>
          <Link as={`/service/${id}`} href={`/service?id=${id}`}>
            <a>{title}</a>
          </Link>
          &nbsp;
          <span>${price}</span>
          &nbsp;
          <button onClick={() => removeFromCart(id)}>remove</button>
      </div>
    </li>
  );
}