const url = 'data.json';
const charts = document.querySelector('.charts');
let highest;
let currentDay = new Date().toLocaleDateString('en-us', { weekday: 'short' }).toLowerCase();


fetch(url)
  .then((res) => {
      return res.json();
  })
  .then((data) => {
    highest = data.reduce((acc, curr) => {
      return acc > curr.amount ? acc : curr.amount
    }, 0);
    data.forEach((chart) => {
      charts.appendChild(createChart(chart))
    })
    document.querySelectorAll('fadeIn').forEach((element, arr) => {
      setTimeout(() => {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)'
      }, (arr + 1) * 100 + 100)
    })
    document.querySelectorAll('.chart-bar').forEach((chartBar, arr) => {
      setTimeout(() => {
      const value = chartBar.getAttribute('data-value');
      const percent = (value / highest) * 100;
      chartBar.style.height = `${percent}%`;
      chartBar.style.opacity = 1;
      chartBar.style.transition = `height ${(percent * 0.3) / 100}s ease-in-out, opacity ${(percent * 0.3) / 100}s ease-in-out`
    }, (arr + 1) * 100)
  })
})
  .catch((err) => {
    console.log(err)
  })

function createChart(chart) {
	const div = document.createElement('div')
	div.classList.add('chart')
	if (chart.day == currentDay) {
		div.classList.add('current')
	}
	div.innerHTML = `
            <div class="chart-bar" data-value="${chart.amount}" ></div>
            <div class="chart-day mini-caption medium-brown">${chart.day}</div>
        `
	return div
}















/*

var xValues = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var yValues = [17.45, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48];
var barColors = ["hsl(10, 79%, 65%)", "hsl(10, 79%, 65%)","hsl(186, 34%, 60%)","hsl(10, 79%, 65%)","hsl(10, 79%, 65%)", "hsl(10, 79%, 65%)", "hsl(10, 79%, 65%)"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    responsive: true,
    legend: {display: false},
    title: {
      display: false,
      text: "spending"
    }
  }
});

*/

