const history = [];

document.getElementById('dataForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const color = document.getElementById('color').value;
  const size = document.getElementById('size').value;
  history.push({ color, size });
  updateHistoryTable();
  analyzeData();
});

function updateHistoryTable() {
  const tbody = document.querySelector('#historyTable tbody');
  tbody.innerHTML = '';
  history.forEach((result, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${result.color}</td>
      <td>${result.size}</td>
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function analyzeData() {
  const colorCount = { Green: 0, Violet: 0, Red: 0 };
  const sizeCount = { Big: 0, Small: 0 };

  history.forEach(result => {
    colorCount[result.color]++;
    sizeCount[result.size]++;
  });

  document.getElementById('colorFrequency').textContent = 
    `Green: ${colorCount.Green}, Violet: ${colorCount.Violet}, Red: ${colorCount.Red}`;
  document.getElementById('sizeRatio').textContent = 
    `Big: ${sizeCount.Big}, Small: ${sizeCount.Small}`;

  updateChart(colorCount);
}

function updateChart(colorCount) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (window.myChart) window.myChart.destroy(); // Destroy existing chart
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Green', 'Violet', 'Red'],
      datasets: [{
        label: 'Color Frequency',
        data: [colorCount.Green, colorCount.Violet, colorCount.Red],
        backgroundColor: ['green', 'violet', 'red'],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
