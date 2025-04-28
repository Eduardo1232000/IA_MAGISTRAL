async function runBayes() {
    const { encodedData, mappings } = encodeData(rawData);

    const X = encodedData.map(row => row.slice(0, -1));
    const y = encodedData.map(row => row[row.length - 1]);

    const model = trainNaiveBayes(X, y);

    const predictions = X.map(row => predictNaiveBayes(model, row));

    let output = "Predicciones Naive Bayes:\n";
    predictions.forEach((pred, i) => {
        output += `Ejemplo ${i + 1}: Predicción=${pred} (Real=${y[i]})\n`;
    });

    document.getElementById('output').textContent = output;
}

function trainNaiveBayes(X, y) {
    const classes = [...new Set(y)];
    const featureCounts = {};
    const classCounts = {};

    classes.forEach(cls => {
        featureCounts[cls] = [];
        classCounts[cls] = 0;
    });

    X.forEach((row, idx) => {
        const cls = y[idx];
        classCounts[cls]++;
        row.forEach((value, featureIdx) => {
            if (!featureCounts[cls][featureIdx]) featureCounts[cls][featureIdx] = {};
            featureCounts[cls][featureIdx][value] = (featureCounts[cls][featureIdx][value] || 0) + 1;
        });
    });

    return { classes, featureCounts, classCounts, total: y.length };
}

function predictNaiveBayes(model, input) {
    const { classes, featureCounts, classCounts, total } = model;
    const probs = {};

    classes.forEach(cls => {
        let prob = Math.log(classCounts[cls] / total);
        input.forEach((value, featureIdx) => {
            const count = (featureCounts[cls][featureIdx][value] || 0.1); // Laplace smoothing
            const totalForFeature = Object.values(featureCounts[cls][featureIdx] || {}).reduce((a, b) => a + b, 0) + 1;
            prob += Math.log(count / totalForFeature);
        });
        probs[cls] = prob;
    });

    return +Object.entries(probs).sort((a, b) => b[1] - a[1])[0][0];
}
