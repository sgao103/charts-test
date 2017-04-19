/**
 * Created by Song on 4/18/2017.
 */

declare let d3: any;
declare let $: any;
declare let CanvasJS: any;
declare let Chart: any;

const X_LIMIT = 1000000;
const Y_LIMIT = 1000000;

class Point {
  x: number;
  y: number;
  constructor() {
    this.x = Math.round((Math.random() * X_LIMIT));
    this.y = Math.round((Math.random() * Y_LIMIT));
  }
}

function generatePoints(size: number): Point[] {
  let output = [];
  for(let i = 0; i < size; i++) {
    output.push(new Point());
  }
  return output;
}

function draw(): void {

  $('#chartContainer').empty();

  let size = parseInt($('#sizeInput').val());
  let data = generatePoints(size);

  switch ($('#librarySelect').val()) {
    case 'chartjs':
      drawChartJS(data);
      break;
    case 'canvasjs':
      drawCanvasJS(data);
      break;
    case 'd3js':
      drawD3(data);
      break;
  }
}

function drawD3(data: Point[]): void {
  let base = d3.select("#chartContainer");
  let chart = base.append("canvas")
    .attr("width", 800)
    .attr("height", 800);

  let context = chart.node().getContext("2d");

  let scale = d3.scaleLinear()
    .range([0, Y_LIMIT])
    .domain([0, X_LIMIT]);

  data.forEach(function(d, i) {
    context.beginPath();
    context.rect(scale(d.x), scale(d.y), 10, 10);
    context.fillStyle="red";
    context.fill();
    context.closePath();
  });
  
  // let base = d3.select('#chartContainer');
  // let chart = base.append('canvas')
  //   .attr('width', 800)
  //   .attr('height', 800);
  //
  // let context = chart.node().getContext('2d');
  //
  // data.forEach(function(d, i) {
  //   context.beginPath();
  //   context.rect(d.x, d.y, 1, 1);
  //   context.closePath();
  // });
}

function drawCanvasJS(data: Point[]): void {
  let chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: false,
      axisX: {
        labelFontSize: 12
      },
      axisY:{
        labelFontSize: 12
      },
      data: [
        {
          type: "scatter",
          dataPoints: data
        }
      ]
    });

  chart.render();
}

function drawChartJS(data: Point[]): void {

  let canvas = document.createElement('canvas');
  canvas.id = 'chartJSCanvas';
  canvas.setAttribute('height', '800px');
  canvas.setAttribute('width', '800px');
  $('#chartContainer').append(canvas);

  let chart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Scatter Dataset',
        data: data
      }]
    },
    options: {
      responsive: false,
      animation: false,
      showLines: false,
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  });
}

function createRandomElement(): HTMLElement {
  let el = document.createElement('div');

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  el.style.cssText="background-color:" + getRandomColor() + ';';
  el.className = 'perfItem';

  return el;
}

$(document).ready(function() {
  let step = 0;
  let perf = $('#perfTest');
  const THRESHOLD = 26;

  stepFn();

  function stepFn(): void {
    if(step++ % THRESHOLD === 0) {
      perf.empty();
    } else {
      perf.append(createRandomElement());
    }

    setTimeout(stepFn, 10);
  }

});
