import Layout from '../components/layout'
import CheckoutForm from '../components/checkoutForm'
import { withRouter } from 'next/router'
import { Elements } from 'react-stripe-elements-universal'

const Service = withRouter(props => {

  function addToCart() {
    props.addToCart({ 
      title: props.service.title, 
      price: props.service.price, 
      id: props.serviceUrlSlug  
    })
  }

  return (
    <Layout 
      cartState={props.cartState}
    >
      <div>
        <h1>{props.service.title}</h1>
        <p><strong>Price:</strong> ${props.service.price}</p>
        <span><strong>Express Checkout:</strong></span>
        <Elements>
          <CheckoutForm 
            totalPrice={props.service.price} 
            namesOfPurchasedServices={new Array(props.service.title)}
          />
        </Elements>
        <p>or</p>
        <button onClick={addToCart}>Add to Cart</button>

        {/** 
        * @todo allow for vendors to modify the price, by users clicking a button:
        * <button onClick={addToCart}>Request a Custom Project</button>
        */}

      </div>
    </Layout>
  )
});

Service.getInitialProps = async function(context) {
  // id is the name of the query parameter
  let { id } = context.query;
  // console.log(id)
  
  const res = await fetch(`http://localhost:3001/api/v1/services/${id}`);
  const service = await res.json();

  return {
    service,
    serviceUrlSlug: id
  }
};

export default Service;