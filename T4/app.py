import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import CategoricalNB
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

# 1. Datos
data = [
    ['Yes', 'No', 'No', 'Yes', 'Some', '$$$', 'No', 'Yes', 'French', '0-10', 'Yes'],
    ['Yes', 'No', 'No', 'Yes', 'Full', '$', 'No', 'No', 'Thai', '30-60', 'No'],
    ['No', 'Yes', 'No', 'Yes', 'Some', '$', 'No', 'No', 'Burger', '0-10', 'Yes'],
    ['Yes', 'No', 'Yes', 'No', 'Some', '$', 'No', 'No', 'Thai', '10-30', 'Yes'],
    ['Yes', 'No', 'Yes', 'Yes', 'Full', '$$$', 'No', 'Yes', 'French', '60', 'No'],
    ['No', 'Yes', 'No', 'Yes', 'Some', '$', 'Yes', 'Yes', 'Italian', '0-10', 'Yes'],
    ['No', 'Yes', 'No', 'No', 'None', '$', 'Yes', 'No', 'Burger', '0-10', 'No'],
    ['No', 'No', 'No', 'Yes', 'Some', '$', 'Yes', 'Yes', 'Thai', '0-10', 'Yes'],
    ['No', 'No', 'No', 'No', 'None', '$', 'No', 'No', 'Burger', '60', 'No'],
    ['Yes', 'No', 'Yes', 'Yes', 'Full', '$', 'Yes', 'Yes', 'Italian', '10-30', 'Yes'],
    ['No', 'Yes', 'Yes', 'Yes', 'Full', '$$$', 'No', 'Yes', 'Thai', '0-10', 'Yes'],
    ['Yes', 'No', 'No', 'No', 'Some', '$', 'Yes', 'No', 'Burger', '30-60', 'No'],
]

# Separar entradas y salidas
X_raw = [row[:-1] for row in data]
y_raw = [row[-1] for row in data]

# 2. Codificación
encoders = []
X_encoded = []

for col in zip(*X_raw):
    le = LabelEncoder()
    X_encoded.append(le.fit_transform(col))
    encoders.append(le)

X_encoded = np.array(X_encoded).T

# Codificar salida
y_encoder = LabelEncoder()
y_encoded = y_encoder.fit_transform(y_raw)

# 3. Modelos
# Naive Bayes
nb = CategoricalNB()
nb.fit(X_encoded, y_encoded)
y_pred_nb = nb.predict(X_encoded)

# Red neuronal
mlp = MLPClassifier(hidden_layer_sizes=(5,), max_iter=1000, random_state=42)
mlp.fit(X_encoded, y_encoded)
y_pred_mlp = mlp.predict(X_encoded)

# 4. Evaluación
print("Accuracy Naive Bayes:", accuracy_score(y_encoded, y_pred_nb))
print("Accuracy MLP (Neural Network):", accuracy_score(y_encoded, y_pred_mlp))