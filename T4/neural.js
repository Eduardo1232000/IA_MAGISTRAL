async function runNeural() {
    const { encodedData, mappings } = encodeData(rawData);

    const X = encodedData.map(row => row.slice(0, -1));
    const y = encodedData.map(row => row[row.length - 1]);

    const net = new brain.NeuralNetwork({
        hiddenLayers: [5],
    });

    const trainingData = X.map((inputs, idx) => ({
        input: inputs.map(x => x / 10),
        output: { wait: y[idx] === 1 ? 1 : 0 }
    }));

    net.train(trainingData, {
        log: true,
        iterations: 2000,
        learningRate: 0.3,
    });

    let output = "Predicciones Red Neuronal:\n";
    X.forEach((inputs, i) => {
        const result = net.run(inputs.map(x => x / 10));
        const pred = result.wait >= 0.5 ? 1 : 0;
        output += `Ejemplo ${i + 1}: Predicción=${pred} (Real=${y[i]})\n`;
    });

    document.getElementById('output').textContent = output;
}
