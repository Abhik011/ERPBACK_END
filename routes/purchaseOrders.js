const express = require("express")
const router = express.Router()
const PurchaseOrder = require("../models/PurchaseOrder")

router.get("/", async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch purchase orders" })
  }
})

router.post("/", async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body)
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: "Failed to create order", message: err.message })
  }
})

module.exports = router