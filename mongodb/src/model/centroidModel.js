const mongoose = require("mongoose");

const centroidSchema = new mongoose.Schema({
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

const Centroids = mongoose.model("Centroids", centroidSchema);
module.exports = { Centroids };