import Chart from "../node_modules/chart.js/auto";
import './index.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://iot-finalproject-968b9-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

get(child(dbRef, "Sensor1")).then((snapshot) => {
    if (snapshot.exists()) {
        var data = get_data(snapshot);
        create_chart(document.getElementById("Chart1").getContext("2d"), data, "垃圾量 - 1");
    } else {
        console.log("No data available");

        var data = [
            { "Time": "00:00:00", "Data": NaN },
            { "Time": "23:59:59", "Data": NaN },];
        create_chart(document.getElementById("Chart1").getContext("2d"), data, "垃圾量 - 1");
    }
}).catch((error) => {
    console.error(error);
});

const get_data = function (snapshot) {
    var data = [];

    // Get data
    for (var key in snapshot.val()) {
        data.push(snapshot.val()[key]);
    }

    // Sort by time
    data.sort((a, b) => {
        var aTime = a.Time.split(":");
        var bTime = b.Time.split(":");
        return (aTime[0] * 3600 + aTime[1] * 60 + aTime[2]) - (bTime[0] * 3600 + bTime[1] * 60 + bTime[2]);
    });

    // Select the last data
    const last_data = 15;
    data = data.slice(-last_data);

    // Return data
    return data;
};

const create_chart = function (ctx, data, label) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.map(x => x.Time),
            datasets: [{
                label: label,
                data: data.map(x => x.Data),
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
};