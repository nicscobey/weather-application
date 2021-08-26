console.log("HI NICO");

let $city = $('input[type="text"]');
let $weatherData = $('#weather-data');
let $latitude, $longitude;
// let h1 = $('h1');

const handleGetData = (lat, long) => {
    // event.preventDefault();

    $.ajax({
        // url: `https://api.openweathermap.org/data/2.5/forecast?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`
    }).then(
        function (data) {
            console.log(data);
            console.log(Math.round(data.daily[0].temp.min));
            loadDataToScreen(data);
        },
        function (error) {
            console.log('B. bad request', error);
        }
    )
    $city.val("");
}

const getLatLong = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`
    }).then(
        function (data) {
            console.log(data);
            let lat = data.coord.lat;
            let long = data.coord.lon;
            console.log(lat, long)
            handleGetData(lat, long);
        },
        function (error) {
            console.log('A. bad request', error);
        }
    )
}

// $('form').on('submit', handleGetData);

$('form').on('submit', getLatLong);

const loadDataToScreen = (data) => {
    console.log(data.list.length);

    $('h2').text(data.city.name)
    for (let i = 0; i < data.list.length; i++) {
        console.log(i);

        const unixTime = data.list[i].dt;
        const date = new Date(unixTime * 1000);
        // console.log(date);
        console.log(date.getDay());
        // console.log(date.toLocaleDateString("en-US"));


        let $newCard = `
            <div class="weather-card">
                <h3>${data.list[i].dt}</h3>
                <h3>${date.toLocaleDateString("en-US")}</h3>
                <p class="temp-max">${Math.round(data.list[i].main.temp_max)}</p>
                <p class="temp-min">${Math.round(data.list[i].main.temp_min)}</p>
                <p class="weather">${data.list[i].weather[0].main}</p>
            </div>`;


        $weatherData.append($newCard);
    }
}