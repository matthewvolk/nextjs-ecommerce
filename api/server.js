const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const bodyParser = require("body-parser");

const checkout = require('./routes/checkout')
const services = require('./routes/services')

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/checkout', checkout)
app.use('/api/v1/services', services)

app.get('/', (req, res) => res.json({
  "version": 1
}))

app.listen(port, () => console.log(`vendorlink API listening on port http://localhost:${port}!`))