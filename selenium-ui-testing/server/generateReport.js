const fs = require('fs');
const path = require('path');

function generateHTMLReport(results) {
  const html = `
    <html>
      <head><title>Test Report</title></head>
      <body>
        <h1>Visual & Functional Test Report</h1>
        ${results.map(res => `
          <h2>Device: ${res.device}</h2>
          <p><strong>Mismatch:</strong> ${res.mismatchPercentage}%</p>
          <h3>Functional Tests:</h3>
          <ul>
            ${res.functionalResults.map(r =>
              `<li style="color:${r.status === 'passed' ? 'green' : 'red'}">
                ${r.test}: ${r.status}${r.message ? ` – ${r.message}` : ''}
              </li>`).join('')
            }
          </ul>
        `).join('')}
      </body>
    </html>
  `;

  const reportPath = path.join(__dirname, 'visual', 'reports', 'result.html');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, html);
}

module.exports = generateHTMLReport;
