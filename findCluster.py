import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Đọc dữ liệu từ file CSV
data = pd.read_csv("patient_dataset_normalization.csv")

# Chọn các cột để sử dụng trong thuật toán KMeans
selected_features = ['age', 'chest_pain_type', 'blood_pressure', 'cholesterol', 'max_heart_rate', 'exercise_angina', 'plasma_glucose', 'insulin', 'bmi', 'diabetes_pedigree', 'hypertension', 'heart_disease', 'smoking_status']
X = data[selected_features]

# Tính WCSS (Within-Cluster Sum of Squares) cho các số lượng cụm từ 1 đến max_clusters
max_clusters = 10
wcss = []
for num_clusters in range(1, max_clusters + 1):
    kmeans = KMeans(n_clusters=num_clusters, n_init=10)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

# Vẽ biểu đồ Elbow Method
plt.figure(figsize=(10, 6))
plt.plot(range(1, max_clusters + 1), wcss, marker='o')
plt.xticks(range(1, max_clusters + 1))
plt.title('Elbow Method')
plt.xlabel('Number of Clusters')
plt.ylabel('WCSS')
plt.show()