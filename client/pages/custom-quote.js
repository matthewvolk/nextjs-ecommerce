import Layout from '../components/layout'

export default props => (
  <Layout 
    cartState={props.cartState}
  >
    <div>
      <h1>Custom Quote</h1>
    </div>
  </Layout>
);