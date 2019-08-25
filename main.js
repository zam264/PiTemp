window.onload = () => {
    //  await updateTemps()
    doPoll()
}
let doPoll = async () => {
     await updateTemps()
     setTimeout(doPoll, 5000)
}

let updateTemps = async () => {
    let temps = await get24HrTemps()
    temps = temps['Temperature Information']
    await updateCurrentTemp(temps)
    await updateHistoricTemps(temps)
    await updateStatistics(temps)
}

let get24HrTemps = async () => {
    let response = await fetch(`http://192.168.86.56/temp`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

let updateCurrentTemp = async (temps) => {
    let currentTemp = temps[0].tempF;
    let lastUpdateTime = temps[0].tempDateTime;

    $('#currentTemp').html(`Current Raspberry Pi Temperature: ${currentTemp}`);
    $('#lastUpdateTime').html(`Last update time: ${lastUpdateTime}`);
}

let updateHistoricTemps = (temps) => {
    let html = buildHTMLTable(temps);

    $('#historicTemps').html(html);
}

let updateStatistics = (temps) => {
    let max = getMax(temps);
    let min = getMin(temps);
    let avg = getAvg(temps);

    max = buildHTMLTable(max)
    min = buildHTMLTable(min)
    // avg = buildHTMLTable(avg)

    $('#max').html(max);
    $('#min').html(min);
    $('#avg').html(`Avg temperature: ${avg}`);
}

let getMax = (temps) => {
    let max;
    temps.forEach(element => {
        if(!max || parseInt(element.tempF) > max.tempF)
            max = element;
    });
    return max;
}

let getMin = (temps) => {
    let min;
    temps.forEach(element => {
        if(!min || parseInt(element.tempF) < min.tempF)
        min = element;
    });
    return min;
}

let getAvg = (temps) => {
    let sum = 0;
    let length = temps.length;
    temps.forEach(element => {
        sum += parseInt(element.tempF);
    });
    return (sum / length).toFixed(2);
}

let buildHTMLTable = (data) => {
    var html = '<table class="table">';

    if(data.constructor === Array){
        html += '<tr>';
        $.each(data[0], (index, value) => {
            html += '<th>' + index + '</th>';
        });
        html += '</tr>';

        $.each(data, (index, value) => {
            html += '<tr>';
            $.each(value, (index2, value2) => {
                html += '<td>' + value2 + '</td>';
            });
            html += '</tr>';
        });
    }
    else{
        html += '<tr>';
        $.each(data, (index, value) => {
            html += '<th>' + index + '</th>';
        });
        html += '</tr>';

        html += '<tr>';
        $.each(data, (index, value) => {
            html += '<td>' + value + '</td>';
        });
        html += '</tr>';
    }

    html += '</table>';
    return html
}