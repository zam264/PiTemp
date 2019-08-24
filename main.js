window.onload = () => {
    document.querySelector("#query").addEventListener("click", runQuery);
}

let runQuery = async () => {
    let value = document.querySelector("#queryText").value;

    let response = await fetch(`http://192.168.86.56/url/${value}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let myJson = await response.json();
    console.log(myJson);
    // parseJSON = JSON.parse()
    strJson = JSON.stringify(myJson)
    // document.querySelector("#customerInfo").innerHTML = strJson;

    let data = myJson['Customer Information']

    var html = '<table class="table">';
    html += '<tr>';
    var flag = 0;
    $.each(data[0], (index, value) => {
        html += '<th>' + index + '</th>';
    });
    html += '</tr>';
    $.each(data, (index, value) => {
        html += '<tr>';
        $.each(value, (index2, value2) => {
            html += '<td>' + value2 + '</td>';
        });
        html += '<tr>';
    });
    html += '</table>';
    $('#customerInfo').html(html);
}