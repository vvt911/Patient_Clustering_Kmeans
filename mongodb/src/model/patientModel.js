const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    age: Number,
    chest_pain_type: Number,
    blood_pressure: Number,
    cholesterol: Number,
    max_heart_rate: Number,
    exercise_angina: Number,
    plasma_glucose: Number,
    insulin: Number,
    bmi: Number,
    diabetes_pedigree: Number,
    hypertension: Number,
    heart_disease: Number,
    smoking_status: Number,
});

const Patients = mongoose.model("Patients", patientSchema);
module.exports = { Patients };