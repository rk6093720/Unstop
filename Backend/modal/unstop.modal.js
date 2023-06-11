
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    row: { type: Number, required: true },
    seat: { type: Number, required: true },
    isReserved: { type: Boolean, default: false },
})

const Unstop = mongoose.model("user", userSchema)


module.exports = {
    Unstop
}