import Layout from '../components/layout'
import Link from 'next/link'

const Marketplace = props => (
  <Layout 
    cartState={props.cartState}
  >
    <div>
      <h1>All Services:</h1>
    </div>

    <ul>
      {props.services.map(service => (
        <li key={service.slug}>
        <Link as={`/service/${service.slug}`} href={`/service?id=${service.slug}`}>
          <a>{service.title}</a>
        </Link>
      </li>
      ))}
    </ul>
  </Layout>
);

Marketplace.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/api/v1/services');
  const data = await res.json();
  
  return {
    services: data.services
  };
};

export default Marketplace