import mongoose from "mongoose"

const SeverityEntrySchema = new mongoose.Schema({
    time: { type: String, required: true },
    severity: { type: Number, required: true },
    description:{ type:String, required:true}
  });
  
  const DateSeveritySchema = new mongoose.Schema({
    date: { type: String, required: true },
    records: [SeverityEntrySchema],
  });
  

const SymptomsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    severity:[DateSeveritySchema],
    isArchived: { type: Boolean, default: false },
    isSaved: { type: Boolean, default: false }
}, {timestamps:true})

const SymptomsModel = mongoose.models.Symptom || mongoose.model("Symptom", SymptomsSchema)

export default SymptomsModel