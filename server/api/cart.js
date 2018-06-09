const router = require('express').Router()
const {Product, Order, LineItem} = require('../db/models')

// api/cart
router.get('/', (req, res, next) => {
  try {
    const cart = req.session.cart
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/submit', async (req, res, next) => {
  console.log("REQ BODY ==========>", req.body)
  try {
      const order = await Order.create()
      const product =  order.addProduct(req.body.productId)
      const item = await LineItem.create(req.body, {
        where: {
          productId: product.id
        }
      })
      //const lineItem = order.addProduct(req.body.productId)
      res.json("success!")
  } catch (err) {
    next(err)
  }
})
// api/cart
// PUT update cart with product
router.put('/', (req, res, next) => {
  try {
    const product = req.body
    const cart = req.session.cart
    const updatedCart = cart.push(product)
    res.status(200).json(updatedCart)
  } catch (err) {
    next(err)
  }
})

// api/cart
// Empty Cart
router.delete('/', (req, res, next) => {
  try {
    req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})


// api/cart/productId
// DELETE (Remove) product from cart
router.delete('/:productId', (req, res, next) => {
  try {
    const productToRemoveId = +req.params.productId
    const cartCopy = req.session.cart.slice()
    const filteredCart = cartCopy.filter(product => {
      return product.id !== productToRemoveId
    })

    req.session.cart = filteredCart
    res.status(200).json(filteredCart)
  } catch (error) { next(error) }
})

module.exports = router
