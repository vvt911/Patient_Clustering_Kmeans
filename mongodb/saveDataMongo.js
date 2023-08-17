const readline = require('readline');
const fs = require('fs');
const mongoose = require('mongoose');

// Kết nối tới MongoDB bằng Mongoose

try {
    mongoose.connect('mongodb://127.0.0.1:27017/patient', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
}

const rl = readline.createInterface({
    input: fs.createReadStream('patient_dataset_normalization_notitle.csv'),
    output: process.stdout,
    terminal: false
});
console.log('Reading file line by line...');

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
    smoking_status: Number
});

const Patient = mongoose.model('patient', patientSchema);

rl.on('line', async (line) => {
    const data = line.split(',');
    const patient = new Patient({
        age: parseInt(data[0]),
        chest_pain_type: parseInt(data[1]),
        blood_pressure: parseFloat(data[2]),
        cholesterol: parseFloat(data[3]),
        max_heart_rate: parseFloat(data[4]),
        exercise_angina: parseInt(data[5]),
        plasma_glucose: parseFloat(data[6]),
        insulin: parseFloat(data[7]),
        bmi: parseFloat(data[8]),
        diabetes_pedigree: parseFloat(data[9]),
        hypertension: parseInt(data[10]),
        heart_disease: parseInt(data[11]),
        smoking_status: parseInt(data[12])
    });

    try {
        const savedPatient = await patient.save();
        console.log('Inserted patient:', savedPatient._id);
    } catch (error) {
        console.error('Failed to insert document:', error);
    }
});
