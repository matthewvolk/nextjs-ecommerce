import React from 'react'
import NextHead from 'next/head'

const Head = ({ title, description }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || ''}</title>
    <meta name="description" content={description || ''} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="https://js.stripe.com/v3/"></script>

  </NextHead>
)

export default Head