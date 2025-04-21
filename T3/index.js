// index.js
const excelData = [
    ["Año", "República", "Guatemala", "El Progreso", "Sacatepéquez", "Chimaltenango", "Escuintla", "Santa Rosa", "Sololá", "Totonicapán", "Quetzaltenango", "Suchitepéquez", "Retalhuleu", "San Marcos", "Huehuetenango", "Quiché", "Baja Verapaz", "Alta Verapaz", "Petén", "Izabal", "Zacapa", "Chiquimula", "Jalapa", "Jutiapa"],
    [2008, 3169, 861, 80, 67, 121, 312, 79, 52, 42, 169, 200, 95, 127, 117, 92, 57, 99, 134, 84, 131, 85, 65, 100],
    [2009, 3528, 987, 101, 88, 127, 240, 100, 62, 49, 224, 216, 116, 140, 117, 135, 50, 134, 126, 129, 138, 89, 57, 103],
    [2010, 3187, 866, 77, 70, 89, 267, 124, 51, 22, 192, 134, 91, 114, 107, 92, 59, 148, 210, 115, 102, 102, 58, 97],
    [2011, 2693, 822, 74, 58, 88, 229, 119, 62, 30, 153, 126, 59, 94, 76, 78, 30, 73, 133, 77, 71, 75, 70, 96],
    [2012, 3150, 1016, 82, 81, 95, 252, 107, 68, 50, 173, 139, 68, 91, 92, 88, 34, 109, 129, 111, 107, 99, 57, 102],
    [2013, 3796, 1391, 90, 86, 85, 290, 135, 59, 38, 191, 163, 87, 128, 111, 95, 67, 109, 118, 135, 142, 104, 63, 109],
    [2014, 5651, 1912, 127, 150, 228, 444, 242, 109, 82, 255, 223, 132, 154, 136, 144, 95, 223, 219, 255, 148, 126, 75, 172],
    [2015, 6854, 2273, 160, 209, 263, 569, 254, 152, 69, 316, 243, 181, 177, 173, 157, 112, 315, 288, 285, 208, 172, 96, 182],
    [2016, 7964, 2619, 201, 287, 420, 627, 261, 182, 76, 323, 259, 262, 198, 225, 195, 149, 353, 267, 286, 315, 181, 98, 180],
    [2017, 5879, 2128, 139, 213, 244, 461, 234, 124, 44, 172, 238, 148, 130, 140, 145, 111, 247, 194, 200, 184, 114, 92, 177],
    [2018, 6395, 2722, 168, 201, 238, 407, 192, 104, 47, 155, 205, 153, 147, 108, 139, 132, 265, 187, 210, 184, 193, 78, 160],
    [2019, 7047, 3017, 151, 233, 274, 452, 220, 140, 63, 191, 218, 207, 149, 99, 114, 129, 317, 217, 234, 156, 153, 94, 219],
    [2020, 6350, 2676, 124, 202, 229, 440, 197, 81, 49, 197, 201, 203, 147, 113, 106, 96, 296, 206, 230, 141, 130, 121, 165],
    [2021, 8153, 3450, 170, 270, 297, 615, 238, 109, 77, 253, 229, 222, 182, 141, 186, 137, 380, 266, 237, 154, 166, 146, 228],
    [2022, 7924, 3387, 147, 325, 297, 695, 231, 68, 82, 239, 215, 216, 138, 118, 160, 145, 355, 226, 233, 146, 135, 127, 239]
  ];
  
  // Google Charts
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(init);
  
  function init() {
    const select = document.getElementById('departamento');
    const departamentos = excelData[0].slice(1);
    departamentos.forEach(dep => {
      const option = document.createElement("option");
      option.value = dep;
      option.textContent = dep;
      select.appendChild(option);
    });
  
    select.addEventListener("change", () => drawChart(select.value));
    drawChart(departamentos[0]);
  }
  
  function drawChart(dep) {
    const header = ['Año', dep];
    const colIndex = excelData[0].indexOf(dep);
    const rows = excelData.slice(1).map(r => [r[0], r[colIndex]]);
    const data = google.visualization.arrayToDataTable([header, ...rows]);
  
    const options = {
      title: `Regresión Lineal para ${dep}`,
      hAxis: { title: 'Año' },
      vAxis: { title: 'Valor' },
      trendlines: { 0: {} }
    };
  
    const chart = new google.visualization.LineChart(document.getElementById('grafica'));
    chart.draw(data, options);
  }