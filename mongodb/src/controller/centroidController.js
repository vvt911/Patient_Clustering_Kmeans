const { get } = require('mongoose');
const { Centroids} = require('../model/centroidModel');
const { preprocessData } = require('../utils/dataUtils');
const { calculateDistance, getClusterFeatures } = require('../utils/centroidUtil');

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
        const centroids = await Centroids.find().sort({ age: -1 });
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
        const patientProcessed = await preprocessData(patient);

        let minDistance = Infinity;
        let centroidNearest = centroidData[0];
        for (let i = 0; i < centroidData.length; i++) {
            const centroid = centroidData[i];
            const distance = await calculateDistance(centroid, patientProcessed);
            if (minDistance > distance) {
                minDistance = distance;
                centroidNearest = centroid;
            }
        }
        const clusteredFetures = await getClusterFeatures(centroidNearest, centroidData);
        res.json(clusteredFetures);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}; 



module.exports = { createCentroids, getCentroidsNearest};