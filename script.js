/**
 * Created by Song on 4/18/2017.
 */
var ctx = document.getElementById('myChart');
var data = [];
var XLIMIT = 1000000;
var YLIMIT = 1000000;
var Point = (function () {
    function Point() {
        this.x = Math.round((Math.random() * XLIMIT));
        this.y = Math.round((Math.random() * YLIMIT));
    }
    return Point;
}());
function generatePoints(size) {
    var output = [];
    for (var i = 0; i < size; i++) {
        output.push(new Point());
    }
    return output;
}
function draw() {
    $('#chartContainer').empty();
    var size = parseInt($('#sizeInput').val());
    var data = generatePoints(size);
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
function drawD3(data) {
    var base = d3.select("#chartContainer");
    var chart = base.append("canvas")
        .attr("width", 800)
        .attr("height", 800);
    var context = chart.node().getContext("2d");
    var scale = d3.scaleLinear()
        .range([0, YLIMIT])
        .domain([0, XLIMIT]);
    data.forEach(function (d, i) {
        context.beginPath();
        context.rect(scale(d.x), scale(d.y), 10, 10);
        context.fillStyle = "red";
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
function drawCanvasJS(data) {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: false,
        axisX: {
            labelFontSize: 12
        },
        axisY: {
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
function drawChartJS(data) {
    var canvas = document.createElement('canvas');
    canvas.id = 'chartJSCanvas';
    canvas.setAttribute('height', '800px');
    canvas.setAttribute('width', '800px');
    $('#chartContainer').append(canvas);
    var chart = new Chart(canvas, {
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
function createRandomElement() {
    var el = document.createElement('div');
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    el.style.cssText = "background-color:" + getRandomColor() + ';';
    el.className = 'perfItem';
    return el;
}
$(document).ready(function () {
    var step = 0;
    var perf = $('#perfTest');
    var THRESHOLD = 26;
    stepFn();
    function stepFn() {
        if (step++ % THRESHOLD === 0) {
            perf.empty();
        }
        else {
            perf.append(createRandomElement());
        }
        setTimeout(stepFn, 10);
    }
});
