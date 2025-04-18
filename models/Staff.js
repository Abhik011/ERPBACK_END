const mongoose = require("mongoose")

const StaffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  joiningDate: { type: String, required: true },
  status: { type: String, enum: ["Active", "On Leave", "Former"], default: "Active" },
})

module.exports = mongoose.model("Staff", StaffSchema)
