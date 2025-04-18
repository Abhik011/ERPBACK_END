// routes/staff.js
const express = require("express")
const router = express.Router()
const Staff = require("../models/Staff")

// GET all staff
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find()
    res.json(staff)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

// POST new staff
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff(req.body)
    const saved = await newStaff.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update staff
router.put("/:id", async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE staff
router.delete("/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router