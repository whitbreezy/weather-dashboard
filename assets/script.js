var APIKey = "210c7d0d816503c2044f315fabb02b85";
var searchContainer = $('#search-container');
var cityBtnContainer = $('#city-btn-container');
var forecastContainer = $('#forecast');
var cityInput = $('#cityInput');
var searchBtn = $('#search-btn');
var today = dayjs();
var lastCities = []

//puts current date in the H2
$('#currentDate').text(today.format('MM-DD-YYYY'))

$('#date-1').text(today.add(1, 'day').format('MM-DD-YYYY'));
$('#date-2').text(today.add(2, 'day').format('MM-DD-YYYY'));
$('#date-3').text(today.add(3, 'day').format('MM-DD-YYYY'));
$('#date-4').text(today.add(4, 'day').format('MM-DD-YYYY'));
$('#date-5').text(today.add(5, 'day').format('MM-DD-YYYY'));


//setup function to get weather data
function getWeather(){
    //create var city for user input
    var city = cityInput.val().trim();
   
    //API call for forecast
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +',us'+ "&appid=" + APIKey + "&units=imperial";
    //fetch current weather API data
    fetch(forecastURL)
        .then(function(response){
            return response.json();
            //convert data to json
        })
        .then(function(data){
            //console logs to test
            console.log(data);
            console.log(city);
            //set city header to city name
            $('#cityHeader').text(city);
            //create icon url from icon data point
            var iconURL = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
            //create icon img element and set the src to the new icon url, add styling
            var iconEl = document.createElement('img');
            iconEl.setAttribute("src", iconURL);
            iconEl.setAttribute('style', 'width:60px')
            //add icon after today's date in header
            $('#cityDetails').append(iconEl);
            //set temp, wind, and humidity div text to their data points
            $('#temp').text("Temperature: "+ data.list[0].main.temp + "° Farenheit");
            $('#wind').text("Wind: " + data.list[0].wind.speed + "mph");
            $('#humidity').text("Humidity: " + data.list[0].main.humidity +"%");
            //create arrays for next 5 days' data
            var iconURLArray = [];
            var forecastTemps = [];
            var forecastWindArr = [];
            var forecastHumidityArr = [];
            //loop through next 5 days in data and add data to UI
            for (var i=0; i<5; i++){
                var forecastIconURL = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                iconURLArray.push(forecastIconURL);
                forecastTemps.push("Temp: " + data.list[i].main.temp + "°");
                forecastWindArr.push("Wind: " + data.list[i].wind.speed + " mph");
                forecastHumidityArr.push("Humidity: " + data.list[i].main.humidity +"%");
                //create elements for the data being displayed
                var forecastIcon = $('<img>');
                forecastIcon.attr('src', iconURLArray[i]);
                forecastIcon.attr('style', 'width: 50px')
                $('#forecast').children().eq(i).append(forecastIcon);
                var tempEl = $('<div>')
                $('#forecast').children().eq(i).append(tempEl);
                tempEl.text(forecastTemps[i]);
                var windEl = $('<div>');
                $('#forecast').children().eq(i).append(windEl);
                windEl.text(forecastWindArr[i]);
                var humidityEl = $('<div>');
                $('#forecast').children().eq(i).append(humidityEl);
                humidityEl.text(forecastHumidityArr[i]);
                
            }
            lastCities.push(city);
            localStorage.setItem("lastCity", JSON.stringify(lastCities))
            
            
        });
        
};



function init(){
    var storedCity = JSON.parse(localStorage.getItem("lastCity"));
    if (storedCity !== null){
        var cityBtn = $('<button>');
        cityBtn.text(storedCity);
        cityBtn.attr('id', '#city-button');
        cityBtn.addClass("btn btn-secondary mb-3");
        $('#city-btn-container').append(cityBtn);
    }
    cityBtn.on('click', function(e){
        city = cityBtn.text();
        $('#cityHeader').text(cityBtn.text());
        getWeather();
    })
}

//event listener for search button
searchBtn.on('click', function(e){
    e.preventDefault();
    var cityName = cityInput.val().trim();
    if (cityName ===''){
        return;
    }
getWeather();

cityInput.val('');
});


init();
