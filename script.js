let $city = $('input[type="text"]');
let $weatherData = $('#weather-data');
let $latitude, $longitude;
let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const handleGetData = (lat, long) => {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`
    }).then(
        function (data) {
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

    $('#weather-data').html("");

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`
    }).then(
        function (data) {
            let lat = data.coord.lat;
            let long = data.coord.lon;
            $('h2').text(data.name)

            handleGetData(lat, long);
        },
        function (error) {
            console.log('A. bad request', error);
        }
    )
}

$('form').on('submit', getLatLong);

const loadDataToScreen = (data) => {
    for (let i = 0; i < data.daily.length; i++) {
        const unixTime = data.daily[i].dt;
        const date = new Date(unixTime * 1000);

        const day = days[date.getDay()];
        let $newCard = `
            <div class="weather-card">
                <h3>${day}</h3>
                <img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png">
                <p class="weather">${data.daily[i].weather[0].description}</p>
                <div class="temps">
                    <p class="temp-max">${Math.round(data.daily[i].temp.max)}</p>
                    <p class="temp-min">${Math.round(data.daily[i].temp.min)}</p>
                </div>
            </div>`;

        $weatherData.append($newCard);
    }
}