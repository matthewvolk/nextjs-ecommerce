import Layout from '../components/layout'
import LineItem from '../components/lineItem'
import CheckoutForm from '../components/checkoutForm'
import { Elements } from 'react-stripe-elements-universal'

export default ({ cartState, removeFromCart }) => (
  <Layout 
    cartState={cartState}
  >
    <h1>Cart</h1>

    <ul>
      {cartState.cartItems &&
        cartState.cartItems.map(item => (
          <LineItem
            key={item.id}
            product={item}
            removeFromCart={removeFromCart}
          />
        ))}
    </ul>

    <div>
      <Elements>
        {/** @todo the "totalPrice" calculation below is humungous — find a way to refactor it */}
        <CheckoutForm 
          totalPrice={(cartState.cartItems.reduce(function(accumulator, currentValue) { return accumulator + currentValue.price; }, 0)).toFixed(2)} 
          namesOfPurchasedServices={cartState.cartItems.map(product => product.title)}
        />
      </Elements>
    </div>
  </Layout>
);