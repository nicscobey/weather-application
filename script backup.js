console.log("HI NICO");

let $city = $('input[type="text"]');
let $weatherData = $('#weather-data');
let $latitude, $longitude;
// let h1 = $('h1');

const handleGetData = (event) => {
    event.preventDefault();

    $.ajax({
        // url: `https://www.omdbapi.com/?apikey=61684122&t=${$city.val()}`
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial`

        // api.openweathermap.org/data/2.5/weather?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3&units=imperial
    }).then(
        function (data) {
            loadDataToScreen(data);
        },
        function (error) {
            console.log('bad request', error);
        }
    )
    $city.val("");
}

$('form').on('submit', handleGetData);

const loadDataToScreen = (data) => {
    console.log(data.list.length);
    // console.log(moment(1629946800).format('MMMM Do YYYY, h:mm:ss a'))

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
        // console.log(i);

        // $('h2').text(data.list[num].name);
        // $('#temp').text(`Temperature: ${data.list[num].main.temp}`);
        // $('#feels-like').text(`Feels Like: ${data.list[num].main.feels_like}`);
        // $('#weather').text(`Weather: ${data.list[num].weather[0].main}`);
    }
}
// $('form').on('submit', function (event) {
//     event.preventDefault();
//     console.log('submitted form!')
//     console.log($city.val());
//     console.log(`api.openweathermap.org/data/2.5/weather?q=detroit&appid=76b2efa7ef7334573afeea37163369e3`);

//     $.ajax({
//         url: `api.openweathermap.org/data/2.5/weather?q=${$city.val()}&appid=76b2efa7ef7334573afeea37163369e3`
//     }).then(
//         function (data) {
//             console.log(data);
//         },
//         function (error) {
//             console.log('bad request', error);
//         }
//     )
// })

//read docs to convert temp to imperial units