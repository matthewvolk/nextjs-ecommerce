require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var express = require('express')
var router = express.Router()

router.post('/', (req, res) => {
  const chargeAmount = parseInt(req.body.amount)
  const customerToken = req.body.token
  const chargeDescription = req.body.description

  // console.log(`${chargeAmount}, ${typeof chargeAmount}`)
  // console.log(`${customerToken}, ${typeof customerToken}`)
  console.log(`${chargeDescription}`)

  stripe.charges.create({
    amount: chargeAmount,
    currency: "usd",
    source: customerToken, // obtained with Stripe.js
    description: chargeDescription
  }, function(err, charge) {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ success: charge });

      /**
       * @todo https://stripe.com/docs/api/errors/handling
       * @todo send email notification to Andrea and Matt
       * @todo send receipt to customer
       */

    }
  });
})

module.exports = router