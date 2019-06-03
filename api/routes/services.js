var express = require('express')
var router = express.Router()

const data = {
  services: [
    { id: 1, title: "New Logo", price: 230.00, slug: "new-logo-1" },
    { id: 2, title: "New Email", price: 250.00, slug: "new-email-2" },
    { id: 3, title: "New Landing Page", price: 500.45, slug: "new-landing-page-3" }
  ]
}

router.get('/', (req, res) => {
  res.json(data);
})

router.get('/:id', (req, res) => {
  const service = data.services.filter(service => service.slug == req.params.id)
  res.json(service[0])
})

module.exports = router