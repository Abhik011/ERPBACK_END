const mongoose = require("mongoose") // Add this line

const purchaseOrderSchema = new mongoose.Schema(
    {
      supplier: { type: String, required: true },
      items: { type: String, required: true },
      quantity: { type: String, required: true },
      totalAmount: { type: String, required: true },
      expectedDelivery: { type: String, required: true },
      notes: { type: String },
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema)