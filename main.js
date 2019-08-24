window.onload = () => {
    document.querySelector("#query").addEventListener("click", runQuery);
}

let runQuery = async () => {
    let response = await fetch('http://localhost:3000/url/USA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    });
    let myJson = await response.json();

    console.log(myJson);
}