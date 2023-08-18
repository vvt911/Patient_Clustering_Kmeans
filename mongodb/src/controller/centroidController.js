const { get } = require('mongoose');
const { Centroids} = require('../model/centroidModel');

const createCentroids = async (req, res) => {
    try {
        const existingCentroids = await Centroids.find();
        if (existingCentroids.length > 0) {
            await Centroids.deleteMany({});
        }

        const centroidsToAdd = req.body.map(centroidString => {
            const [age, chest_pain_type, blood_pressure, cholesterol, max_heart_rate, exercise_angina, plasma_glucose, insulin, bmi, diabetes_pedigree, hypertension, heart_disease, smoking_status] = centroidString.split(', ');

            return {
                age: parseFloat(age),
                chest_pain_type: parseFloat(chest_pain_type),
                blood_pressure: parseFloat(blood_pressure),
                cholesterol: parseFloat(cholesterol),
                max_heart_rate: parseFloat(max_heart_rate),
                exercise_angina: parseFloat(exercise_angina),
                plasma_glucose: parseFloat(plasma_glucose),
                insulin: parseFloat(insulin),
                bmi: parseFloat(bmi),
                diabetes_pedigree: parseFloat(diabetes_pedigree),
                hypertension: parseFloat(hypertension),
                heart_disease: parseFloat(heart_disease),
                smoking_status: parseFloat(smoking_status),
            };
        });

        const createdCentroids = await Centroids.create(centroidsToAdd);

        res.status(201).json({
            status: 'success',
            data: {
                centroids: createdCentroids,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// get all centroids and calculate the distance between each centroid and and patient in req.body
const getCentroidsNearest = async (req, res) => {
    try {
        const centroids = await Centroids.find();
        const centroidData = centroids.map(centroid => {
            return {
                age: centroid.age,
                chest_pain_type: centroid.chest_pain_type,
                blood_pressure: centroid.blood_pressure,
                cholesterol: centroid.cholesterol,
                max_heart_rate: centroid.max_heart_rate,
                exercise_angina: centroid.exercise_angina,
                plasma_glucose: centroid.plasma_glucose,
                insulin: centroid.insulin,
                bmi: centroid.bmi,
                diabetes_pedigree: centroid.diabetes_pedigree,
                hypertension: centroid.hypertension,
                heart_disease: centroid.heart_disease,
                smoking_status: centroid.smoking_status
            };
        });
        const patient = req.body;
        console.log(patient);

        let minDistance = Infinity;
        let centroidNearest = centroidData[0];
        for (let i = 0; i < centroidData.length; i++) {
            const centroid = centroidData[i];
            const distance = await calculateDistance(centroid, patient);
            if (minDistance > distance) {
                minDistance = distance;
                centroidNearest = centroid;
            }
        }
        res.json(centroidNearest);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}; 

// calculate the distance between two points
const calculateDistance = async (point1, point2) => {
    const distance = Math.sqrt(
        Math.pow(point1.age - point2.age, 2) +
        Math.pow(point1.chest_pain_type - point2.chest_pain_type, 2) +
        Math.pow(point1.blood_pressure - point2.blood_pressure, 2) +
        Math.pow(point1.cholesterol - point2.cholesterol, 2) +
        Math.pow(point1.max_heart_rate - point2.max_heart_rate, 2) +
        Math.pow(point1.exercise_angina - point2.exercise_angina, 2) +
        Math.pow(point1.plasma_glucose - point2.plasma_glucose, 2) +
        Math.pow(point1.insulin - point2.insulin, 2) +
        Math.pow(point1.bmi - point2.bmi, 2) +
        Math.pow(point1.diabetes_pedigree - point2.diabetes_pedigree, 2) +
        Math.pow(point1.hypertension - point2.hypertension, 2) +
        Math.pow(point1.heart_disease - point2.heart_disease, 2) +
        Math.pow(point1.smoking_status - point2.smoking_status, 2)
    );
    return distance;
};

module.exports = { createCentroids, getCentroidsNearest};