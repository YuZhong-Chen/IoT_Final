import Chart from "../node_modules/chart.js/auto";
import './index.css';

var data1 = [
    { "Time": "15:30:00", "Volume": NaN },
    { "Time": "13:00:00", "Volume": 1659 },
    { "Time": "15:00:00", "Volume": 1050 },
    { "Time": "16:00:00", "Volume": 1200 },
    { "Time": "10:00:00", "Volume": 1138 },
    { "Time": "18:00:00", "Volume": 1386 },
    { "Time": "10:01:00", "Volume": 1041 },
    { "Time": "20:00:00", "Volume": 1734 },
    { "Time": "20:00:01", "Volume": 1372 },
    { "Time": "22:00:00", "Volume": 1270 },
    { "Time": "21:00:00", "Volume": NaN },];

var data2 = [
    { "Time": "05:00:00", "Volume": 1017 },
    { "Time": "06:00:00", "Volume": 1066 },
    { "Time": "07:00:00", "Volume": 1475 },
    { "Time": "08:00:00", "Volume": 1270 },
    { "Time": "09:00:00", "Volume": 1496 },
    { "Time": "10:00:00", "Volume": 1712 },
    { "Time": "11:00:00", "Volume": 1068 },
    { "Time": "12:00:00", "Volume": 1018 },
    { "Time": "13:00:00", "Volume": 1283 },
    { "Time": "13:30:00", "Volume": NaN },
    { "Time": "18:00:00", "Volume": 1386 },
    { "Time": "10:01:00", "Volume": 1041 },
    { "Time": "21:00:00", "Volume": 1372 },
    { "Time": "22:00:00", "Volume": 1270 },
    { "Time": "21:00:00", "Volume": NaN }];

// Sort by time
data1.sort((a, b) => {
    var aTime = a.Time.split(":");
    var bTime = b.Time.split(":");
    return (aTime[0] * 3600 + aTime[1] * 60 + aTime[2]) - (bTime[0] * 3600 + bTime[1] * 60 + bTime[2]);
});
data2.sort((a, b) => {
    var aTime = a.Time.split(":");
    var bTime = b.Time.split(":");
    return (aTime[0] * 3600 + aTime[1] * 60 + aTime[2]) - (bTime[0] * 3600 + bTime[1] * 60 + bTime[2]);
});

// Select the last data
const last_data = 15;
data1 = data1.slice(-last_data);
data2 = data2.slice(-last_data);

// Get element
var ctx1 = document.getElementById("Chart1").getContext("2d");
var ctx2 = document.getElementById("Chart2").getContext("2d");

new Chart(ctx1, {
    type: "line",
    data: {
        labels: data1.map(x => x.Time),
        datasets: [{
            label: "垃圾量 - 1",
            data: data1.map(x => x.Volume),
            spanGaps: true,
            order: 2,
            // Line
            lineTension: 0.3,
            borderColor: "#000000",
            fill: true,
            borderWidth: 3,
            // Point
            pointRadius: 4,
            pointBackgroundColor: "#000000",
            pointHoverRadius: 9,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: "#FF2626",
            pointHoverBackgroundColor: "#FF2626",
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        },
    }
});

new Chart(ctx2, {
    type: "line",
    data: {
        labels: data2.map(x => x.Time),
        datasets: [{
            label: "垃圾量 - 2",
            data: data2.map(x => x.Volume),
            spanGaps: true,
            order: 2,
            // Line
            lineTension: 0.3,
            borderColor: "#000000",
            fill: true,
            borderWidth: 3,
            // Point
            pointRadius: 4,
            pointBackgroundColor: "#000000",
            pointHoverRadius: 9,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: "#FF2626",
            pointHoverBackgroundColor: "#FF2626",
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        },
    }
});