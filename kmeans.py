import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Đọc dữ liệu từ file CSV
data = pd.read_csv('patient_dataset_normalization.csv')

# Chọn các đặc trưng để thực hiện phân cụm
selected_features = ['age', 'chest_pain_type', 'blood_pressure', 'cholesterol',
                     'max_heart_rate', 'exercise_angina', 'plasma_glucose',
                     'insulin', 'bmi', 'diabetes_pedigree', 'hypertension',
                     'heart_disease', 'smoking_status']

features = data[selected_features]

# Số lượng cụm bạn muốn tạo
num_clusters = 3

# Áp dụng thuật toán KMeans để phân cụm dữ liệu
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
data['cluster'] = kmeans.fit_predict(features)

# In thông tin về số lượng bệnh nhân trong mỗi cụm
print(data['cluster'].value_counts())

# Lưu dữ liệu đã được gán cụm và mức độ cấp cứu vào file mới
# data.to_csv('clustered_data.csv', index=False)

# Vẽ biểu đồ phân tán các cụm
plt.figure(figsize=(10, 6))
plt.scatter(data['age'], data['chest_pain_type'], c=data['cluster'], cmap='rainbow')
plt.xlabel('Age')
plt.ylabel('chest_pain_type')
plt.title('Clusters of Patients')
plt.show()


# # Dữ liệu bệnh nhân mới để dự đoán cụm
# age,\
# chest_pain_type,\
# blood_pressure,\
# cholesterol,\
# max_heart_rate,\
# exercise_angina,\
# plasma_glucose,\
# insulin,\
# bmi,\
# diabetes_pedigree,\
# hypertension,\
# heart_disease,\
# smoking_status = 29, 4, 0.466666667, 0.372222222, 0.513333333, 0, 0.733333333, 0.496012518, 0.389802481, 0.076646603, 1, 1, 1;

# # 29, 4, 0.466666667, 0.372222222, 0.513333333, 0, 0.733333333, 0.496012518, 0.389802481, 0.076646603, 1, 1, 1, 1
# # 73, 2, 0.133333333, 0.444444444, 0.366666667, 0, 0.194444444, 0.85, 0.216484002, 0.57176332, 0, 1, 1, 2
# # 49, 3, 0.011111111, 0.238888889, 0.813333333, 0, 0.511111111, 0.9, 0.069078928, 0.182349046, 1, 1, 1, 0


# new_patient_data = {
#     'age': age,
#     'chest_pain_type': chest_pain_type,
#     'blood_pressure': blood_pressure,
#     'cholesterol': cholesterol,
#     'max_heart_rate': max_heart_rate,
#     'exercise_angina': exercise_angina,
#     'plasma_glucose': plasma_glucose,
#     'insulin': insulin,
#     'bmi': bmi,
#     'diabetes_pedigree': diabetes_pedigree,
#     'hypertension': hypertension,
#     'heart_disease': heart_disease,
#     'smoking_status': smoking_status
# }

# # Chuyển dữ liệu mới vào DataFrame và thực hiện dự đoán cụm
# new_patient_df = pd.DataFrame([new_patient_data])
# new_patient_features = new_patient_df[selected_features]
# predicted_cluster = kmeans.predict(new_patient_features)[0]
# print("Predicted Cluster:", predicted_cluster)
