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

const getClusterFeatures = async (centroid, centroidData) => {
    if (centroid === centroidData[0]) {
        return {
            name: "Senior Health",
            features: "Tuổi cao, huyết áp thấp, nhịp tim cực đại cao, nguy cơ tiểu đường thấp.",
            color_text: "text-danger"
        };
    } else if (centroid === centroidData[1]) {
        return {
            name: "Active Adults",
            features: "Tuổi trung bình, nhịp tim cực đại trung bình, huyết áp tăng, nguy cơ tiểu đường cao.",
            color_text: "text-warning"
        };
    } else if (centroid === centroidData[2]) {
        return {
            name: "Young and Fit",
            features: "Tuổi thấp, nhịp tim cực đại cao, nguy cơ huyết áp cao thấp, nguy cơ bệnh tim thấp.",
            color_text: "text-success"
        };
    }
};


module.exports = { calculateDistance , getClusterFeatures};