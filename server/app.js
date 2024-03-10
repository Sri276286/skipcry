const express = require('express');
const XLSX = require('xlsx');
const path = require('path');

const app = express();

app.get('/api', (req, res) => {
 handleLogic(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function handleLogic(req, res) {
   // Load Excel file
   const workbook = XLSX.readFile(path.join(__dirname, 'data.xlsx'));

   // Get the first sheet
   const sheetName = workbook.SheetNames[0];
   const worksheet = workbook.Sheets[sheetName];

   // Convert worksheet to JSON
   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

   console.log('data 123 => ', data);

// Convert array of arrays to object
const jsonObject = {result: []};
let resultArray = [];
for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowData = {};
    for (let j = 0; j < row.length; j++) {
        const propertyName = data[0][j];
        rowData[propertyName] = row[j];
    }
    resultArray = [...resultArray, rowData];
}
jsonObject.result = resultArray;

console.log('jsonObject => ', jsonObject);

res.send(jsonObject);
}
