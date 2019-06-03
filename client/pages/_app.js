import React from 'react';
import App, { Container } from 'next/app';
import { StripeProvider } from "react-stripe-elements-universal";

class VendorLink extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    cartItems: []
  };

  componentDidMount() {
    const cart = this.loadFromLocalStorage("vl:cart");
    if (cart) {
      const { services: cartItems } = cart;
      this.setState({ cartItems });
    }
  }

  addToCart = details => {
    const { id } = details;
    this.setState(
      ({ cartItems }) => {
        if (cartItems.find(item => item["id"] == id)) {
          console.log("Cannot add duplicate item to cart")
          return;
        } else {
          return {
            cartItems: [...cartItems, { ...details }]
          };
        }
      },
      () => this.saveCart()
    );
  };

  removeFromCart = id => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter(item => item["id"] != id);
    this.setState({ cartItems: updatedCartItems }, () => this.saveCart());
  };

  saveCart = details => {
    this.saveToLocalStorage("vl:cart", {
      services: [...this.state.cartItems]
    });
  };

  updateLocalStorage = () => {
    /**
     * @todo add method that refreshes cart prices every 24 hours in case a price has changed and is cached in localStorage
     */
  }

  loadFromLocalStorage = key => {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  saveToLocalStorage = (key, data) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <StripeProvider apiKey="pk_test_TQb9cUvlHIRLrcxaUcNCItyL001rCgG9kd">
          <Component 
            cartState={this.state}
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
            {...pageProps} 
          />
        </StripeProvider>
      </Container>
    );
  }
}

export default VendorLink;