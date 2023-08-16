import pandas as pd
import numpy as np

# Đọc file CSV
data = pd.read_csv("patient_dataset_raw.csv")

# Chỉ định danh sách các cột cần điền giá trị thiếu
numeric_columns = ['chest_pain_type', 'cholesterol', 'max_heart_rate',
                   'plasma_glucose', 'insulin', 'bmi']
data[numeric_columns] = data[numeric_columns].fillna(data[numeric_columns].mean())

# Xóa các cột 'gender', 'skin_thickness' và 'residence_type'
columns_to_drop = ['gender', 'skin_thickness', 'residence_type']
data = data.drop(columns=columns_to_drop)

# Xử lý thuộc tính smoking_status có giá trị "Unknown"
data['smoking_status'].replace("Unknown", np.nan, inplace=True)
data['smoking_status'].fillna(data['smoking_status'].mode()[0], inplace=True)

# Loại bỏ các bản ghi có blood_pressure nhỏ hơn 90 hoặc lớn hơn 180
data = data[(data['blood_pressure'] >= 90) & (data['blood_pressure'] <= 180)]

# Chuẩn hóa Min-Max Scaling cho các thuộc tính
columns_to_scale = ['blood_pressure', 'cholesterol', 'max_heart_rate', 'plasma_glucose', 
                    'insulin', 'bmi', 'diabetes_pedigree']
data[columns_to_scale] = ((data[columns_to_scale] - data[columns_to_scale].min()) / 
                         (data[columns_to_scale].max() - data[columns_to_scale].min()))

# Lưu tên cột gốc
original_columns = data.columns

# One-hot encoding cho thuộc tính 'smoking_status'
data = pd.get_dummies(data, columns=['smoking_status'], drop_first=True)

# Đặt lại tên cột sử dụng tên cột gốc
data.columns = original_columns

# Lưu dữ liệu đã chuẩn hóa vào một file mới
data.to_csv("patient_dataset_normalization.csv", index=False)

print("Dữ liệu đã chuẩn hóa đã được lưu vào file 'patient_dataset_standardized.csv'")
