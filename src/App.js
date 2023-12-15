import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // Ruta del archivo CSV en la carpeta 'public'
    const csvFilePath = process.env.PUBLIC_URL + '/ingresos.csv';

    // Leer el archivo CSV utilizando PapaParse
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      error: (error) => {
        console.error('Error al leer el archivo CSV:', error);
      },
    });
  }, []);

  return (
    <div>
      <h1>Contenido del CSV</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              <td>{row.Fecha}</td>
              <td>{row.Concepto}</td>
              <td>{row.Monto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
