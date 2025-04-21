// Datos para clasificación (ejemplo con 3 atributos)
const datosClasificacion = [
    { departamento: 'Guatemala', año: 2022, pobreza: 47.5, educacion: 6.5, clasificacion: 'Alta' },
    { departamento: 'Alta Verapaz', año: 2022, pobreza: 68.3, educacion: 3.2, clasificacion: 'Alta' },
    { departamento: 'Quiché', año: 2022, pobreza: 65.7, educacion: 3.5, clasificacion: 'Alta' },
    { departamento: 'Huehuetenango', año: 2022, pobreza: 62.1, educacion: 3.8, clasificacion: 'Media' },
    { departamento: 'San Marcos', año: 2022, pobreza: 58.4, educacion: 4.1, clasificacion: 'Media' },
    { departamento: 'Escuintla', año: 2022, pobreza: 54.7, educacion: 4.4, clasificacion: 'Media' },
    { departamento: 'Quetzaltenango', año: 2022, pobreza: 45.2, educacion: 5.7, clasificacion: 'Baja' },
    { departamento: 'Sacatepéquez', año: 2022, pobreza: 38.6, educacion: 6.2, clasificacion: 'Baja' },
    { departamento: 'Chimaltenango', año: 2022, pobreza: 42.3, educacion: 5.9, clasificacion: 'Baja' },
    { departamento: 'Retalhuleu', año: 2022, pobreza: 40.8, educacion: 6.0, clasificacion: 'Baja' }
  ];
  
  function realizarClasificacion() {
    // Convertir datos a formato que entienda ml-cart
    const features = datosClasificacion.map(item => [
      item.pobreza,
      item.educacion,
      item.año
    ]);
    
    const labels = datosClasificacion.map(item => item.clasificacion);
    
    // Crear y entrenar el árbol de decisión
    const options = {
      gainFunction: 'gini',
      maxDepth: 3,
      minNumSamples: 1
    };
    
    const classifier = new DecisionTreeClassifier(options);
    classifier.train(features, labels);
    
    // Realizar predicciones sobre los mismos datos de entrenamiento
    const predictions = classifier.predict(features);
    
    // Calcular precisión
    let correctas = 0;
    const matrizConfusion = {
      Alta: { Alta: 0, Media: 0, Baja: 0 },
      Media: { Alta: 0, Media: 0, Baja: 0 },
      Baja: { Alta: 0, Media: 0, Baja: 0 }
    };
    
    for (let i = 0; i < labels.length; i++) {
      if (predictions[i] === labels[i]) {
        correctas++;
      }
      matrizConfusion[labels[i]][predictions[i]]++;
    }
    
    const precision = (correctas / labels.length * 100).toFixed(2);
    
    // Mostrar resultados
    document.getElementById('resultadoClasificacion').innerHTML = `
      <h3>Resultados de Clasificación</h3>
      <p>Precisión: ${precision}%</p>
      <p>Atributos utilizados: Pobreza, Educación, Año</p>
    `;
    
    // Mostrar matriz de confusión
    let matrizHTML = '<h3>Matriz de Confusión</h3><table border="1"><tr><th></th><th>Pred. Alta</th><th>Pred. Media</th><th>Pred. Baja</th></tr>';
    
    for (const real in matrizConfusion) {
      matrizHTML += `<tr><th>Real ${real}</th>`;
      for (const pred in matrizConfusion[real]) {
        matrizHTML += `<td>${matrizConfusion[real][pred]}</td>`;
      }
      matrizHTML += '</tr>';
    }
    
    matrizHTML += '</table>';
    document.getElementById('matrizConfusion').innerHTML = matrizHTML;
    
    // Mostrar ejemplo de predicción
    const ejemplo = classifier.predict([[50.0, 5.0, 2022]]);
    document.getElementById('resultadoClasificacion').innerHTML += `
      <p>Ejemplo de predicción para pobreza=50%, educación=5.0, año=2022: <strong>${ejemplo[0]}</strong></p>
    `;
  }