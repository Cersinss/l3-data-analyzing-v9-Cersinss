const fs = require('fs');
const path = require('path');

function processVacanciesFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').map(line => line.trim());
  const headers = lines[0].split(',');

  let count = 0;
  let cities = [];
  let maxSalary = 0;
  let graduated = 0;
  let legalTypes = new Set();

  for (let i = 1; i < lines.length; i++) {
    const data = lines[i].split(',');
    if (data.length !== headers.length) continue; 
    // Шаг 1: 
    count++;
    // Шаг 2: 
    const city = data[headers.indexOf('city')];
    if (!cities.includes(city)) cities.push(city);
    // Шаг 3: 
    const salary = parseInt(data[headers.indexOf('salary')], 10);
    if (salary > maxSalary) maxSalary = salary;
    // Шаг 4: 
    if (data[headers.indexOf('education')].includes('высшее')) graduated++;
    // Шаг 5: 
    const legalType = data[headers.indexOf('legal_form')];
    legalTypes.add(legalType);
  }
  //Вывод
  console.log(`Count: ${count}`);
  console.log(`Cities: ${cities.join(', ')}`);
  console.log(`Maximum salary: ${maxSalary}`);
  console.log(`Graduated: ${graduated}`);
  console.log(`Legal type of company and their number: ${JSON.stringify({ [legalType]: legalTypes.size }, null, 2)}`);
}
processVacanciesFile(path.resolve(__dirname, '__fixtures__', 'vacancies1.csv'));
