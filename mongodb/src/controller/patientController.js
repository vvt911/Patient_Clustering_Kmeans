const { Patients } = require("../model/patientModel");

const getPatients = async (req, res) => {
    try {
        const patients = await Patients.find();
        const patientString = patients.map(patient => {
            return `${patient.age}, ${patient.chest_pain_type}, ${patient.blood_pressure}, ${patient.cholesterol}, ${patient.max_heart_rate}, ${patient.exercise_angina ? 1 : 0}, ${patient.plasma_glucose}, ${patient.insulin}, ${patient.bmi}, ${patient.diabetes_pedigree}, ${patient.hypertension ? 1 : 0}, ${patient.heart_disease ? 1 : 0}, ${patient.smoking_status}`;
        }).join('\n');
        res.type('text').send(patientString);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};



module.exports = { getPatients };
