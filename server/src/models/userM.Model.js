import mongoose from "mongoose";

const airplaneSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    type: { type: String, required: true },
    airplane_seat_number: { type: Number, required: true , default: 100, min: 1},
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

export const Airplane = mongoose.model("Airplane", airplaneSchema)
export default Airplane