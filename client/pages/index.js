import Link from 'next/link'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch';

const Index = props => ( 
  <Layout 
    cartState={props.cartState}
  >
    <main>
      <h1>The marketplace for web design and development</h1>
      <p>Low commitment, ad-hoc jobs assigned to expert designers, developers, and marketers with payment held in escrow until work is delivered.</p>
      <p><Link href="/custom-quote"><a>Get a Free Estimate</a></Link> or <Link href="/marketplace"><a>Browse the Marketplace</a></Link></p>
      <ul>
        {props.services.map(service => (
          <li key={service.slug}>
          <Link as={`/service/${service.slug}`} href={`/service?id=${service.slug}`}>
            <a>{service.title}</a>
          </Link>
        </li>
        ))}
      </ul>
    </main>

    <style jsx>{`
    
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/api/v1/services');
  const data = await res.json();
  
  return {
    services: data.services
  };
};

export default Index