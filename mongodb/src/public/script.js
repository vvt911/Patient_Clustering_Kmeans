document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patientForm");
    const resultParagraph = document.getElementById("result");
    const resultBox = document.getElementById("box-result");


    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            age: parseInt(form.age.value),
            chest_pain_type: parseInt(form.chest_pain_type.value),
            blood_pressure: parseInt(form.blood_pressure.value),
            cholesterol: parseInt(form.cholesterol.value),
            max_heart_rate: parseInt(form.max_heart_rate.value),
            exercise_angina: parseInt(form.exercise_angina.value),
            plasma_glucose: parseInt(form.plasma_glucose.value),
            insulin: parseInt(form.insulin.value),
            bmi: parseFloat(form.bmi.value),
            diabetes_pedigree: parseFloat(form.diabetes_pedigree.value),
            hypertension: parseInt(form.hypertension.value),
            heart_disease: parseInt(form.heart_disease.value),
            smoking_status: form.smoking_status.value,
        };

        try {
            // Convert form data to JSON
            const jsonData = JSON.stringify(formData);

            // Send POST request to API
            const response = await fetch("http://127.0.0.1:3000/api/centroid-predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            });

            if (response.ok) {
                const predictionResult = await response.json();
                resultParagraph.textContent  = `${predictionResult.data.clusteredFetures.name}: ${predictionResult.data.clusteredFetures.features}`
                resultBox.classList.add(`${predictionResult.data.clusteredFetures.color_text}`);
            } else {
                resultParagraph.textContent = "Prediction failed.";
            }
        } catch (error) {
            resultParagraph.textContent = "An error occurred during prediction.";
            console.error("Prediction error:", error);
        }
    });
});
