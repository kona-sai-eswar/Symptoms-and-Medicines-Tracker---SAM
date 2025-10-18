import { Schema, model, models } from 'mongoose';

const medicineSchema = new Schema({
  name: { type: String, required: true },
  reason: { type: String, required: true },
  dailyDosage: { type: Number, required: true },
  duration: { type: Number, required: true },
  timings: [{ type: String, required: true }],
  stock: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  takenToday: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
//   symptoms: [{ type: Schema.Types.ObjectId, ref: 'Symptom' }] // connect to existing symptoms
});

const Medicine = models.Medicine || model('Medicine', medicineSchema);
export default Medicine;
