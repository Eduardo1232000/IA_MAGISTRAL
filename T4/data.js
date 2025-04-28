// Datos originales de la tabla Norvig (Figura 18.3)
const rawData = [
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
];

// Función para codificar atributos automáticamente
function encodeData(data) {
    const mappings = [];
    const encoded = data[0].map((_, colIndex) => {
        const uniqueValues = [...new Set(data.map(row => row[colIndex]))];
        mappings.push(Object.fromEntries(uniqueValues.map((val, idx) => [val, idx])));
        return null;
    });

    const encodedData = data.map(row =>
        row.map((val, idx) => mappings[idx][val])
    );

    return { encodedData, mappings };
}
